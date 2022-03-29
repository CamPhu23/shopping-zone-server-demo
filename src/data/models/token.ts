export interface Token {
  accessToken: BaseToken,
  refreshToken: BaseToken,
  user: {
    id: string,
    username: string,
    email: string,
    permission: string;
  }
}

export interface AccessTokenPayload {
  id: string;
  username: string;
  email?: string;
}

interface BaseToken {
  token: string;
  expiredTime: string;
}