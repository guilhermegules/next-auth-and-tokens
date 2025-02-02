import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(ctx = null, accessToken) {
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    const responseValue =
      cookies[ACCESS_TOKEN_KEY] ||
      globalThis?.sessionStorage?.getItem(ACCESS_TOKEN_KEY) ||
      "";
    return responseValue;
  },
  delete(ctx) {
    globalThis?.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
