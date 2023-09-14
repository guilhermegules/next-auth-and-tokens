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

    return response.data;
  },
};
