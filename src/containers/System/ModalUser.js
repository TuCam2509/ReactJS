import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import {emitter, enitter} from '../../utils/enitter'
class ModalUser extends Component {
     

    constructor(props){
        super(props);
           this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            address:''


        }
        this.listenToEmitter()
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',()=>{
            this.setState({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            address:'',
            roleId:''

            })
        })
    }

    componentDidMount() {
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
    handleAddNewUser=()=>{
      let isValid= this.checkValidateInput()
      if(isValid===true){
        this.props.createHandleUser(this.state);      
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
          <ModalHeader toggle={()=>{this.toggle()}}>Create new users</ModalHeader>
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
            <Button color="btn btn-outline-primary p-1" onClick={()=>{this.handleAddNewUser()}}>Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
