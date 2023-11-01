import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ModalUser extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggle();
    }

    render() {
        return (
            <Modal 
                isOpen = {this.props.isOpen} 
                toggle = {()=>{this.toggle()}} 
                className = {'modalUser'}
                size = 'lg'
                centered
            >
                <ModalHeader toggle = {()=>{this.toggle()}}>Create new account</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                                <label>Email: </label>
                                <input type ="text" placeholder='@gmail.com'/>
                        </div>
                        <div className='input-container'>
                                <label>Password: </label>
                                <input type ="text"/>
                        </div>
                        <div className='input-container max-width-input'>
                                <label>Full name: </label>
                                <input type ="text"placeholder='John Caiter'/>
                        </div>
                        <div className='input-container max-width-input'>
                                <label>Address: </label>
                                <input type ="text" placeholder='Country'/>
                        </div>
                        <div className='input-container'>
                                <label>Position ID: </label>
                                <input type ="text" placeholder='123'/>
                        </div>
                        <div className='input-container'>
                                <label>Phone number: </label>
                                <input type ="text" placeholder='+84'/>
                        </div>
                        <div className='input-container'>
                                <label for="inpuRole">Role ID: </label>
                                <select class="form-control" name = 'roleID'> RoleID
                                <option value = '1'>Admin</option>
                                <option value = '2'>Doctor</option>
                                <option value = '3'>Patient</option>
                                </select>
                        </div>
                        <div className='input-container'>
                        <label for="inputGender">Gender</label>
                        <select class="form-control" name = 'gender'>
                          <option value = '1'>Male</option>
                          <option value = '0'>Female</option>
                        </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color ='primary' className = 'px-4 btn-create'onClick ={()=>{this.toggle()}}>Create</Button>{' '}
                    <Button color ='secondary' className = 'px-4 btn' onClick ={()=>{this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
