import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNetworks } from 'Reducers/Networks';

const mapStateToProps = (state) => {
    return {
        networks: getNetworks(state)
    };
}

@connect(mapStateToProps)
class NetworksContainer extends Component {
    render() {
        return (
            <div className="NetworksContainer">
                {this.props.networks}
            </div>
        );
    }
}

export default NetworksContainer;
