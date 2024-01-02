import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./Footer.scss"
class Footer extends Component {

    render() {
        return (
            <Fragment>
                {this.props.isShow === true &&
                    <div className='footer-container'>
                        <p>&copy; 2023 Phan Huy Hoang</p>
                    </div>
                }
            </Fragment>
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
