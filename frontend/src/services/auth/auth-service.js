import { httpClient } from "../../infra/http/http-client";

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

    return response.data;
  },
};
