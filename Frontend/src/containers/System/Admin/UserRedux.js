import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils';
import * as actions from "../../../store/actions"
import "./UserRedux.scss"

class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadingL: false,
            genders: [],
            roles: [],
            positions: []
        }
    }

    async componentDidMount() {
       this.props.getGenderStart()
       this.props.getRolerStart()
       this.props.getPositionStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genders !== this.props.genders){
            this.setState({
                genders: this.props.genders,
            })
        }
        if(prevProps.roles !== this.props.roles){
            this.setState({
                roles: this.props.roles,
            })
        }
        if(prevProps.positions !== this.props.positions){
            this.setState({
                positions: this.props.positions
            })
        }
    }

    render() {
        console.log(this.props.positions)
        const {language} = this.props
        return (
            <div className="redux-container" >
                <div className='redux-title'>
                    <div className='title'>
                        USER MANAGER REDUX
                    </div>
                </div>
                <div className='redux-body'>
                    <div className='text-center'><FormattedMessage id ='user.add'/></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.email'/></label>
                                <input className = "form-control" type ="email" placeholder ="@gmail.com"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.password'/></label>
                                <input className = "form-control" type ="password"/>
                            </div>
                           <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.fullname'/></label>
                                <input className = "form-control" type ="text" placeholder ="Full name"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.phone'/></label>
                                <input className = "form-control" type ="text" placeholder ="+84"/>
                            </div>
                            <div className='col-6 mt-2'>
                                <label><FormattedMessage id ='user.address'/></label>
                                <input className = "form-control" type ="text" placeholder ="Ho Chi Minh City"/>
                            </div>
                            <div className='col-6 mt-2'>
                                <label><FormattedMessage id ='user.image'/></label>
                                <input className = "form-control" type ="text" placeholder =".jpeg"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.gender'/></label>
                                <select class="form-control">
                                    {this.state.genders && this.state.genders.length > 0 && 
                                        this.state.genders.map((item,index) => {return (
                                            <option key ={index}> {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.role'/></label>
                                <select class="form-control">
                                    {this.state.roles && this.state.roles.length > 0 && 
                                        this.state.roles.map((item,index) => {return (
                                            <option key ={index}> {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.position'/></label>
                                <select class="form-control">
                                    {this.state.positions && this.state.positions.length > 0 && 
                                        this.state.positions.map((item,index) => {return (
                                            <option key ={index}> {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'></div>
                            <div className='col-3 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id ='user.save'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRolerStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
