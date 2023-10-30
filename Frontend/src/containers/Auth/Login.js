import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleOnChangeUsername = (event) =>{
        this.setState({
            username: event.target.value,
        })
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value,
        })
    }
    handleLogin = () =>{
        console.log(this.state.username + "   " + this.state.password)
    }

    render() {


        return (
            <div className = 'login-background'>
                <div className = 'login-container'>
                    <div className = 'login-content'>
                        <div className = 'col-12 text-login'>Login</div>
                        <div className = 'col-12 from-group login-input'>
                            <label>Username</label>
                            <input type='text'className='form-control' placeholder='Enter your username' value = {this.state.username}
                            onChange ={(event) => this.handleOnChangeUsername(event)}/>
                        </div>
                        <div className = 'col-12 from-group login-input'>
                            <label>Password</label>
                            <input type='password'className='form-control'placeholder='Enter your password' value = {this.state.password}
                            onChange ={(event) => this.handleOnChangePassword(event)}/>
                        </div>
                        <div className='col-12'>
                            <button className = 'btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className = 'col-12'>
                            <span className = "forgot-password">Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span>Or Login with</span> 
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-facebook facebook-icon facebook"></i>
                            <i className="fab fa-google google-icon google"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
