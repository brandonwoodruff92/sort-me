class ActionBuffer {
  constructor() {
    this.buffer = [];
  }

  length() {
    return this.buffer.length;
  }

  getAction() {
    return this.buffer.shift();
  }

  pushAction(action) {
    this.buffer.push(action);
  }
}
