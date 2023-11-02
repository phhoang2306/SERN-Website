import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
class Homepage extends Component {

    render() {
        return (
            <div>
                <Header/>
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
