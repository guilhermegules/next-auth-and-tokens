import { REFRESH_TOKEN } from "../../constants/refresh-token";
import { tokenService } from "../../services/auth/token-service";
import nookies from "nookies";

/**
 *
 * @param {String} url
 * @param {RequestInit | undefined} options
 * @returns {{ok: boolean, data: any}}
 */
export async function httpClient(url, options = undefined) {
  const response = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : null,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (options.refresh && response.status === 401) {
    const isServer = !!options.ctx;
    const refreshToken = options.ctx?.req?.cookies[REFRESH_TOKEN];

    const refreshResponse = await httpClient(
      "http://localhost:3000/api/refresh",
      {
        method: isServer ? "PUT" : "GET",
        body: isServer ? { refresh_token: refreshToken } : undefined,
      }
    );

    try {
      const newAccessToken = refreshResponse.data.data?.access_token;
      const newRefreshToken = refreshResponse.data.data?.refresh_token;

      if (!newAccessToken) {
        throw new Error("Unauthorized");
      }

      if (isServer) {
        nookies.set(options.ctx, REFRESH_TOKEN, newRefreshToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });
      }

      tokenService.save(newAccessToken);

      const retryResponse = await httpClient(url, {
        ...options,
        refresh: false,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      return retryResponse;
    } catch (error) {
      console.error(error);
      return response;
    }
  }

  return {
    data: await response.json(),
    ok: response.ok,
  };
}
