import actionTypes from './actionTypes';
import {getAllCodeSevice,createNewUserService,getAllUser,deleteUserService,editUserServie,getTopDoctorHome,getAllDoctors,saveDetailInforDoctors,getAllSpecialty,getAllClinic} from "../../services/useService"
import {toast} from 'react-toastify'
//export const fetchGenderStart = () => ({
    //type: actionTypes.FETCH_GENDER_START
//})
export const fetchGenderStart =() => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res=await getAllCodeSevice("GENDER");
            if(res && res.errCode===0){
              dispatch(fetchGenderSuccess(res.data))  
            }else{
               dispatch(fetchGenderFail()) 
            }
        } catch (error) {
           dispatch(fetchGenderFail()) 
            console.log('fetchGenderstart',error)
            
        }

    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data:positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})
export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes. FETCH_ROLE_SUCCESS,
    data:RoleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})
export const fetchPositionStart =() => {
    return async(dispatch,getState) =>{
        try {
            let res=await getAllCodeSevice("POSITION");
            if(res && res.errCode===0){
              dispatch(fetchPositionSuccess(res.data))  
            }else{
               dispatch(fetchPositionFail()) 
            }
        } catch (error) {
           dispatch(fetchPositionFail()) 
            console.log('fetchGenderstart',error)
            
        }

    }
}
export const fetchRoleStart =() => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res=await getAllCodeSevice("ROLE");
            if(res && res.errCode===0){
              dispatch(fetchRoleSuccess(res.data))  
            }else{
               dispatch(fetchRoleFail()) 
            }
        } catch (error) {
           dispatch(fetchRoleFail()) 
            console.log('fetchRolestart',error)
            
        }

    }
}
export const createNewUser=(data)=>{
    return async(dispatch,getState) =>{
        try {
            let res=await createNewUserService(data)
            console.log('check react',res)
            if(res && res.errCode===0){
             toast.success("Create a new user success")
              dispatch(saveUserSucess())  
              dispatch(fetchAllUserStart())
            }else{
               dispatch(saveUserFail()) 
            }
        } catch (error) {
           dispatch(saveUserFail()) 
            console.log('saveUserFail',error)
            
        }

    }

}
export const saveUserSucess=()=>({
 type:' CREATE_USER_SUCCESS'
    
})
export const saveUserFail=()=>({
 type:'CREATE_USER_FAIL'
    
})
export const fetchAllUserStart =() => {
    return async(dispatch,getState) =>{
        try {
            let res=await getAllUser("ALL");
            if(res && res.errCode===0){
              dispatch(fetchAllUserSuccess(res.user.reverse()))  
            }else{
                toast.error("Delete a new user error")
               dispatch(fetchAllUserFail()) 
            }
        } catch (error) {
            toast.error("Delete a new user error")
           dispatch(fetchAllUserFail()) 
            console.log('fetchAllUserFail',error)
            
        }

    }
}
export const fetchAllUserSuccess=(data)=>({
    type:'FETCH_ALL_USERS_SUCCESS',
    users:data
})
export const fetchAllUserFail =()=>({
    type:' FETCH_ALL_USERS_FAIL',
})
export const deleteNewUser=(userId)=>{
    return async(dispatch,getState) =>{
        try {
            let res=await deleteUserService(userId)
            console.log('check react',res)
            if(res && res.errCode===0){
             toast.success("Delete a new user success")
              dispatch(deleteUserSuccess())  
              dispatch(fetchAllUserStart())
            }else{
                toast.error("Delete a new user error")
               dispatch(deleteUserFail()) 
            }
        } catch (error) {
           dispatch(deleteUserFail()) 
            console.log('saveUserFail',error)
            
        }

    }

}
export const deleteUserSuccess=()=>({
    type:actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFail=()=>({
    type:actionTypes.DELETE_USER_FAIL

})
export const editNewUser=(data)=>{
    return async(dispatch,getState) =>{
        try {
            let res=await editUserServie(data)
            console.log('check react',res)
            if(res && res.errCode===0){
             toast.success("Edit a new user success")
              dispatch(editUserSucess())  
              dispatch(fetchAllUserStart())
            }else{
                toast.error("Edit a new user error")
               dispatch(editUserFail()) 
            }
        } catch (error) {
           dispatch(editUserFail()) 
            console.log('editUserFail',error)
            
        }

    }

}
export const editUserSucess=()=>({
    type:actionTypes.UPDATE_USER_SUCCESS

})
export const editUserFail=()=>({
type:actionTypes.UPDATE_USER_FAIL
})
export const getTopDoctor=()=>{
    return async(dispatch,getState) =>{
        try {
            let res=await getTopDoctorHome('')
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor:res.data
                })

            }else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_FAIL,
                })

            }


        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAIL',error)
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })
             
        }

    }
    

}
export const fetchAllDoctors=()=>{
    return async(dispatch,getState) =>{
        try {
            let res=await getAllDoctors()
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr:res.data
                })

            }else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_FAIL,
                })

            }


        } catch (error) {
            console.log('FETCH_ALL_DOCTOR_FAIL',error)
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTOR_FAIL,
            })
             
        }

    }
    

}
export const saveDetailDoctor=(data)=>{
    return async(dispatch,getState) =>{
        try {
            let res=await saveDetailInforDoctors(data)
            if(res && res.errCode===0){
                toast.success("Save infor detail doctor success")
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })

            }else{
                toast.error("Save infor detail doctor error")
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })

            }


        } catch (error) {
            toast.error("Save infor detail doctor error")
            console.log('SAVE_DETAIL_DOCTOR_FAIL',error)
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })
             
        }

    }
    

}
export const fetchAllScheduleTime=()=>{

    return async(dispatch,getState) =>{
        try {
            let res=await getAllCodeSevice('TIME')
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
                    dataTime:res.data,
                })
                
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL,
                })

            }


        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_HOUR_FAIL',error)
            dispatch({
                type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL,
            })
             
        }

    }
    

}
export const getRequiedDcotorInfo =() => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
                type:actionTypes.FETCH_REQUIED_DOCTOR_PRICE_START
            })
            let resPrice=await getAllCodeSevice("PRICE");
            let resPayment=await getAllCodeSevice("PAYMENT");
            let resPro=await getAllCodeSevice("PROVINCE");
            let resSpecialty=await getAllSpecialty()
            let resClinic=await getAllClinic()
            if(resPrice && resPrice.errCode===0 
                && resPayment && resPayment.errCode===0 && resPro 
                && resPro.errCode===0 
                && resSpecialty && resSpecialty.errCode===0
                && resClinic && resClinic.errCode===0
                ){
                let data={
                    resPrice:resPrice.data,
                    resPayment:resPayment.data,
                    resPro:resPro.data,
                    resSpecialty:resSpecialty.data,
                    resClinic:resClinic.data

                }
              dispatch(fetchAllDoctorPriceSuccess(data))  
            }else{
               dispatch(fetchAllDoctorPriceFail()) 
            }
        } catch (error) {
           dispatch(fetchAllDoctorPriceFail())
            console.log('FetchDoctorPriceFail',error)
            
        }

    }
}

export const fetchAllDoctorPriceSuccess = (allRequireData) => ({
    type: actionTypes.FETCH_REQUIED_DOCTOR_PRICE_SUCCESS,
    data:allRequireData
})
export const fetchAllDoctorPriceFail = () => ({
    type: actionTypes.FETCH_REQUIED_DOCTOR_PRICE_FAIL
})

//let res1=await getTopDoctorHome(2)




