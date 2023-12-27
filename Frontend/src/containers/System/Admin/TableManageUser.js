import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';
import {LANGUAGES} from '../../../utils'
import * as actions from "../../../store/actions"
import "./TableManageUser.scss"
class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            res: ''
        }
    }
    async componentDidMount() {
        this.props.getAllUser()
    }
    
    //Check Update of components
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.users !== this.props.users){
            this.setState({
                users: this.props.users
            })
        }
        if(prevProps.res !== this.props.res){
            this.setState({
                res: this.props.res
            })
        }
    }

    // handle delete function
    handleOnClickDelete = async(id) =>{
        await this.props.deleteUser(id)
        if (this.state.res.errCode === 0){
            toast.success(this.props.language === LANGUAGES.VI ?'Xóa tài khoản thành công' : 'Delete account succesfully')
        } else if (this.state.res.errCode === 2){
            toast.error(this.props.language === LANGUAGES.VI ?'Tài khoản không tồn tại' : "Account doesn't exist")
        }
    }

    // handle ediit function
    handleOnClickEdit = async(user) =>{
       this.props.handleGetDataFromChild(user)
    }
    render() {
        return (
            <div className='table-container'>
                <table id = 'TableManageUser'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th><FormattedMessage id ='user.email'/></th>
                        <th><FormattedMessage id ='user.fullname'/></th>
                        <th><FormattedMessage id ='user.phone'/></th>
                        <th><FormattedMessage id ='user.address'/></th>
                        <th><FormattedMessage id ='user.gender'/></th>
                        <th><FormattedMessage id ='user.role'/></th>
                        <th><FormattedMessage id ='user.position'/></th>
                        <th><FormattedMessage id ='user.action'/></th>
                    </tr>
                    {this.state.users && this.state.users.map((item, index) => {
                        return(
                            <tr>
                                <td>{item.id}</td>
                                <td> {item.email}</td>
                                <td>{item.fullname}</td>
                                <td> {item.phoneNumber}</td>
                                <td> {item.address}</td>
                                <td> {item.gender  === "M" ? <FormattedMessage id ='user.male'/> : <FormattedMessage id ='user.female'/>}</td>
                                <td> {item.roleID}</td>
                                <td> {item.positionID}</td>
                                <button className = 'editBtn'
                                onClick={() => this.handleOnClickEdit(item)}> <i className='fas fa-pencil-alt'></i></button>
                                <button className = 'delBtn' 
                                onClick={() => this.handleOnClickDelete(item.id)}> <i class="fa fa-trash"></i></button>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        res: state.user.res, 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.fetchGetAllUser()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
