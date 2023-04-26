import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginAPI } from '../../services/useService';
import {faFacebook,faGoogle} from "@fortawesome/free-brands-svg-icons"
import {faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




class Login extends Component {
    constructor(props) {
        super(props);//hàm khởi tạo
        this.state={
          username:'',
          password:'',
          isShowPass:false,
          errMessage:''

        }
        
    }
    handleChangeUser=(event)=>{
      this.setState({
        username:event.target.value
      })
     

    }
    handleChangePass=(event)=>{
      this.setState({
        password:event.target.value
      })
  
    }
    handleLogin=async()=>{
      this.setState({
        errMessage:''
      })

     try {
       let data=await handleLoginAPI(this.state.username,this.state.password);
       if(data && data.errCode !==0){
        this.setState({
          errMessage:data.message
        })

       }
       if(data && data.errCode===0){
        this.props.userLoginSuccess(data.user)
        console.log('login successful')
       }
      
       
      
     } catch (error) {
      if(error.response){
        if(error.response.data){
          this.setState({
            errMessage:error.response.data.message
          })

        }

      }
      console.log('camtu',error.response)

      
     }
    }
    handleShowHidden=()=>{
      this.setState({
        isShowPass:!this.state.isShowPass
      })
    }

    render() {
        return (
           <div className='login-bacground'>
            <div className='login-container'>
                <div className='login-content row'>
                      <div className='col-12 text-login'>Login</div>
                      <div className='col-12 form-group login-input'>
                        <label>Username</label>
                        <input type='text' 
                        className='form-control' 
                        placeholder='Enter your username' 
                        value={this.state.username}
                        onChange={(event)=>this.handleChangeUser(event)}
                        />
                      </div>
                      <div className='col-12 from-group login-input'>
                        <label>Password</label>
                        <div className='customer-pass'>
                        <input type={this.state.isShowPass?'text':'password'} 
                        className='form-control' 
                        placeholder='Enter your password' value={this.state.password}
                        onChange={(event)=>this.handleChangePass(event)}
                        />
                        <span onClick={()=>this.handleShowHidden()}>
                        <FontAwesomeIcon icon={this.state.isShowPass ? faEye :faEyeSlash } className='faEye' ></FontAwesomeIcon>

                        </span>
                        </div>
                      </div>
                      <div className='col-12' style={{color:'red'}}>
                      {this.state.errMessage}
                      </div>
                      <div className='col-12'>
                      <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>

                      </div>
                    <div className='col-12 '>
                        <span className='text-pass'>Forgot your password?</span>
                      </div>
                      <div className='col-12 text-center mt-3'>
                        <span className='text-pass'>Or login with:</span>
                      </div>
                    <div className='col-12 social-login'>
                      <FontAwesomeIcon icon={faFacebook} className="icon faFace" />
                      <FontAwesomeIcon icon={faGoogle} className="icon faGoogle" />
                      </div>
                </div>

            </div>


           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(useInfo) => dispatch(actions.userLoginSucess(useInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
