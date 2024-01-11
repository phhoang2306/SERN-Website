import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Base extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <Fragment>

            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Base);