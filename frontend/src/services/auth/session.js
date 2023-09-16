const { authService } = require("./auth-service");

export const withSession = (contextFn) => {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const sessionContext = {
        ...ctx,
        req: { ...ctx.req, session },
      };
      return contextFn(sessionContext);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=unauthorized",
        },
      };
    }
  };
};
