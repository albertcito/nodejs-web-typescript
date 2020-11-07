class HttpStatusError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = 401,
  ) {
    super();
    Object.setPrototypeOf(this, HttpStatusError.prototype);
  }
}

export default HttpStatusError;
