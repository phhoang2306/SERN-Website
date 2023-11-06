import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./Footer.scss"
class Footer extends Component {

    render() {
        return (
            <div className='footer-container'>
                <p>&copy; 2023 Phan Huy Hoang</p>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
