import { tokenService } from "../../services/auth/token-service";

/**
 *
 * @param {String} url
 * @param {RequestInit | undefined} options
 * @returns {{ok: boolean, data: any}}
 */
export async function httpClient(url, options) {
  const response = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : null,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (options.refresh && response.status === 401) {
    const refreshResponse = await httpClient(
      "http://localhost:3000/api/refresh",
      { method: "GET" }
    );

    const newAccessToken = refreshResponse.data.data.access_token;
    const newRefreshToken = refreshResponse.data.data.refresh_token;

    tokenService.save(newAccessToken);

    const retryResponse = await httpClient(url, {
      ...options,
      refresh: false,
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    return retryResponse;
  }

  return {
    data: await response.json(),
    ok: response.ok,
  };
}
