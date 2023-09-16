import { useRouter } from "next/router";
import { useSession } from "../hooks/use-session";

export function withSessionHOC(Component) {
  return (props) => {
    const { loading, error, data } = useSession();
    const router = useRouter();

    if (!!error && loading) {
      router.push("/?error=unauthorized");
    }

    const sessionProps = {
      ...props,
      session: data,
    };

    return <Component props={sessionProps} />;
  };
}
