class AppError extends Error {
  public data?: Record<string, any>;
  public statusCode: number;
  public constructor(
    message: string,
    statusCode: number,
    data: Record<string, any> | null = null,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    if (data) {
      this.data = data;
    }
  }
}

export { AppError };
