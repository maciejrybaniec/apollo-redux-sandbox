/* @flow */

import JoivyModel from './JoivyModel';

type NetworkModelInit = {
    id: boolean
};

class NetworkModel extends JoivyModel<NetworkModelInit> {
    constructor(init: NetworkModelInit) {
        super(init);
    }
}

export default NetworkModel;
