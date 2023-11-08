import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../utils';
import {changeLanguage} from '../../store/actions'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {
    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    render() {
        let language = this.props.language;
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='language'>
                    <span className='welcome-user'><FormattedMessage id="home.welcome"/>userInfo.fullname</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active': 'language-en'}
                    onClick={() => this.handlechangeLanguage(LANGUAGES.EN)}>EN
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'}
                    onClick={() => this.handlechangeLanguage(LANGUAGES.VI)}>VI
                    </span>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    //console.log(state.user);
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp : (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
