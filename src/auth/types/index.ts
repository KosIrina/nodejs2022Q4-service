export type JwtPayload = {
  login: string;
  userId: string;
};

export type JwtPayloadWithRefresh = JwtPayload & { refreshToken: string };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
