import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/auth-service";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    user: "omariosouto",
    pass: "safepassword",
  });

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
        router.push("/auth-page-ssr");
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
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
