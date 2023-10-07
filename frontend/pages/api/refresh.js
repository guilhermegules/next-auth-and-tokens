import nookies from "nookies";

const REFRESH_TOKEN = "REFRESH_TOKEN";

const controller = {
  async storeRefreshToken(req, res) {
    console.log(req.body);
    const ctx = { req, res };
    nookies.set(ctx, REFRESH_TOKEN, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({ data: { message: "Stored with success" } });
  },
  async displayCookies(req, res) {
    const ctx = { req, res };
    res.json({ data: { cookies: nookies.get(ctx) } });
  },
};

const controllerBy = {
  POST: controller.storeRefreshToken,
  GET: controller.displayCookies,
};

export default function handler(request, response) {
  if (controllerBy[request.method]) {
    return controllerBy[request.method](request, response);
  }

  response.status(404).json({ status: 404, message: "Not Found" });
}
