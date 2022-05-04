export class UserLoggedInEvent {
  constructor(
    public readonly email: string,
    public readonly loggedInTime: Date,
  ) {}
}
