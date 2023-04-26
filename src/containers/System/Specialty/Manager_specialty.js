import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES,CommonUtils} from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './Manager_specialty.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileArrowUp} from '@fortawesome/free-solid-svg-icons'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import {createNewSpecialty} from '../../../services/useService'
import {toast} from 'react-toastify'
const mdParser = new MarkdownIt(/* Markdown-it options */);//covert từ html sang text
class Manager_specialty extends Component {
    constructor(props) {
    super(props);
        this.state={
            name:'',
            prevImgUrl:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
            isOpen:false,
          
        }
    
    }
    async componentDidMount(){
        
            
        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
           
            }
            handleChangeImage=async(event)=>{
                let data=event.target.files;
                let file=data[0]
                if(file){
                    let base64=await CommonUtils.getBase64(file)
                    this.setState({
                        prevImgUrl:base64,
                    })
                }
        
            }
            openPriviewImage=()=>{
                if(!this.state.prevImgUrl) return ;
                this.setState({
                    isOpen:true
                })
            }
             
       handleEditorChange=({ html, text }) =>{
        this.setState({
            descriptionHTML:html,
            descriptionMarkdown:text
        })
          }
          handleOnChangeInput=(event,id)=>{
            let stateCopy={...this.state}
            stateCopy[id]=event.target.value
            this.setState({
                ...stateCopy
            })


          }
          handleSaveNewSpeciatly=async()=>{
            console.log("check sate",this.state)
            let res=await createNewSpecialty(this.state)

           if(res && res.errCode===0){
            toast.success("Add new speciatly success")
            this.setState({
            name:'',
            prevImgUrl:'',
            descriptionHTML:'',
            descriptionMarkdown:'',

            })
           }else{
            toast.error("Add new specialty error")
            console.log("check res:",res)

           }
          }
           
        render() {
            
            return (
                <div className='manager-specialty-body'>
                       {this.state.isOpen===true &&
                <Lightbox
            mainSrc={this.state.prevImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
                    }
                <div className='manager-specialty-container'>
                    <div className='ms-title'>Quản lý chuyên khoa</div>
                    <div className='all-new-specialty row'>

                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa</label>
                            <input 
                            id='name'
                            className='form-control' 
                            value={this.state.name}
                            onChange={(event)=>this.handleOnChangeInput(event,'name')}
                            type='text'/>

                        </div>
                        
                        <div className='col-6'>
                            <label>Ảnh chuyên khoa</label>
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
                    <div className='col-12'>
                  <MdEditor 
                    style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)}
                    value={this.state.descriptionMarkdown}
                    onChange={this.handleEditorChange} 
                   />
                    </div>
                    <div className='col-12 btn-save'>
                       <button 
                       onClick={()=>this.handleSaveNewSpeciatly()}
                       className='btn btn-warning btn-save'>Save</button>
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
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager_specialty);
