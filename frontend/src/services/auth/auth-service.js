import { httpClient } from "../../infra/http/http-client";
import { tokenService } from "./token-service";

export const authService = {
  async login(body) {
    const response = await httpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
      {
        method: "POST",
        body,
      }
    );

    if (!response.ok) throw new Error("Unknown error!");

    tokenService.save(null, response.data.data.access_token);

    const { data } = response.data;

    const refreshResponse = await httpClient("/api/refresh", {
      method: "POST",
      body: {
        refresh_token: data.refresh_token,
      },
    });

    console.log(refreshResponse);

    return response.data;
  },
  async getSession(ctx) {
    const token = tokenService.get(ctx);

    const response = await httpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/session`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        refresh: true,
      }
    );

    if (!response.ok) throw new Error("Unauthorized");

    return response.data.data;
  },
};
