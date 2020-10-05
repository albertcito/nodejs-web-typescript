class MessageError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public readonly message: string) {
    super();
    Object.setPrototypeOf(this, MessageError.prototype);
  }
}

export default MessageError;
