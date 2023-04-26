import actionTypes from '../actions/actionTypes';
import {getAllCodeSevice} from "../../services/useService"



const initialState = {
    isLoadingGender:false,
    genders:[],
    roles:[],
    positions:[],
    users:[],
    topDoctors:[],
    allDoctors:[],
    allScheduleTime:[],
    allRequireData:[]
      
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
        let copyState={...state}
        copyState.isLoadingGender=true
            return {
               ...copyState
            }  
            case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders=action.data
            state.isLoadingGender=false
            return {
                ...state,
            }  
            case actionTypes.FETCH_GENDER_FAIL: 
            state.isLoadingGender=false
            state.genders=[]

            return {
                ...state
            }  
            case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions=action.data

            return {
                ...state
            }  
            case actionTypes.FETCH_POSITION_FAIL: 
            state.positions=[]

            return {
                ...state
            }  
            case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles=action.data

            return {
                ...state
            }  
            case actionTypes.FETCH_ROLE_FAIL: 
            state.roles=[]

            return {
                ...state
            }  
            case actionTypes.FETCH_ALL_USERS_SUCCESS:
                state.users=action.users

            return {
                ...state
            }  
            case actionTypes.FETCH_ALL_USERS_FAIL:
                state.users=[]
    
                return {
                    ...state
                } 
                case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
                    state.topDoctors=action.dataDoctor
        
                    return {
                        ...state
                    } 
                    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
                        state.topDoctors=[]
            
                        return {
                            ...state
                        }
                    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                    state.allDoctors=action.dataDr
        
                    return {
                        ...state
                    } 
                    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
                        state.allDoctors=[]
            
                        return {
                            ...state
                        }
                        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
                            state.allScheduleTime=action.dataTime
                
                            return {
                                ...state
                            } 
                            case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL:
                                state.allScheduleTime=[]
                    
                                return {
                                    ...state
                                }
                                case actionTypes.FETCH_REQUIED_DOCTOR_PRICE_SUCCESS:
                                    state.allRequireData=action.data

                                    console.log('check requied doctor:',state,action)
                        
                                    return {
                                        ...state
                                    } 
                                    case actionTypes.FETCH_REQUIED_DOCTOR_PRICE_FAIL:
                                        state.allRequireData=[]
                            
                                        return {
                                            ...state
                                        }
                              
                

            
        default:
            return state;
    }
}

export default adminReducer;