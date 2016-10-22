import autobind from 'autobind-decorator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { requestedInitialize } from 'Actions/Messenger';
import { requestedUsers } from 'Actions/Users';
import { getMessengerState } from 'Reducers/Messenger';

import Messenger from 'Components/Messenger';
import NetworksContainer from 'Containers/NetworksContainer';

import JoivyModel from 'ReactModel/Model/JoivyModel';

type MessengerContainerPropsType = {
    initialized: boolean
};

const mapStateToProps = (state): MessengerContainerPropsType => {
    return {
        initialized: getMessengerState(state)
    };
}

const mapDispatchToProps = {
  requestedInitialize,
  requestedUsers
};


class ImmutableModelTest extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        return !this.props.model.equals(nextProps.model);
    }
    render(): React.Element<*> {
        console.log('Render component');
        return (
            <div>
                {this.props.model.get('id')}
                Joivy Model Test
            </div>
        );
    }
}


@connect(mapStateToProps, mapDispatchToProps)
class MessengerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: new JoivyModel({ id: 'test' })
        };
    }
    /**
     * Prepare messenger container
     * @fires MessengerActions#requestedInitialize
     */
    componentWillMount() {
        /*const { initialized, requestedInitialize } = this.props;
        this.props.requestedUsers();
        if (!initialized) {
            requestedInitialize();
        }*/
    }
    render(): React.Element<*> {

        return (
            <section className="MessengerContainer">
                <div className="MessengerContainer__networks">
                    <NetworksContainer />
                </div>
                <div className="MessengerContainer__root">
                    Root: {this.state.model.get('id')}
                    <Messenger />
                    <span onClick={this._onClick}>Change model</span>
                    <ImmutableModelTest model={this.state.model}/>
                </div>
            </section>
        );
    }
    @autobind
    _onClick() {
        const model = this.state.model.update({ id: 'test1'});
        this.setState({
            model: model
        });
    }
}

export default MessengerContainer;
