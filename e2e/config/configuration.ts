import * as dotenv from 'dotenv';

dotenv.config({ override: true });

export class Configuration {
  public static get user(): string {
    return process.env.USER ?? '[NOT SET]';
  }
  public static get email(): string {
    return process.env.USER_EMAIL ?? '[NOT SET]';
  }
  public static get password(): string {
    return process.env.USER_PASSWORD ?? '[NOT SET]';
  }
  public static get userAPI(): string {
    return process.env.USER_API ?? '[NOT SET]';
  }
  public static get emailAPI(): string {
    return process.env.USER_API_EMAIL ?? '[NOT SET]';
  }
}
