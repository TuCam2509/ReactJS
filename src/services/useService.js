import axios from '../axios'
 const handleLoginAPI=(userEmail,userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword});

}
const getAllUser=()=>{
    return axios.get(`/api/get_all_user?id=ALL`)

}
const createNewUserService=(data)=>{
    console.log('Check create new user',data)
    return axios.post('/api/create_new_user',data)

}
const deleteUserService=(userId)=>{
    //return axios.delete('/api/delete_new_user',{id:userId})
    return axios.delete('/api/delete_new_user',{
        data:{
            id:userId
        }
    })
}
const editUserServie=(inputData)=>{
    return axios.put('/api/edit_new_user',inputData)

}
const getAllCodeSevice=(inputType)=>{
    return axios.get(`/api/allcode?type=${inputType}`)

}
const getTopDoctorHome=(limit)=>{
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}
const getAllDoctors=()=>{
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailInforDoctors=(data)=>{
    return axios.post(`/api/get-infor-doctor`,data)
}
const getDetailInforDoctor=(inputId)=>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)

}
const saveBulkScheduleDoctor=(data)=>{
    return axios.post(`/api/bulk-create-schedule`,data)

}
const getScheduleDoctorDate=(doctorId,date)=>{
    return axios.get(`/api/get-schedulebydate?doctorId=${doctorId} &date=${date}`)

}
const getDetailExtraDoctorInfo=(doctorId)=>{
    return axios.get(`/api/get-detail-extra-doctor-by-id?doctorId=${doctorId}`)

}
const getProfileDoctorById=(doctorId)=>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)

}
const postPatientBooking=(data)=>{
    return axios.post(`/api/patient-appoiment`,data)

}
const postVerifyEmail=(data)=>{
    return axios.post(`/api/verify-patient-appoiment`,data)

}
const createNewSpecialty=(data)=>{
    return axios.post(`/api/create-specialty`,data)

}
const getAllSpecialty=()=>{
    return axios.get(`/api/get-specialty`)

}
const getDetailSpecialtyById=(data)=>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)

}
const getCreateClinic=(data)=>{
    return axios.post(`/api/create-clinic`,data)

}
const getAllClinic=()=>{
    return axios.get(`/api/get-clinic`)

}
const getDetailClinicById=(data)=>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)

}
const getListPatientForDoctor=(data)=>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)

}
const postSendRemedy=(data)=>{
    return axios.post(`/api/post-send`,data)

}




export {handleLoginAPI,getAllUser,createNewUserService,deleteUserService,editUserServie,
    getAllCodeSevice,getTopDoctorHome,getAllDoctors,saveDetailInforDoctors,getDetailInforDoctor,
    saveBulkScheduleDoctor,getScheduleDoctorDate,getDetailExtraDoctorInfo,getProfileDoctorById,postPatientBooking,
    postVerifyEmail,createNewSpecialty,getAllSpecialty,getDetailSpecialtyById
    ,getCreateClinic,getAllClinic,getDetailClinicById,getListPatientForDoctor,postSendRemedy}