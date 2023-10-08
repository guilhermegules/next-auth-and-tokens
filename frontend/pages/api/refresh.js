import nookies from "nookies";
import { httpClient } from "../../src/infra/http/http-client";
import { tokenService } from "../../src/services/auth/token-service";

const REFRESH_TOKEN = "REFRESH_TOKEN";

const controller = {
  async storeRefreshToken(req, res) {
    console.log(req.body);
    const ctx = { req, res };
    nookies.set(ctx, REFRESH_TOKEN, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    res.json({ data: { message: "Stored with success" } });
  },
  async displayCookies(req, res) {
    const ctx = { req, res };
    res.json({ data: { cookies: nookies.get(ctx) } });
  },
  async regenerateTokens(req, res) {
    const ctx = { req, res };
    const cookies = nookies.get(ctx);
    const refreshToken = cookies[REFRESH_TOKEN];

    const refreshResponse = await httpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/refresh`,
      {
        method: "POST",
        body: {
          refresh_token: refreshToken,
        },
      }
    );

    if (!refreshResponse.ok) {
      res.json({ status: 401, message: "Unauthorized" });
      return;
    }

    const refreshTokenFromApi = refreshResponse.data.data.refresh_token;

    nookies.set(ctx, REFRESH_TOKEN, refreshTokenFromApi, {
      httpOnly: true,
      sameSite: "lax",
    });

    tokenService.save(refreshTokenFromApi, ctx);

    res.json({ data: refreshResponse.data.data });
  },
};

const controllerBy = {
  POST: controller.storeRefreshToken,
  GET: controller.regenerateTokens,
};

export default function handler(request, response) {
  if (controllerBy[request.method]) {
    return controllerBy[request.method](request, response);
  }

  response.status(404).json({ status: 404, message: "Not Found" });
}
