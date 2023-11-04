import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/Specialty';
import Medical from './Section/Medical';
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
                <Header/>
                <Specialty  settings = {settings}/>
                <Medical settings = {settings} />
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
