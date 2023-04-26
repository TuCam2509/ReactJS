import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../homepage/HomeHeader';
import './DetailDoctor.scss'
import {getDetailInforDoctor} from '../../../services/useService'
import { LANGUAGES } from '../../../utils';
import DSchedule from './DSchedule';
import DoctorInfoExtra from './DoctorInfoExtra';



class DetailDoctor extends Component {
    constructor(props) {
    super(props);
        this.state={
            detailDoctor:[],
            currentDoctor:-1
            
        }
    
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id
            this.setState({
                currentDoctor:id
            })
            let res=await getDetailInforDoctor(id)
            if(res.data.image){
                res.data.image = Buffer.from(res.data.image,'base64').toString('binary');
                }
                if(res && res.errCode===0){
                    this.setState({
                        detailDoctor:res.data
                    })
                }
                
            }

            
        }
        componentDidUpdate(prevProps,prevState,snapshot){
            
        }
        render() {
            let {language}=this.props
            let {detailDoctor}=this.state
            let nameVi=''
            let nameEn=''
            if(detailDoctor && detailDoctor.positionData){
                nameVi=`${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName}`
                nameEn=`${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`

            }
            console.log('check state:',this.state)
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='detail-doctor-content'>
                    <div className='intro-doctor'>
                     <div 
                     className='content-left'  
                     style={{backgroundImage:`url(${detailDoctor && detailDoctor.image ? detailDoctor.image:'' })`}}  >

                     </div>
                     <div className='content-right'>
                        <div className='up'>
                         {language===LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                         {detailDoctor.Markdown && detailDoctor.Markdown.description && 
                         <span>
                            {detailDoctor.Markdown.description}
                         </span>
                          }
                        </div>


                     </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                         <DSchedule
                         doctorIdFromParent={this.state.currentDoctor}
                         />
                        </div>
                        <div className='content-right'>
                         <DoctorInfoExtra doctorIdFromParent={this.state.currentDoctor}/>
                        </div>

                    </div>
                    <div className='infor-doctor'>
                      {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                       <div dangerouslySetInnerHTML={{__html:detailDoctor.Markdown.contentHTML}}>
                       </div>
                      }
                    </div>
                    <div className='comment-doctor'>
                            
                    </div>

                </div>
            </>
          
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
