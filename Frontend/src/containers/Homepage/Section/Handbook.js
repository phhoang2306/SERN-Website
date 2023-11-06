import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Handbook extends Component {
    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    };
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScrol: 2
        };
        return (
            <div className='section-container handbook'>
                <div className='section-content'>
                    <div className = 'header handbook'>
                        <span className = "tittle"><FormattedMessage id ='handbook.title'/></span>
                        <button className= 'btn-select'><FormattedMessage id ='common.btn_content'/></button>
                    </div>
                    <div className ='body'>
                    <Slider {...settings}>
                            <div className='slider-content'>
                                <div className = 'image-content handbook_1'></div>
                                <div className='text-content handbook'><FormattedMessage id ='handbook.handbook_1'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content handbook_2'></div>
                                <div className='text-content handbook'><FormattedMessage id ='handbook.handbook_2'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content handbook_3'></div>
                                <div className='text-content handbook'><FormattedMessage id ='handbook.handbook_3'/></div>
                            </div>
                            <div className='slider-content'>
                                <div className = 'image-content handbook_4'></div>
                                <div className='text-content handbook'><FormattedMessage id ='handbook.handbook_4'/></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
