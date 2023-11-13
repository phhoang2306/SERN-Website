import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { omit } from 'lodash';
import {getAllUSers} from '../../services/userServiceAPI'
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
        let response =  await getAllUSers('all')
        console.log(response)
        if(response.errCode === 0 && response){
            this.setState({arrUsers: response.data},() =>{}) // Call back
        }
    }
    
    handleAddNewUser = () =>{
        this.setState({isOpenModalUser: true})
    }

    toggleUserModal = () =>{
        this.setState({isOpenModalUser: !this.state.isOpenModalUser})
    }
    render() {
        return (
            <div className = "users-container">
                <div className = 'title text-center'>Mange Users</div>
                <ModalUser 
                    isOpen = {this.state.isOpenModalUser}
                    toggle = {this.toggleUserModal}
                />
                <div className ="mx-1"> 
                <button
                    onClick = {() => this.handleAddNewUser()} 
                    className = 'btn btn-primary px-3 '> 
                    <i class="fa fa-plus">
                    </i>  Add new use
                </button>
                </div>
                <div className = "user-table mt-3 mx-3">
                    <table id="customers">
                        <tr>
                            <th>ID</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role ID</th>
                            <th>Phone number</th>
                            <th>Position ID</th>
                            <th>Action</th>
                        </tr>
                        {this.state.arrUsers && this.state.arrUsers.map((item, index) => {
                            return(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.fullname}</td>
                                    <td> {item.email}</td>
                                    <td> {item.address}</td>
                                    <td> {item.roleID}</td>
                                    <td> {item.phoneNumber}</td>
                                    <td> {item.positionID}</td>
                                    <button className = 'editBtn'> <i className='fas fa-pencil-alt'></i></button>
                                    <button className = 'delBtn' > <i class="fa fa-trash"></i></button>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
