'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'AllExceptionsFilter', {
  enumerable: true,
  get: function () {
    return AllExceptionsFilter;
  },
});
const _common = require('@nestjs/common');
const _core = require('@nestjs/core');
const _node = /*#__PURE__*/ _interop_require_wildcard(require('@sentry/node'));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {
      default: obj,
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {
    __proto__: null,
  };
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r =
      c < 3
        ? target
        : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i]))
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
    return Reflect.metadata(k, v);
}
let AllExceptionsFilter = class AllExceptionsFilter {
  catch(exception, host) {
    console.log(
      '🚀 ~ file: allExceptionFilter.ts:16 ~ AllExceptionsFilter ~ exception:',
      exception,
    );
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof _common.HttpException
        ? exception.getStatus()
        : _common.HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      status: 'failed',
      code: httpStatus,
      message: 'Internal Server Error',
    };
    const mode = process.env.ENVIRONMENT;
    if (exception instanceof Error && mode === 'develop') {
      console.log('general ts exception');
      responseBody.message = exception.message;
    }
    if (exception instanceof _common.HttpException) {
      console.log('http exception');
      //@ts-ignore
      responseBody.message = exception.getResponse().valueOf().message;
      console.log(
        '🚀 ~ file: allExceptionFilter.ts:39 ~ AllExceptionsFilter ~ exception:',
        exception.getResponse(),
      );
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    _node.captureException(exception);
    // console.log(exception, 'exception');
  }
  constructor(httpAdapterHost) {
    this.httpAdapterHost = httpAdapterHost;
  }
}; // status: 'success',
// data: item.data,
// code: rsp.statusCode,
// message: item.message,
AllExceptionsFilter = _ts_decorate(
  [
    (0, _common.Catch)(),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [
      typeof _core.HttpAdapterHost === 'undefined'
        ? Object
        : _core.HttpAdapterHost,
    ]),
  ],
  AllExceptionsFilter,
);
