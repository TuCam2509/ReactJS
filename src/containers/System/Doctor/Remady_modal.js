import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Remady_modal.scss'
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import {CommonUtils} from '../../../utils'



class Remady_modal extends Component {
    constructor(props) {
    super(props);
        this.state={
            email:'',
            imageBase64:''
            
        }
    
    }
    
    async componentDidMount(){
        if(this.props.dataModal){
            this.setState({
                email:this.props.dataModal.email
            })
        }

       
            
        }
        componentDidUpdate(prevProps, prevState,snapshot){
            if(prevProps.dataModal !== this.props.dataModal){
                this.setState({
                    email:this.props.dataModal.email
                })
            }

        }
       
     
    checkemail=()=>{
        const input = document.querySelector("#email");
        const display = document.querySelector("#result");
        if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
         display.style.color='#008000'
         display.innerHTML = input.value + ' is valid';
       } else {
        display.style.color='#FF0000'

         display.innerHTML = input.value + ' is not a valid email';
       }
   }
   handleChangeEmail=(event)=>{
    this.setState({
        email:event.target.value
    })

   }
   handleChangeImage=async(event)=>{
    let data=event.target.files;
    let file=data[0]
    if(file){
        let base64=await CommonUtils.getBase64(file)
        this.setState({
          imageBase64:base64
        })
    }

}
handllesendMedy=()=>{
    this.props.sendMedy(this.state)
}
    
    

        render() {
            let {isOpenModal,isCloseRemady,dataSchedule,isShowLinkDetail,isPriceDetail,dataModal,sendMedy}=this.props
            return (
               <Modal 
               isOpen={isOpenModal}  
               className={'booking-modal-container'} 
               size='md' 
               centered>
                <div>
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={isCloseRemady}>
                        <span aria-hidden="true">×</span></button>
                    </div>
          <ModalBody>
            <div className='row'>
              <div className='col-6 form-group'>
                   <label>Email bệnh nhân</label>
                   <input className='form-control' 
                   type='email' id="email" 
                   value={this.state.email}
                   onChange={(event)=>this.handleChangeEmail(event)}
                   />
               
              </div>
              <div className='col-6 form-group'>
                   <label>Chọn file đơn thuốc</label>
                   <input className='form-control-file' 
                   type='file'
                   onChange={(event)=>this.handleChangeImage(event)}
                   />
                
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.handllesendMedy()}>Send</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
                </div>
                
               </Modal>

            )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders:state.admin.genders,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Remady_modal);
