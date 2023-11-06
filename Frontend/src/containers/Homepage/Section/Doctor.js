import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Doctor extends Component {

    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        return (
            <div className='section-container doctor'>
                <div className='section-content'>
                    <div className = 'header'>
                        <span className = "tittle"><FormattedMessage id ='doctor.tittle'/></span>
                        <button className= 'btn-select'><FormattedMessage id ='common.btn_content'/></button>
                    </div>
                    <div className ='body'>
                    <Slider {...this.props.settings}>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_1'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_1'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_1'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_2'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_2'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_2'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_3'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_3'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_3'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_4'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_4'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_4'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_5'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_5'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_5'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_6'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_6'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_6'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_7'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_7'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_7'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'doctor-border'>
                                    <div className = 'image-content doctor_8'></div>
                                    <div className = 'position text-center'>
                                        <div className='name-doctor'><FormattedMessage id ='doctor.name_8'/></div>
                                        <div className='subtitle'><FormattedMessage id ='doctor.sub_8'/></div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
