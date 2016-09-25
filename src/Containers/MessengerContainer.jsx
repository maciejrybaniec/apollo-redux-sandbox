import autobind from 'autobind-decorator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { requestedInitialize } from 'Actions/Messenger';
import { requestedUsers } from 'Actions/Users';
import { getMessengerState } from 'Reducers/Messenger';
import NetworksContainer from 'Containers/NetworksContainer';

type MessengerContainerPropsType = {
    initialized: boolean
};

const mapStateToProps = (state): MessengerContainerPropsType => {
    return {
        initialized: getMessengerState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestedInitialize: bindActionCreators(requestedInitialize, dispatch),
        requestedUsers: bindActionCreators(requestedUsers, dispatch)
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class MessengerContainer extends Component {
    /**
     * Prepare messenger container
     * @fires MessengerActions#requestedInitialize
     */
    componentWillMount() {
        const { initialized, requestedInitialize } = this.props;
        this.props.requestedUsers();
        if (!initialized) {
            requestedInitialize();
        }
    }
    render(): React.Element<*> {
        return (
            <section className="MessengerContainer">
                <div className="MessengerContainer__networks">
                    <NetworksContainer />
                </div>
                <div className="MessengerContainer__root">
                    Root
                </div>
            </section>
        );
    }
}

export default MessengerContainer;
