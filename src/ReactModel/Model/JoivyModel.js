/* @flow */
/**
* @module Core/Model
* @version 1.0.0
* @copyright (c) 2016-present Joivy Ltd.
*/

import invariant from 'invariant';
import { Iterable, Map, is } from 'immutable';

/**
 * Convert model data to map.
 * @method
 * @param {Map} data Model data.
 */
const toMap = (data: any): any => {
  if (data instanceof Iterable) return data.map(toMap);
  if (data instanceof Model) return data.toMap();
  return data;
}

/**
 * Joivy base model.
 * @class
 */
class Model<T> {
    data: Map<string, any>;
    /**
     * Default model constructor
     * @constructor
     * @param {T} [init] Class instance initialize data
     */
    constructor(init: T) {
        this.data = Map({
            ...init
        });
    }
    /**
     * Get instance property based on name.
     * @param {string} name Attribute name.
     * @returns {any}
     */
    get(name: string): any {
        const property = this.data.get(name);
        invariant(property !== undefined, `${this.constructor.name} doesn't have ${name} attribute.`);
        return property;
    }
    /**
     * Update model instanceord
     * @param {T} updateDict Update dictionary.
     * @returns {any}
     */
    update(updateDict: T): Model<*> {
        const updatedModel = Object.create(this.constructor.prototype);
        updatedModel.data = this.data.merge(Map(updateDict));
        return updatedModel;
    }
    /**
     * Compare data with another model.
     * @param {Model} model Instance of model.
     * @returns {boolean}
     */
    equals(model: Model): boolean {
        invariant(model instanceof Model, 'Argument must be instance of Joivy$Model');
        return is(this.toMap(), model.toMap());
    }
    /**
     * Create immutable map based on model data.
     * @returns {Map<string, any>} Model data map.
     */
    toMap(): Map<string, any> {
        return toMap(this.data);
    }
}

export default Model;
