import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash,faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUser,createNewUserService,deleteUserService,editUserServie} from '../../services/useService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/enitter';


class UserManage extends Component {
    constructor(props){
        super(props)
        this.state={
            arrUsers:[],
            isOpenModal:false,
            isEditOpenModal:false,
            userEdit:{}
        }
    }
    handleCickAddUser=()=>{
        this.setState({
            isOpenModal:true
        })
    }
    toogleModalUser=()=>{
        this.setState({
            isOpenModal:!this.state.isOpenModal
        })

    }
    toogleEditUser=()=>{
        this.setState({
        isEditOpenModal :!this.state.isEditOpenModal
        })


    }

    async componentDidMount() {
       await this.getAllUserFormReact()

    }
    getAllUserFormReact=async()=>{
        let response=await getAllUser('ALL')
        if(response && response.errCode===0){
            this.setState({
                arrUsers:response.user
            })
        }

    }
    createNewUser=async(data)=>{
        try {
            let response=await createNewUserService(data)
            if(response && response.errCode!==0){
                alert(response.errMessage)
            }else{
                await this.getAllUserFormReact()
                this.setState({
                    isOpenModal:false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    handleDeleteUser=async(user)=>{
        console.log('click delete',user)
        try {
            let res=await deleteUserService(user.id)
            if(res && res.errCode===0){
                await this.getAllUserFormReact()

            }else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
    handleEditUser=(user)=>{
        console.log('check edit user',user)
        this.setState({
            isEditOpenModal:true,
            userEdit:user
            
        })

    }
    doEditUser=async(user)=>{
        try {
            let res=await editUserServie(user)
            if(res && res.errCode===0){
                this.setState({
                    isEditOpenModal:false
                })
                await this.getAllUserFormReact()

            }else{
                alert(res.errCode)
            }
            
        } catch (error) { 
            console.log(error)
        }
    }

    render() {
        console.log('check render',this.state)
        let arrUsers=this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser 
                isOpen={this.state.isOpenModal}
                handleFormModal={this.toogleModalUser}
                createHandleUser={this.createNewUser}
               
                />
                {
                    this.state.isEditOpenModal &&
                    <ModalEditUser
                     isOpen={this.state.isEditOpenModal}
                     handleFormModal={this.toogleEditUser}
                     currentEdit={this.state.userEdit}
                     editUser={this.doEditUser}
                     //createHandleUser={this.createNewUser}
                    />

                }
                <div className='title text-center'>Manage users </div>
                <div className='mx-1'>
                <button className='btn btn-outline-info px-1 py-1' onClick={()=>this.handleCickAddUser()}>
                 <FontAwesomeIcon icon={faPlusCircle}/>Add users
                </button>
                </div>
                <div className='users-table mt-4 mx-1'>
                <table id="customers">
                    <tbody>

                <tr>
                 <th>Email</th>
                 <th>FristName</th>
                 <th>LastName</th>
                 <th>Address</th>
                 <th>Actions</th>
              </tr>
              
                {
                    arrUsers && arrUsers.map((item,index)=>{
                        return(
                    <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                            <button className='btn-edit' onClick={()=>this.handleEditUser(item)} >
                            <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button className='btn-delete' onClick={()=>this.handleDeleteUser(item)}>
                            <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </td>
                    </tr>
                        )
                    })
                }
                    </tbody>
         </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
