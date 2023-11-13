import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import "./TableManageUser.scss"
class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    async componentDidMount() {
        this.props.getAllUser()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.users !== this.props.users){
            this.setState({
                users: this.props.users
            })
            console.log(this.props.users)
        }
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
                                <td> {item.gender}</td>
                                <td> {item.roleID}</td>
                                <td> {item.positionID}</td>
                                <button className = 'editBtn'> <i className='fas fa-pencil-alt'></i></button>
                                <button className = 'delBtn' > <i class="fa fa-trash"></i></button>
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
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.fetchGetAllUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
