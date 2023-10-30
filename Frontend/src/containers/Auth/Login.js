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
            isshowed: false
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
    handleShowHidePassword = () => {
        this.setState({
            isshowed: !this.state.isshowed
        })
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
                            <div className='hide-password'>
                                <input type={this.state.isshowed ? 'text' : 'password'}className='form-control'placeholder='Enter your password' value = {this.state.password}
                                onChange ={(event) => this.handleOnChangePassword(event)} />
                                <span onClick={() => {this.handleShowHidePassword()}}> 
                                    <i id="toggler"className={this.state.isshowed ? "far fa-eye eye" : "far fa-eye-slash eye"}></i>
                                </span>
                            </div>
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
