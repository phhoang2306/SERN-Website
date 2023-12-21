import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions"
import {toast} from 'react-toastify';
import "./UserRedux.scss"
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genders: [],
            roles: [],
            positions: [], 
            preView: '',
            id: '',
            email: '',
            password: '',
            fullname: '',
            phone: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
            imagebase64: '',
            res: '',
            isOpen: false,
            action: CRUD_ACTIONS.CREAT,
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
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : ''
            })
        }
        if(prevProps.roles !== this.props.roles){
            this.setState({
                roles: this.props.roles,
                role: this.props.roles && this.props.roles.length > 0 ? this.props.roles[0].keyMap : ''
            })
        }
        if(prevProps.positions !== this.props.positions){
            this.setState({
                positions: this.props.positions,
                position: this.props.positions && this.props.positions.length > 0 ? this.props.positions[0].keyMap : ''
            })
        }
        if(prevProps.res !== this.props.res){
            this.setState({
                res: this.props.res
            })
        }
    }

    handleOnChangeImage =  async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.convertImageIntoBase64(file);
            let objectURL = URL.createObjectURL(file)
            this.setState({
                preView: objectURL,
                avatar: base64
            });
        }
        console.log(this.state.preView)
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
    handleOnClickBtn = async () =>{
        if (this.state.action === CRUD_ACTIONS.CREAT){
            if(this.checkValidateInput()){
                await this.props.createNewUser({
                    email: this.state.email,
                    fullname: this.state.fullname,
                    password: this.state.password,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleID: this.state.role,
                    phoneNumber: this.state.phone,
                    positionID: this.state.position,
                    image: this.state.avatar
                })
                if (this.state.res.errCode === 0){
                    toast.success(this.props.language === LANGUAGES.VI ?'Tạo tài khoản thành công' : 'Create account succesfully')
                    this.setState({
                        email: '',
                        password: '',
                        fullname: '',
                        phone: '',
                        address: '',
                        gender: this.props.genders && this.props.genders.length > 0 ? this.props.gendersc : '',
                        role: this.props.roles && this.props.roles.length > 0 ? this.props.roles[0].keyMap : '',
                        position: this.props.positions && this.props.positions.length > 0 ? this.props.positions[0].keyMap : '',
                        avatar: '',
                        preView: '',
                    })
                } else if (this.state.res.errCode === 1){
                    toast.error(this.props.language === LANGUAGES.VI ?'Email đã được sử dụng' : 'Email has been used')
                    this.setState({
                        email: ''
                    })
                }
            }
        }
        else if(this.state.action === CRUD_ACTIONS.EDIT){
            await this.props.editUser({
                id: this.state.id,
                email: this.state.email,
                fullname: this.state.fullname,
                address: this.state.address,
                gender: this.state.gender,
                roleID: this.state.role,
                phoneNumber: this.state.phone,
                positionID: this.state.position,
                image: this.state.avatar
            })
            if (this.state.res.errCode === 0){
                toast.success(this.props.language === LANGUAGES.VI ? 'Lưu dữ liệu thành công' : 'Save information succesfully')
                this.setState({
                    email: '',
                    password: '',
                    fullname: '',
                    phone: '',
                    address: '',
                    gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : '',
                    role: this.props.roles && this.props.roles.length > 0 ? this.props.roles[0].keyMap : '',
                    position: this.props.positions && this.props.positions.length > 0 ? this.props.positions[0].keyMap : '',
                    avatar: '',
                    action: CRUD_ACTIONS.CREAT,
                    preView: ''
                })
            } else if (this.state.res.errCode === 1){
                toast.error(this.props.language === LANGUAGES.VI ?'Người dùng không tồn tại' : this.state.res.message)
                this.setState({
                    email: '',
                    action: CRUD_ACTIONS.CREAT
                })
            }
        }
    }
    openPreviewImage = () =>{
        if(!this.state.preView) return;
        this.setState({
            isOpen: true
        })
    }
     // Get data from child
    handleGetDataFromChild = (user) =>{
        let imageBase64 = ''
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: '**********', 
            fullname: user.fullname,
            phone: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleID,
            position: user.positionID,
            avatar: '',
            preView: imageBase64,
            action: CRUD_ACTIONS.EDIT
        })
    }
    render() {
        const {language} = this.props
        const {email, password,fullname, phone,address, role, position, gender} = this.state
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
                                <button className= {this.state.action === CRUD_ACTIONS.CREAT ? 'btn btn-primary' : 'btn btn-warning'}
                                onClick={() => this.handleOnClickBtn()}>
                                    {this.state.action === CRUD_ACTIONS.CREAT ? 
                                    <FormattedMessage id ='user.create'/> : <FormattedMessage id ='user.edit'/>}
                                </button>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.email'/></label>
                                <input className = "form-control" type ="email" placeholder ="@gmail.com" value={email}
                                onChange={(event) => {this.handleOnChangeValue(event, 'email')}}
                                //disabled={this.state.action === CRUD_ACTIONS.CREAT ? false : true}
                                />
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.password'/></label>
                                <input className = "form-control" type ="password" 
                                value={password} onChange={(event) => {this.handleOnChangeValue(event, 'password')}}
                                disabled={this.state.action === CRUD_ACTIONS.CREAT ? false : true}/>
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
                            <div className='col-9 mt-3'>
                                <label><FormattedMessage id ='user.address'/></label>
                                <input className = "form-control" type ="text" placeholder ="Ho Chi Minh City"
                                value={address} onChange={(event) => {this.handleOnChangeValue(event, 'address')}}/>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.gender'/></label>
                                <select className="form-control"
                                     onChange={(event) => {this.handleOnChangeValue(event, 'gender')}}
                                     value = {gender}>
                                    {this.state.genders && this.state.genders.length > 0 && 
                                        this.state.genders.map((item,index) => {return (
                                            <option key ={index} value ={item.keyMap}> 
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn} 
                                            </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.role'/></label>
                                <select class="form-control"
                                onChange={(event) => {this.handleOnChangeValue(event, 'role')}}
                                value = {role}
                                >
                                    {this.state.roles && this.state.roles.length > 0 && 
                                        this.state.roles.map((item,index) => {return (
                                            <option key ={index} value ={item.keyMap} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-3'>
                                <label><FormattedMessage id ='user.position'/></label>
                                <select class="form-control"
                                onChange={(event) => {this.handleOnChangeValue(event, 'position')}}
                                value = {position}>
                                    {this.state.positions && this.state.positions.length > 0 && 
                                        this.state.positions.map((item,index) => {return (
                                            <option key ={index} value ={item.keyMap}>  {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
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
                            <div className='col-3 mt-3'>
                                <div className='preview-image'
                                style={{backgroundImage: `url(${this.state.preView})`}}
                                onClick={() => this.openPreviewImage()}>
                                </div>
                            </div>
                            <div className='col-12 my-4'>
                                <TableManageUser
                                    handleGetDataFromChild = {this.handleGetDataFromChild}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                <Lightbox
                    mainSrc={this.state.preView}
                    onCloseRequest={() => this.setState({isOpen: false})}
                />
                }
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
        isLoading: state.admin.isLoading,
        res: state.user.res, 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRolerStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.CreatUser(data)),
        editUser: (user) => dispatch(actions.editUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
