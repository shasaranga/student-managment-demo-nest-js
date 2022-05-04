import { BaseResponse } from './base-response-dto';

export default class LoginResponse extends BaseResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;

  constructor(response?: Partial<LoginResponse>) {
    super();
    Object.assign(this, response);
  }
}
