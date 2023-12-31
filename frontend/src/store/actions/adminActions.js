import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getAllSpecialty, getAllClinic,
    saveClinicService, updateClinicService,
    updateSpecialtyService, createNewSpecialty
} from '../../services/userService';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error', e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            //if (res) {
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('saveUserFailed error', e)
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL");
            //let res1 = await getTopDoctorHomeService();
            //console.log('check res get top doctor', res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                toast.error('fetchAllUsersStart error')
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error('fetchAllUsersStart error')
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})


export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error('Delete User Failed!')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            toast.error('Delete User Failed!')
        }
    }
}
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                //if (res) {
                //console.log(res.errCode)
                toast.success("Edit the user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error('Update the user failed ')
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update the user failed');
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('10');/////////////
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
            console.log('check res top', res)
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })

        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_All_DOCTORS_SUCCESS,
                    dataDr: res.data //

                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }

        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })

        }
    }
}


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor succeed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                console.log('Save Infor Detail Doctor failed: ', res)
                toast.error('Save Infor Detail Doctor error!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }

        } catch (e) {
            toast.error('Save Infor Detail Doctor error!');
            console.log('Save Infor Detail Doctor failed: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })

        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data

                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }

        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })

        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_Doctor_Infor_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0

            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }
            else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInfor error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_Doctor_Infor_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_Doctor_Infor_FAILED
})

export const fetchAllClinics = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_CLINIC_SUCCESS,
                    dataClinic: res.data //
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_CLINIC_FAILED
                })
            }

        } catch (e) {
            console.log('FETCH_REQUIRED_CLINIC_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_REQUIRED_CLINIC_FAILED
            })

        }
    }
}


export const saveClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Clinic Infor succeed!")
                dispatch({
                    type: actionTypes.SAVE_CLINIC_SUCCESS,
                })
            } else {
                console.log('Save Clinic Infor failed: ', res)
                toast.error('Save Clinic Infor error1!');
                dispatch({
                    type: actionTypes.SAVE_CLINIC_FAILED
                })
            }

        } catch (e) {
            toast.error('Save Clinic Infor error!');
            console.log('Save Clinic Infor failed: ', e)
            dispatch({
                type: actionTypes.SAVE_CLINIC_FAILED
            })

        }
    }
}

export const updateClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateClinicService(data);
            if (res && res.errCode === 0) {
                //if (res) {
                //console.log(res.errCode)
                toast.success("Edit the clinic succeed!")
                dispatch(updateClinicSuccess());
                dispatch(fetchAllClinics());
            }
            else {
                toast.error('Update the clinic failed!')
                dispatch(updateClinicFailed());
            }
        } catch (e) {
            toast.error('Update the clinic failed');
            dispatch(updateClinicFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const updateClinicSuccess = () => ({
    type: actionTypes.UPDATE_CLINIC_SUCCESS
})

export const updateClinicFailed = () => ({
    type: actionTypes.UPDATE_CLINIC_FAILED
})

export const fetchAllSpecialties = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_SPECIALTY_SUCCESS,
                    dataSpecialty: res.data //
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_SPECIALTY_FAILED
                })
            }

        } catch (e) {
            console.log('FETCH_REQUIRED_SPECIALTY_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_REQUIRED_SPECIALTY_FAILED
            })

        }
    }
}

export const createSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSpecialty(data);
            if (res && res.errCode === 0) {
                toast.success("Save specialty Infor succeed!")
                dispatch({
                    type: actionTypes.CREATE_SPECIALTY_SUCCESS,
                })
            } else {
                console.log('Save specialty Infor failed: ', res)
                toast.error('Save specialty Infor error1!');
                dispatch({
                    type: actionTypes.CREATE_SPECIALTY_FAILED
                })
            }

        } catch (e) {
            toast.error('Save specialty Infor error!');
            console.log('Save specialty Infor failed: ', e)
            dispatch({
                type: actionTypes.CREATE_SPECIALTY_FAILED
            })

        }
    }
}

export const updateSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateSpecialtyService(data);
            if (res && res.errCode === 0) {
                //if (res) {
                //console.log(res.errCode)
                toast.success("Edit the specialty succeed!")
                dispatch(updateSpecialtySuccess());
                dispatch(fetchAllSpecialties());
            }
            else {
                toast.error('Update the specialty failed!')
                dispatch(updateSpecialtyFailed());
            }
        } catch (e) {
            toast.error('Update the specialty failed');
            dispatch(updateSpecialtyFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const updateSpecialtySuccess = () => ({
    type: actionTypes.UPDATE_SPECIALTY_SUCCESS
})

export const updateSpecialtyFailed = () => ({
    type: actionTypes.UPDATE_SPECIALTY_FAILED
})
