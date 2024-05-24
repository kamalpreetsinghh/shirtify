import { SignIn } from "@clerk/nextjs";

const SignInPage = ({
  searchParams: { redirectTo },
}: {
  searchParams: { redirectTo?: string };
}) => {
  return <SignIn fallbackRedirectUrl={redirectTo || "/"} />;
};

export default SignInPage;
