class AuthenticationError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public readonly message: string) {
    super();
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export default AuthenticationError;
