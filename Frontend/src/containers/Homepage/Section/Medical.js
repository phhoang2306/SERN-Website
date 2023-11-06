import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Medical extends Component {

    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        return (
            <div className='section-container medical'>
                <div className='section-content'>
                    <div className = 'header'>
                        <span className = "tittle"><FormattedMessage id ='medical.tittle'/></span>
                        <button className= 'btn-select'><FormattedMessage id ='common.btn_content'/></button>
                    </div>
                    <div className ='body'>
                    <Slider {...this.props.settings}>
                            <div className='slider-content'>
                                <div className = 'image-content medical_1'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_1'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_2'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_2'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_3'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_3'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_4'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_4'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_5'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_5'/>t</div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_6'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_6'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_7'></div>
                                <div className='text-content'><FormattedMessage id ='medical.medical_7'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content medical_8'></div>
                                <div className='text-content'>H<FormattedMessage id ='medical.medical_8'/></div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medical);
