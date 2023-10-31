import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { omit } from 'lodash';
import {getAllUSers} from '../../services/userServiceAPI'
class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response =  await getAllUSers('all')
        if(response.errCode === 0 && response){
            this.setState({arrUsers: response.data},() =>{}) // Call back
        }
    }

    render() {
        return (
            <div className = "users-container">
                <div className = 'title text-center'>Mange Users</div>
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
