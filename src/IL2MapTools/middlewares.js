export function loggerMiddleware({ getState, dispatch }) {
  return function loggerMiddlewareNextWrapper(next) {
    return function loggerMiddlewareActionWrapper(action) {
      console.log("dispatching", action);
      let result = next(action);

      console.log("next state", getState());
      return result;
    }
  }
}
