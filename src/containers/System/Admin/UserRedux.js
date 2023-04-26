import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES,CRUD_ACTIONS,CommonUtils} from '../../../utils'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './UseRedux.scss'
import TableManageUser from './TableManageUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileArrowUp} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class UserRedux extends Component {

    constructor(props){
        super(props)
        this.state={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            prevImgUrl:'',
            isOpen:false,

            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',
            action:'',
            userEditId:''


        }
    }
   async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart()
    //this.props.dispatch(actions.fetchGenderStart())


    //try {
        //let res=await getAllCodeSevice("gender")
        //if(res && res.errCode===0){
            //this.setState({
                //genderArr:res.data
            //})
        //}
        
    //} catch (error) {
        //console.log(error)
        
    //}
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.genderRedux !==this.props.genderRedux){
            let arrGendres=this.props.genderRedux
            this.setState({
                genderArr:arrGendres,
                gender:arrGendres && arrGendres.length>0 ? arrGendres[0].keyMap:''

            })
        }
        if(prevProps.positionRedux !==this.props.positionRedux){
            let arrPositions=this.props.positionRedux
            this.setState({
                positionArr:arrPositions,
                position:arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap:''

            })
        }
        if(prevProps.roleRedux !==this.props.roleRedux){
            let arrRole=this.props.roleRedux
            this.setState({
                roleArr:arrRole,
                role:arrRole && arrRole.length>0 ? arrRole[0].keyMap:''

            })
        }
        if(prevProps.listUsers !==this.props.listUsers){
            let arrGendres=this.props.genderRedux
            let arrPositions=this.props.positionRedux
            let arrRole=this.props.roleRedux
            this.setState({
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:arrGendres && arrGendres.length>0 ? arrGendres[0].keyMap:'',
            position:arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap:'',
            role:arrRole && arrRole.length>0 ? arrRole[0].keyMap:'',
            avatar:'',
            action:CRUD_ACTIONS.CREATE,
            prevImgUrl:''
           
            })
        }
    
    }
    handleChangeImage=async(event)=>{
        let data=event.target.files;
        let file=data[0]
        if(file){
            let base64=await CommonUtils.getBase64(file)
            let objectUrl=URL.createObjectURL(file)
            this.setState({
                prevImgUrl:objectUrl,
                avatar:base64
            })
        }

    }
    openPriviewImage=()=>{
        if(!this.state.prevImgUrl) return ;
        this.setState({
            isOpen:true
        })
    }
    handleSaveUser=()=>{
       let isVail= this.checkVadidateInput()
       if(isVail===false) return;
       let {action}=this.state;
       if(action===CRUD_ACTIONS.CREATE){
       this.props.createNewUser({
                    email:this.state.email,
                    password:this.state.password,
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    address:this.state.address,
                    phoneNumber:this.state.phoneNumber,
                    gender:this.state.gender,
                    roleId:this.state.role,
                    positionId:this.state.position,
                    avatar:this.state.avatar
       })}
       if(action===CRUD_ACTIONS.EDIT){
        this.props.editNewUserRedux({
            id:this.state.userEditId,
            email:this.state.email,
            password:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phoneNumber:this.state.phoneNumber,
            gender:this.state.gender,
            roleId:this.state.role,
            positionId:this.state.position,
            avatar:this.state.avatar

        })


       }

        this.props.fetchUserRedux() 
    }
    checkVadidateInput=()=>{
        let isVail=true;
        let arrCheck=['firstName','lastName','email','password','address','phoneNumber']
        for(let i=0;i<arrCheck.length;i++){
        if(!this.state[arrCheck[i]]){
            isVail=false;
            alert('This input is required:'+arrCheck[i])
            break;
        }
        }
        return isVail;


    }
    
    onChangeInput=(event,id)=>{
        let copyState={...this.state}
        copyState[id]=event.target.value
        this.setState({
            ...copyState
        })

    }
    handleEditUserFormParent=(user)=>{
        let imageBase64=''
        if(user.image){
            imageBase64=new Buffer(user.image,'base64',toString('binary'))
            console.log('base64',imageBase64)
        }
        this.setState({
            email:user.email,
            password:'HARDCODE',
            firstName:user.firstName,
            lastName:user.lastName,
            phoneNumber:user.phoneNumber,
            address:user.address,
            gender:user.gender,
            position:user.positionId,
            role:user.roleId,
            avatar: '',
            prevImgUrl:imageBase64,
            action:CRUD_ACTIONS.EDIT,
            userEditId:user.id
            },()=>{
                console.log("check base 64",this.state)
            })

    }


    render() {
        let genders=this.state.genderArr
        let positions=this.state.positionArr
        let roles=this.state.roleArr
        let language=this.props.language
        let isLoadingGender=this.props.isLoadingRedux

        let {email,password,firstName,lastName,address,phoneNumber,gender,position,role,avatar}=this.state
        console.log('check props position redux',this.props.positionRedux)
        return (
            <div className='user_redux_container'>
                <div className='title'>
                User Redux
            </div>
                <div className="user_redux_body">
                    {this.state.isOpen===true &&
                <Lightbox
            mainSrc={this.state.prevImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
                    }
                <div className='container'>
                    <div className='col-12 my-3 h2 text-center text-info'><FormattedMessage id="manage-user.add"/></div>
                    <div className='row'>
                        <div className='col-12'>{isLoadingGender===true ? <div className='spinner-border text-primary'></div>:'' }</div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.firstName"/></label>
                            <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Enter your firstName' 
                            value={firstName}
                            onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                            name='firstName'/>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.lastName"/></label>
                            <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Enter your lastName' 
                            value={lastName}
                            onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                            name='lastName'/>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.email"/></label>
                            <input 
                            className='form-control' 
                            type='email' 
                            placeholder='Enter your email' 
                            value={email}
                            onChange={(event)=>{this.onChangeInput(event,'email')}}
                            disabled={this.state.action ===CRUD_ACTIONS.EDIT ? true:false}
                            name='email'/>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.password"/></label>
                            <input 
                            className='form-control' 
                            type='password' 
                            placeholder='Enter your password' 
                            value={password}
                            onChange={(event)=>{this.onChangeInput(event,'password')}}
                            disabled={this.state.action ===CRUD_ACTIONS.EDIT ? true:false}
                            name='password'/>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.phoneNumber"/></label>
                            <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Enter your password'
                            value={phoneNumber}
                            onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}
                             name='phonenumber'/>
                        </div>
                        <div className='col-9'>
                            <label><FormattedMessage id="manage-user.address"/></label>
                            <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Enter your address' 
                            value={address}
                            onChange={(event)=>{this.onChangeInput(event,'address')}}
                            name='address'/>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.gender"/></label>
                            <select className='form-control'  onChange={(event)=>{this.onChangeInput(event,'gender')}} value={gender}>
                            {genders && genders.length>0 && genders.map((item,index)=>{
                                    return (
                                        <option key={index} value={item.keyMap}>{language===LANGUAGES.VI ?item.valueVi:item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.position"/></label>
                            <select className='form-control'  onChange={(event)=>{this.onChangeInput(event,'position')}} value={position}>
                            {positions && positions.length>0 && positions.map((item,index)=>{
                                    return (
                                        <option key={index} value={item.keyMap}>{language===LANGUAGES.VI ?item.valueVi:item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.roleId"/></label>
                            <select className='form-control'onChange={(event)=>{this.onChangeInput(event,'role')}} value={role} >
                            {roles && roles.length>0 && roles.map((item,index)=>{
                                    return (
                                        <option key={index} value={item.keyMap}>{language===LANGUAGES.VI ?item.valueVi:item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.image"/></label>
                            <div className='prev-img-container'>
                            <input 
                            id="prev-img" 
                            type='file' 
                            hidden
                            onChange={(event)=>this.handleChangeImage(event)}
                            />
                            <label className='label-upload' htmlFor='prev-img'>Tải ảnh <FontAwesomeIcon icon={faFileArrowUp}/></label>
                            <div className='prev-image' 
                            style={{backgroundImage:`url(${this.state.prevImgUrl})`}} 
                            onClick={()=>this.openPriviewImage()}
                            ></div>
                            </div>
                        </div>
                        <div className='col-12 my-3'>
                        <button 
                        onClick={()=>this.handleSaveUser()} 
                        className={this.state.action===CRUD_ACTIONS.EDIT?'btn btn-outline-danger':'btn btn-info'}>
                            {this.state.action===CRUD_ACTIONS.EDIT ?
                            <FormattedMessage id="manage-user.edit"/>
                            :
                            <FormattedMessage id="manage-user.button"/>
                            } 
                            </button>
                            
                        </div>
                        <div className='col-12 mb-3'>
                            <TableManageUser 
                            handleEditUserProps={this.handleEditUserFormParent}
                            action={this.state.action}
                            />
                            </div>
                    </div>
                </div>
         </div>
         </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux:state.admin.genders,
        isLoadingRedux:state.admin.isLoadingGender,
        positionRedux:state.admin.positions,
        roleRedux:state.admin.roles,
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() =>dispatch(actions.fetchGenderStart()),
        getPositionStart:() =>dispatch(actions.fetchPositionStart()),
        getRoleStart:() =>dispatch(actions.fetchRoleStart()),
        createNewUser:(data) =>dispatch(actions.createNewUser(data)),
        fetchUserRedux:() =>dispatch(actions.fetchAllUserStart()),
        editNewUserRedux:(data) =>dispatch(actions.editNewUser(data))


        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux:(laguage)=>dispatch(actions.changeLanguageApp(laguage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
