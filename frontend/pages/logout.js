import { useRouter } from "next/router";
import { tokenService } from "../src/services/auth/token-service";
import React from "react";
import { httpClient } from "../src/infra/http/http-client";

export default function LogoutPage() {
  const router = useRouter();
  React.useEffect(async () => {
    await httpClient("/api/refresh", { method: "DELETE" });
    tokenService.delete();
    router.push("/");
  }, []);

  return <div>Você será redirecionado em instantes...</div>;
}
