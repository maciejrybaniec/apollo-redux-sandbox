/* @flow */

import Record from 'Decorators/RecordDecorator';

@Record()
class NetworkModel {
  id: string;
  name: string;
  disabled: boolean;
  users: string[];
}

export default NetworkModel;
