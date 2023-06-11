import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";

type UserRegisterProps = {
  name: string;
  email: string;
  password: string;
};

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

const Register = () => {
  const [userData, setUserData] = useState<UserRegisterProps>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    if (res.status === 400) {
      setError(true);
    } else if (res.status === 200) {
      setError(false);
      router.push("/login");
    }
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
          // priority={true}
          placeholder="blur"
          blurDataURL={"/login/ParentKid.png"}
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
        <form
          className="w-[400px] h-[380px] mt-9 flex flex-col justify-between"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2">
              <Image
                src="/manage/warning.svg"
                width={16}
                height={16}
                alt="warning"
                priority={true}
              />
              <span className="text-dark-red font-semibold text-xs">
                There is an existing user under that email
              </span>
            </div>
          )}
          {/* username */}
          <div className="w-full h-[324px] flex flex-col justify-between">
            <div className="w-full h-[68px] flex flex-col justify-between">
              <div className="h-4 flex flex-row">
                <span className="text-base font-bold text-dark-gray leading-4">
                  Name
                </span>
                <span className="text-base font-bold text-light-red leading-4">
                  &nbsp;*
                </span>
              </div>
              <div className="w-full h-10 flex flex-row relative">
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 text-dark-gray"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
              type="submit"
              // onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Register
            </button>
          </div>
        </form>

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

export default Register;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
