'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _RecordDecorator = require('Decorators/RecordDecorator');

var _RecordDecorator2 = _interopRequireDefault(_RecordDecorator);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toMap(v) {
  if (v instanceof _immutable.Iterable) {
    return v.map(toMap);
  }

  if (v instanceof _RecordDecorator2.default.Base) {
    return v.toMap();
  }

  return v;
}

var NetworkModel = (_dec = (0, _RecordDecorator2.default)(), _dec(_class = function (_Record$Base) {
  _inherits(NetworkModel, _Record$Base);

  function NetworkModel(init) {
    _classCallCheck(this, NetworkModel);

    var _this = _possibleConstructorReturn(this, (NetworkModel.__proto__ || Object.getPrototypeOf(NetworkModel)).call(this));

    if (init) {
      _this.data = (0, _immutable.Map)({
        id: init.id,
        name: init.name,
        disabled: init.disabled
      });
    }

    return _this;
  }

  _createClass(NetworkModel, [{
    key: 'update',
    value: function update(_update) {
      var updated = Object.create(NetworkModel.prototype);
      updated.data = this.data.merge((0, _immutable.Map)(_update));
      return updated;
    }
  }, {
    key: 'toMap',
    value: function (_toMap) {
      function toMap() {
        return _toMap.apply(this, arguments);
      }

      toMap.toString = function () {
        return _toMap.toString();
      };

      return toMap;
    }(function () {
      return toMap(this.data);
    })
  }, {
    key: 'id',
    get: function get() {
      return this.data.get('id');
    }
  }, {
    key: 'name',
    get: function get() {
      return this.data.get('name');
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.data.get('disabled');
    }
  }]);

  return NetworkModel;
}(_RecordDecorator2.default.Base)) || _class);
var _default = NetworkModel;
exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NetworkModel, 'NetworkModel', '/var/www/apollo/src/Types/Network/NetworkModel.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/apollo/src/Types/Network/NetworkModel.js');
})();

;