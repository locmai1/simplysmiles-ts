import Image from "next/image";
import { signIn } from "next-auth/react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

const Login = () => {
  return (
    <div
      className={`min-w-screen min-h-screen flex flex-row bg-secondary-default ${montserrat.className}`}
    >
      <div className="h-screen w-1/2 relative">
        <Image src={"/login/ParentKid.png"} alt="banner" fill={true} />
      </div>

      <div className="h-screen w-1/2 flex flex-col justify-center items-center">
        <div className="w-[300px] h-28 relative">
          <Image src={"/login/Logo.png"} alt="logo" sizes="100vh" fill={true} />
        </div>
        <button
          className="w-[400px] h-[50px] mt-4 rounded-lg text-secondary-default bg-primary-default font-bold"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
