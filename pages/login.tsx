import Image from "next/image";
import { signIn } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { useState, useEffect } from "react";

type UserProps = {
  email: string;
  password: string;
};

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

const Login = () => {
  const [userData, setUserData] = useState<UserProps>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className={`min-w-screen min-h-screen flex flex-row bg-secondary-default ${montserrat.className}`}
    >
      <div className="h-screen w-1/2 relative">
        <Image
          src={"/login/ParentKid.png"}
          alt="banner"
          sizes="50vw"
          fill={true}
          priority={true}
        />
      </div>

      <div className="h-screen w-1/2 flex flex-col justify-center items-center">
        <div className="w-[274px] h-28 relative">
          <Image
            src={"/login/Logo.png"}
            alt="logo"
            sizes="100vh"
            fill={true}
            priority={true}
          />
        </div>
        <div className="w-[400px] h-72 mt-9 flex flex-col justify-between">
          {/* username */}
          <div className="w-full h-[232px] flex flex-col justify-between">
            <div className="w-full h-[68px] flex flex-col justify-between">
              <div className="h-4 flex flex-row">
                <span className="text-base font-bold text-dark-gray leading-4">
                  Email
                </span>
                <span className="text-base font-bold text-light-red leading-4">
                  &nbsp;*
                </span>
              </div>
              <div className="w-full h-10 flex flex-row relative">
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 text-dark-gray"
                  name="email"
                  type="text"
                  placeholder="example@domain.com"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* password */}
            <div className="w-full h-[68px] flex flex-col justify-between">
              <div className="h-4 flex flex-row">
                <span className="text-base font-bold text-dark-gray leading-4">
                  Password
                </span>
                <span className="text-base font-bold text-light-red leading-4">
                  &nbsp;*
                </span>
              </div>
              <div className="w-full h-10 flex flex-row relative">
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 text-dark-gray"
                  name="password"
                  type="password"
                  placeholder="Must have at least 6 characters"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              className="w-full h-12 rounded-lg text-secondary-default bg-primary-default font-bold active:scale-95 active:shadow-lg transition-all"
              // onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </button>
          </div>
        </div>

        {/* <button
          className="w-96 h-12 mt-8 rounded-lg text-secondary-default bg-primary-default font-bold active:scale-95 active:shadow-lg transition-all"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
