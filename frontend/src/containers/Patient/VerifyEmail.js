import React, { Component } from 'react';
import { connect } from "react-redux";
//import './VerifyEmail.scss';
//import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {


        // console.log('Check verify', this.props)
        //console.log('Check token', token, doctorId)
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })

            }
        }

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {
        let { statusVerify, errCode } = this.state;

        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="content-container">
                                    <h2 className='title-booking-succeed'>Xác nhận lịch hẹn thành công!</h2>
                                    <div className="detail-content">
                                        <p>
                                            Vui lòng mang theo tất cả các giấy giờ có liên quan,
                                            bao gồm bảo hiểm y tế và các danh sách thuốc đang sử dụng đồng thời có mặt trước
                                            thời gian khám 30 phút để lấy giấy xác nhận  tại quầy tiếp nhận khám chữa bệnh.
                                        </p>
                                        <p>
                                            <strong>
                                                <em>Hồ sơ tiếp nhận sẽ không được xử lý nếu như bạn đến trễ hơn 1 giờ so với thời gian khám được quy định. </em>
                                            </strong>
                                            Nếu bạn có bất kỳ câu hỏi hoặc cần điều chỉnh lịch hẹn, hãy liên hệ với chúng tôi.
                                        </p>
                                        <p>Chúng tôi rất mong đợi sự gặp gỡ của bạn và hy vọng rằng chúng tôi có thể cung cấp dịch vụ
                                            tốt nhất cho sức khỏe của bạn!
                                        </p>
                                    </div>
                                </div>

                                :
                                <h2 className='title-booking-failed'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</h2>
                            }
                        </div>
                    }
                </div>

            </>

        )


    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
