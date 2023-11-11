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
            genders: [],
            roles: [],
            positions: [], 
            preView: '',
            email: '',
            password: '',
            fullname: '',
            phone: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
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
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].key : ''
            })
        }
        if(prevProps.roles !== this.props.roles){
            this.setState({
                roles: this.props.roles,
                role: this.props.roles && this.props.roles.length > 0 ? this.props.roles[0].key : ''
            })
        }
        if(prevProps.positions !== this.props.positions){
            this.setState({
                positions: this.props.positions,
                position: this.props.positions && this.props.positions.length > 0 ? this.props.positions[0].key : ''
            })
        }
    }

    handleOnChangeImage = (event) =>{
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
            this.setState({
                preView: reader.result,
                avatar: file
            });
            };
            reader.readAsDataURL(file);
        }
    }

    handleOnChangeValue = (event, id) =>{
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrCheck = ['email', 'password', 'fullname', 'phone', 'address']
        for (let i = 0; i < arrCheck.length; ++i){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('Missing input paramter ' + arrCheck[i] + ' !!!')
                break;
            }
        }
        return isValid;
    }
    handleOnSave = () =>{
        if(this.checkValidateInput()){
            console.log(this.state)
        }
    }

    render() {
        const {language} = this.props
        const {email, password,fullname, phone,address} = this.props
        return (
            <div className="redux-container" >
                <div className='redux-title'>
                    <div className='title'>
                        USER MANAGER REDUX
                    </div>
                </div>
                <div className='redux-body'>
                    <div className='text-center'>
                        <span><FormattedMessage id ='user.add'/></span>
                        <div className='col-3 mt-3'>
                                <button className='btn btn-primary' 
                                onClick={() => this.handleOnSave()}><FormattedMessage id ='user.save' /></button>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.email'/></label>
                                <input className = "form-control" type ="email" placeholder ="@gmail.com" value={email} 
                                onChange={(event) => {this.handleOnChangeValue(event, 'email')}}/>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.password'/></label>
                                <input className = "form-control" type ="password" 
                                value={password} onChange={(event) => {this.handleOnChangeValue(event, 'password')}}/>
                            </div>
                           <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.fullname'/></label>
                                <input className = "form-control" type ="text" placeholder ="Full name"
                                value={fullname} onChange={(event) => {this.handleOnChangeValue(event, 'fullname')}}/>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.phone'/></label>
                                <input className = "form-control" type ="text" placeholder ="+84"
                                value={phone} onChange={(event) => {this.handleOnChangeValue(event, 'phone')}}/>
                            </div>
                            <div className='col-6 mt-3'>
                                <label><FormattedMessage id ='user.address'/></label>
                                <input className = "form-control" type ="text" placeholder ="Ho Chi Minh City"
                                value={address} onChange={(event) => {this.handleOnChangeValue(event, 'address')}}/>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.gender'/></label>
                                <select className="form-control"
                                     onChange={(event) => {this.handleOnChangeValue(event, 'gender')}}>
                                    {this.state.genders && this.state.genders.length > 0 && 
                                        this.state.genders.map((item,index) => {return (
                                            <option key ={index} value ={item.key}> 
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn} 
                                            </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.role'/></label>
                                <select class="form-control"
                                onChange={(event) => {this.handleOnChangeValue(event, 'role')}}>
                                    {this.state.roles && this.state.roles.length > 0 && 
                                        this.state.roles.map((item,index) => {return (
                                            <option key ={index} value ={item.key} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.position'/></label>
                                <select class="form-control"
                                onChange={(event) => {this.handleOnChangeValue(event, 'position')}}>
                                    {this.state.positions && this.state.positions.length > 0 && 
                                        this.state.positions.map((item,index) => {return (
                                            <option key ={index} value ={item.key}>  {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.image'/></label>
                                <div className='image-container'>
                                    <input id =  "upload-image" type ="file" hidden
                                        onChange={(event) =>this.handleOnChangeImage(event)}/>
                                    <label className = "upload-button" htmlFor='upload-image'><FormattedMessage id ='user.upload-image'/><i class="fa fa-upload"></i> </label> 
                                </div>
                            </div>
                            <div className = 'col-6 mt-3'>
                                {this.state.preView && (
                                    <img src={this.state.preView} alt="Preview" style={{ maxWidth:'100%', maxHeight:'100%' }} />
                                )}
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
