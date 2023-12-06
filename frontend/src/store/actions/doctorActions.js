// import actionTypes from './actionTypes';
// import {
//     deletePatientBookingService
// } from '../../services/userService';
// import { toast } from "react-toastify";

// export const fetchAllPatientStart = () => {
//     return async (dispatch, getState) => {
//         try {

//             let res = await getAllUsers("ALL");
//             let res1 = await getTopDoctorHomeService();
//             //console.log('check res get top doctor', res1);
//             if (res && res.errCode === 0) {
//                 dispatch(fetchAllUsersSuccess(res.users.reverse()));
//             }
//             else {
//                 toast.error('fetchAllUsersStart error')
//                 dispatch(fetchAllUsersFailed());
//             }
//         } catch (e) {
//             toast.error('fetchAllUsersStart error')
//             dispatch(fetchAllUsersFailed());
//             console.log('fetchAllUsersFailed error', e)
//         }
//     }
// }

// export const deletePatientBooking = (bookingId) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await deletePatientBookingService(bookingId);
//             if (res && res.errCode === 0) {
//                 toast.success("Delete the user succeed!")
//                 dispatch(deletePatientBookingSuccess());
//                 dispatch(fetchAllUsersStart());
//             }
//             else {
//                 toast.error('deleteUserFailed error')
//                 dispatch(deletePatientBookingFailed());
//             }
//         } catch (e) {
//             dispatch(deletePatientBookingFailed());
//             toast.error('deleteUserFailed error')
//         }
//     }
// }

// export const deletePatientBookingSuccess = () => ({
//     type: actionTypes.DELETE_USER_SUCCESS
// })

// export const deletePatientBookingFailed = () => ({
//     type: actionTypes.DELETE_USER_FAILED
// })