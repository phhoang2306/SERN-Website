import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/Specialty';
import Medical from './Section/Medical';
import Doctor from './Section/Doctor';
import Handbook from './Section/Handbook';
import About from './About';
import Footer from './Footer';
import './Homepage.scss';
class Homepage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScrol: 2
        };
        return (
            <div>
                <Header isShow ={true}/>
                <Specialty  settings = {settings}/>
                <Medical settings = {settings} />
                <Doctor settings = {settings} />
                <Handbook/>
                <About/>
                <Footer isShow ={true}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
