class MessageError extends Error {
  constructor(public readonly message: string) {
    super();
    Object.setPrototypeOf(this, MessageError.prototype);
  }
}

export default MessageError;
