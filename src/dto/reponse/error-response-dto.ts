
export default class ErrorResponse {
  error: string;

  constructor(error?: string) {
    if (error) {
      this.error = error;
    }
  }
}
