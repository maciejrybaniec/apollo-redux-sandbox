/* @flow */

import Record from 'Decorators/RecordDecorator';

@Record()
class NetworkModel {
  id: string;
  name: string;
  disabled: boolean;
}

export default NetworkModel;
