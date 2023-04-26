import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../homepage/HomeHeader';
import {postVerifyEmail} from '../../services/useService'
import './Verify_email.scss'
class Verify_emailr extends Component {
    constructor(props) {
    super(props);
        this.state={
          statusVerify:false,
          errCode:0
           
            
        }
    
    }
    async componentDidMount(){
        if(this.props.location && this.props.location.search){
            let  urlParams = new URLSearchParams(this.props.location.search);
            let  token = urlParams.get('token');
            let  doctorId = urlParams.get('doctorId');
            let res=await postVerifyEmail({
                token:token,
                doctorId:doctorId,
            })
            if(res && res.errCode===0){
                 this.setState({
                    statusVerify:true,
                    errCode:res.errCode
                 })
            }else{
                this.setState({
                    statusVerify:true,
                    errCode:res && res.errCode ? res.errCode:-1
                })
            }
            

        }
            
        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
           
            }
       
        render() {
            let {statusVerify,errCode}=this.state
            
            return (
               <>
               <HomeHeader/>
               <div className='verify-container'>

               {statusVerify ===false ? 
               <div>

               </div>
               :
               <div>
                {errCode===0 ? 
                <div className='info-booking-success'>Xác nhận lịch hẹn thành công.Cảm ơn bạn đã đặt lịch tại Booking Doctor</div>:
                <div className='info-booking-error'>Lịch hẹn không tồn tại</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify_emailr);
