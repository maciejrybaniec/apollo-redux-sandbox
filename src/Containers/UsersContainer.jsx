import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';

import { createUserAndDoSomething } from 'Actions';
import store from 'Store';
cd
const mapQueriesToProps = gql`
  query getUsers {
    users { id, name }
  }
`;

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUserAndDoSomething: bindActionCreators(createUserAndDoSomething, dispatch)
    };
};

const UserItem = (props) => {
    return (
        <li className="UserItem">
            {props.children}
        </li>
    );
}

@graphql(mapQueriesToProps)
@connect(mapStateToProps, mapDispatchToProps)
class UsersContainer extends Component {
    render() {
        return (
            <div className="UsersContainer">
            <button onClick={this._onClick} type="button">Dispatch action</button>
            { (this.props.data.loading ? (
                <div>Loading</div>
            ):
                <ul className="UsersContainer__list">
                    {this.props.data.users.map((user) => {
                        return (
                            <UserItem key={user.id}>{user.name}</UserItem>
                        );
                    })}
                </ul>
            )}
            </div>
        );
    }
    @autobind
    _onClick() {
        const { createUserAndDoSomething } = this.props;
        createUserAndDoSomething();
    }
}

export default UsersContainer;
