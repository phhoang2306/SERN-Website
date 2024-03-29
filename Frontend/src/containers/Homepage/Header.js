import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils';
import {changeLanguage} from '../../store/actions'
import { withRouter } from 'react-router';
import './Header.scss'
class Header extends Component {

    handlechangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    returnToHome = () =>{
        this.props.history.push(`/home`)
    }
    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='header-container-1'>
                    <div className='header-content'>
                        <div className='left-content'>
                            <i class="fa fa-bars"></i>
                            <div className ='header-logo' 
                                onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className = 'child-content'>
                                <div> <b><FormattedMessage id ='home.specialty'/></b> </div>
                                <div className='sub-tittle'><FormattedMessage id ='home.find-doctor'/></div>
                            </div>
                            <div className = 'child-content'>
                                <di><b><FormattedMessage id ='home.facility'/></b></di>
                                <div className='sub-tittle'><FormattedMessage id ='home.choose-facility'/></div>
                            </div>
                            <div className = 'child-content'>
                                <div> <b><FormattedMessage id ='home.doctor'/></b> </div>
                                <div className='sub-tittle'><FormattedMessage id ='home.choose-doctor'/></div>
                            </div>
                            <div className = 'child-content'>
                                <div><b><FormattedMessage id ='home.package'/></b></div>
                                <div className='sub-tittle'><FormattedMessage id ='home.check-health'/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support-content'><i class="fa fa-question-circle"></i> <FormattedMessage id ='home.support'/></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'}>
                                <span onClick={() => this.handlechangeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active': 'language-en'}>
                                <span onClick={() => this.handlechangeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShow === true &&
                    <div className ='banner-container'>
                        <div className = 'banner-content-up'>
                            <div className = 'banner-tittle-1'><FormattedMessage id ='banner.tittle-1'/></div>
                            <div className = 'banner-tittle-2'><FormattedMessage id ='banner.tittle-2'/></div>
                            <div className = 'banner-search'>
                                <i className="fa fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                            </div>
                        </div>
                        <div className = 'banner-content-down'>
                            <div className = 'banner-option'>
                                <div className ='child-option'>
                                    <i className='far fa-hospital'></i>
                                    <div className='text'><FormattedMessage id ='banner.child-1'/></div>
                                </div>
                                <div className ='child-option'>
                                    <i class="fas fa-mobile-alt"></i>
                                    <div className='text'><FormattedMessage id ='banner.child-2'/></div>
                                </div>
                                <div className ='child-option'>
                                    <i class="fas fa-procedures"></i>
                                    <div className='text'><FormattedMessage id ='banner.child-3'/></div>
                                </div>
                                <div className ='child-option'>
                                    <i className ="fa fa-stethoscope"></i>
                                    <div className='text'><FormattedMessage id ='banner.child-4'/></div>
                                </div>
                                <div className ='child-option'>
                                    <i className="fa fa-heart"></i>
                                    <div className='text'><FormattedMessage id ='banner.child-5'/></div>
                                </div>
                                <div className ='child-option'>
                                    <i class="fas fa-user-md"></i>
                                    <div className='text'><FormattedMessage id ='banner.child-6'/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp : (language) => dispatch(changeLanguage(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
