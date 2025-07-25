export default class AsyncHandler {
  constructor(fn) {
    this.fn = fn;
  }

  handle() {
    return (req, res, next) => {
      this.fn(req, res, next).catch(next);
    };
  }
}
