import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Medical extends Component {

    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScrol: 2
        };
        return (
            <div className='section-container'>
                <div className='section-content'>
                    <div className = 'header'>
                        <span className = "tittle">Chuyên khoa phổ biến</span>
                        <button className= 'btn-select'>Xem thêm</button>
                    </div>
                    <div className ='body'>
                        <Slider {...settings}>
                            <div className='slider-content'>
                                <div className = 'image-content'></div>
                                <span>Cơ xương khớp</span>
                            </div>
                            <div className='image-custome'>
                                <h1>2</h1>
                            </div>
                            <div className='image-custome'>
                                <h1>3</h1>
                            </div>
                            <div className='image-custome'>
                                <h1>4</h1>
                            </div> 
                            <div className='image-custome'>
                                <h1>5</h1>
                            </div>
                            <div className='image-custome'>
                                <h1>6</h1>
                            </div>
                            <div className='image-custome'>
                                <h1>7</h1>
                            </div>
                            <div className='image-custome'>
                                <h1>8</h1>
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
