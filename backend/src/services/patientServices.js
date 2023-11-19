import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService"
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: "Nguyễn Thnah Nguyên",
                    time : "8:00 - 9:00 Chủ nhật 19/11/20223",
                    doctorName: "Châu Quốc Thái",
                    redirectLink: "https://www.facebook.com/"
                })


                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                //create a booking record
                if (user) {
                    await db.Booking.findOrCreate({ //findOrCreate Tránh tạo trùng lặp dữ liệu
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}