import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Specialty extends Component {

    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        return (
            <div className='section-container specialty'>
                <div className='section-content'>
                    <div className = 'header specialty'>
                        <span className = "tittle"><FormattedMessage id ='specialty.tittle'/></span>
                        <button className= 'btn-select'><FormattedMessage id ='common.btn_content'/></button>
                    </div>
                    <div className ='body'>
                        <Slider {...this.props.settings}>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_1'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_1'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_2'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_2'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_3'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_3'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_4'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_4'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_5'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_5'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_6'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_6'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_7'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_7'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content specialty_8'></div>
                                <div className='text-content'><FormattedMessage id ='specialty.specialty_8'/></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
