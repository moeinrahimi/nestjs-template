'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
const _core = require('@nestjs/core');
const _appmodule = require('./app.module');
const _node = /*#__PURE__*/ _interop_require_wildcard(require('@sentry/node'));
const _responseinterceptor = require('./utils/interceptor/response.interceptor');
const _config = require('@nestjs/config');
const _platformfastify = require('@nestjs/platform-fastify');
const _common = require('@nestjs/common');
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
async function bootstrap() {
  const app = await _core.NestFactory.create(
    _appmodule.AppModule,
    new _platformfastify.FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  const configService = app.get(_config.ConfigService);
  _node.init({
    dsn: configService.get('SENTRY_DNS'),
  });
  app.useGlobalPipes(new _common.ValidationPipe());
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new _responseinterceptor.ResponseInterceptor());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
