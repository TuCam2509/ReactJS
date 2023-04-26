
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speciatly.scss';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import {getAllSpecialty} from '../../../services/useService'
import {withRouter} from 'react-router'


class  Speciatly extends Component {
  constructor(props){
    super(props)
    this.state={
      dataSpecialty:[]
    }
  }
 async componentDidMount(){
   let res=await getAllSpecialty()
  this.setState({
     dataSpecialty:res.data ? res.data :[]

  })

  }
  handleViewSpec=(item)=>{
    if(this.props.history){
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

 }
    render() {
      let {dataSpecialty}=this.state
        return (
             <div className=' section_share section_spec'>
                <div className='section-container'>
                  <div className=' section-header'>
                    <span className='title-section'><FormattedMessage id="specialty.popular specialty"/></span>
                    <button className='btn-section'><FormattedMessage id="specialty.send"/></button>
                  </div>
                  <div className=' section-body'>
            <Slider {...this.props.settings}>
              {dataSpecialty && dataSpecialty.length>0 && dataSpecialty.map((item,index)=>{
                return (
                   <div className=' section-customzie' 
                   key={index}
                   onClick={()=>this.handleViewSpec(item)}
                   >
                    <div 
                    className='bg-img section_spec'
                    style={{backgroundImage:`url(${item.image})`}} 
                    />
                     <div className='spec-name'>{item.name}</div>
                   </div>

                )

              })}
            </Slider>

                  </div>
                </div>

             </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Speciatly));
