import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/auth-service";

const PAGE_SSR = "PAGE_SSR";
const PAGE_STATIC = "PAGE_STATIC";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    user: "omariosouto",
    pass: "safepassword",
  });
  const [pageType, setPageType] = React.useState(PAGE_SSR);

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    authService
      .login({
        username: values.user,
        password: values.pass,
      })
      .then(() => {
        if (pageType === PAGE_SSR) {
          router.push("/auth-page-ssr");
          return;
        }
        router.push("/auth-page-static");
      })
      .catch(() => {
        alert("User or pass are invalid!");
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Usuário"
          name="user"
          value={values.user}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="pass"
          type="password"
          value={values.pass}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="page-ssr">
            Page SSR
            <input
              type="radio"
              value={PAGE_SSR}
              name="page-type"
              id="page-ssr"
              checked={pageType === PAGE_SSR}
              onChange={(event) => {
                setPageType(event.target.value);
              }}
            />
          </label>
          <label htmlFor="page-static">
            Page Static
            <input
              type="radio"
              value={PAGE_STATIC}
              name="page-type"
              id="page-static"
              checked={pageType === PAGE_STATIC}
              onChange={(event) => {
                setPageType(event.target.value);
              }}
            />
          </label>
        </div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>
          <button>Entrar</button>
        </div>
      </form>
      <p>
        <a href="/auth-page-ssr">auth-page-ssr</a>
        <br />
        <a href="/auth-page-static">auth-page-static</a>
      </p>
    </div>
  );
}
