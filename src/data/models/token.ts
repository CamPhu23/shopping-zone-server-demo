export interface Token {
  accessToken: BaseToken,
  refreshToken: BaseToken,
  user: {
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