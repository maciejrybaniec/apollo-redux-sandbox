/* @flow */

import { Iterable, List, Map } from 'immutable';

function toMap(v): any {
  if (v instanceof Iterable) {
    return v.map(toMap);
  }

  if (v instanceof Record.Base) {
    return v.toMap();
  }

  return v;
}

class NetworkModel {
  data: Map<string, any>;

  constructor(init: NetworkModelInit) {
    if (init) {
      this.data = Map({
        id: init.id,
        name: init.name,
        disabled: init.disabled,
        users: List(init.users)
      });
    }
  }

  get id(): string {
    return this.data.get('id');
  }

  get name(): string {
    return this.data.get('name');
  }

  get disabled(): bool {
    return this.data.get('disabled');
  }

  get users(): List<string> {
    return this.data.get('users');
  }

  update(update: NetworkModelUpdate): NetworkModel {
    const updated = Object.create(NetworkModel.prototype);
    updated.data = this.data.merge(Map(update));
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type NetworkModelUpdate = {
  id?: string;
  name?: string;
  disabled?: bool;
  users?: string[];
  [key: string]: void;
};
type NetworkModelInit = {
  id: string;
  name: string;
  disabled: bool;
  users: string[];
  [key: string]: void;
};
export default NetworkModel;
