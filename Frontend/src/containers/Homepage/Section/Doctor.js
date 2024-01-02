import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from "../../../store/actions"
import { withRouter } from 'react-router';

class Doctor extends Component {
    constructor(props){
        super(props)
        this.state ={
            doctors: [],
            limit: 10
        }
    }
    async componentDidMount(){
        this.props.handleGetTopDoctors(this.state.limit)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.doctors !== this.props.doctors){
            this.setState({
                doctors: this.props.doctors
            })
        }
    }
    
    handleViewDetailDoctor =(id) =>{
       this.props.history.push(`/doctor/${id}`)
    }
    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        
        let arrdoctors = this.state.doctors
        let language = this.props.language
        arrdoctors = arrdoctors.concat(arrdoctors).concat(arrdoctors) // fake data
        return (
            <div className='section-container doctor'>
                <div className='section-content'>
                    <div className = 'header'>
                        <span className = "tittle"><FormattedMessage id ='doctor.tittle'/></span>
                        <button className= 'btn-select'><FormattedMessage id ='common.btn_content'/></button>
                    </div>
                    <div className ='body'>
                    <Slider {...this.props.settings}>
                        {arrdoctors && arrdoctors.length > 0 
                        && arrdoctors.map((item, index) => {
                            let ViName = `${item.positionData.valueVi}, ${item.fullname}`
                            let EnName = `${item.positionData.valueEn}, ${item.fullname}`
                            let imageBase64 = ''
                            if(item.image){
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            return (
                            <div className='slider-content'>
                                <div className = 'doctor-border' onClick={() => this.handleViewDetailDoctor(item.id)}>
                                    <div className = 'image-content doctor'
                                       style={{backgroundImage: `url(${imageBase64})`}}> 
                                    </div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'>{language == 'en' ? EnName : ViName}</div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_1'/></div>
                                    </div>
                                </div>
                            </div>
                        ) 
                        })}
                    </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        doctors : state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetTopDoctors: (limit) => dispatch(actions.fetchGetTopDoctors(limit)),
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
