import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import {emitter, enitter} from '../../utils/enitter';
import _ from 'lodash'
class ModalEditUser extends Component {
     

    constructor(props){
        super(props);
           this.state = {
            id:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            address:''
        }
    }
    
    componentDidMount() {
        let user=this.props.currentEdit
        if(user && !_.isEmpty(user)){
            this.setState({
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password:'hardcode',
            address:user.address

            })
        }
        console.log('didmount edit modal:',this.props.currentEdit)
    }
    toggle=()=>{
        this.props.handleFormModal()

    }
    handleChangeEmail=(event,id)=>{
        let copyState={...this.state}
        copyState[id]=event.target.value
        this.setState({
            ...copyState
        })
        //console.log(event.target.value,id)

    }
    checkValidateInput=()=>{
        let isValid=true
        let arrInput=['firstName','lastName','email','password','address'];
        
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Mising paraments: '+ arrInput[i])
                break;
            }
            
        }
        return isValid

    }
    handleEditNewUser=()=>{
      let isValid= this.checkValidateInput()
      if(isValid===true){
        this.props.editUser(this.state)    
      }

    }

    render() {
        return (
            <>
             <Modal 
             isOpen={this.props.isOpen} 
             toggle={()=>{this.toggle()}} 
             className={'modal_users_container'}
             size='lg'
             >
          <ModalHeader toggle={()=>{this.toggle()}}>Edit new users</ModalHeader>
          <ModalBody>
            <div className='modal_body'>
                <div className='input_container'>
                    <label>Frist Name</label>
                    <input 
                    type='text' 
                    placeholder='Enter your frist name' 
                    name='firstName' 
                    onChange={(event)=>{this.handleChangeEmail(event,"firstName")}}
                    value={this.state.firstName}
                    />
                </div>
                <div className='input_container'>
                    <label>Last Name</label>
                    <input 
                    type='text' 
                    placeholder='Enter your last name' 
                    name='lastName' 
                    onChange={(event)=>{this.handleChangeEmail(event,"lastName")}}
                    value={this.state.lastName}
                    />
                </div>
                <div className='input_container'>
                    <label>Email</label>
                    <input 
                    type='email' 
                    placeholder='Enter your email' 
                    name='email' 
                    onChange={(event)=>{this.handleChangeEmail(event,"email")}}
                    value={this.state.email}
                    disabled
                    />
                </div>
                <div className='input_container'>
                    <label>Password</label>
                    <input 
                    type='password' 
                    placeholder='Enter your password' 
                    name='password' 
                    onChange={(event)=>{this.handleChangeEmail(event,"password")}}
                    value={this.state.password}
                    disabled
                    />
                </div>
                <div className='input_container max-width-input'>
                    <label>Address</label>
                    <input 
                    type='text' 
                    placeholder='Address' 
                    name='address' 
                    onChange={(event)=>{this.handleChangeEmail(event,"address")}} 
                    value={this.state.address}
                    />
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-primary p-1" onClick={()=>{this.handleEditNewUser()}}>Save changes</Button>{' '}
            <Button color="btn btn-outline-danger p-1" onClick={()=>{this.toggle()}}>Close</Button>
          </ModalFooter>
        </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
