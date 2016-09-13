import autobind from 'autobind-decorator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { requestedInitialize } from 'Actions/Messenger';
import { getMessengerState } from 'Reducers/Messenger';

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
        requestedInitialize: bindActionCreators(requestedInitialize, dispatch)
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
        if (!initialized) {
            requestedInitialize();
        }
    }
    render(): React.Element<*> {
        const { initialized } = this.props;
        const state = initialized ? 'ready' : 'loading';
        return (
            <section className="MessengerContainer">
                Messenger Container {state}
            </section>
        );
    }
}

export default MessengerContainer;
