import axios from "axios";
import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import swal from "sweetalert";

export async function getServerSideProps(context: NextPageContext) {
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
}

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const trimmedName = name.trimEnd();
  const trimmedEmail = email.trimEnd();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    if (password.length < 8) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Password must be at least 8 characters long.",
      });
      setPassword("");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Login failed. Please check your email and password.",
      });
      setEmail("");
      setPassword("");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    if (password.length < 8) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Password must be at least 8 characters long.",
      });
      setPassword("");
      return;
    }

    try {
      await axios.post("/api/register", {
        email: trimmedEmail,
        name: trimmedName,
        password,
      });

      login();
    } catch (error) {
      console.log("Registration error:", error);
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 422 && data.error === "Email taken") {
          swal({
            title: "Warning!",
            icon: "warning",
            text: "Registration failed. Email is already in use.",
          });
        } else if (status === 422 && data.error === "Firefighter not found") {
          swal({
            title: "Warning!",
            icon: "warning",
            text: "Registration failed. Your username is not in the database.",
          });
        } else if (status === 422 && data.error === "Username taken") {
          swal({
            title: "Warning!",
            icon: "warning",
            text: "Registration failed. Username is already in use.",
          });
        } else {
          swal({
            title: "Warning!",
            icon: "warning",
            text: `Registration failed. ${data.error || "Unknown error."}`,
          });
        }
      } else {
        swal({
          title: "Warning!",
          icon: "warning",
          text: "Registration failed. Please try again.",
        });
      }
    }
  }, [password, login, trimmedEmail, trimmedName]);

  return (
    <div className="relative w-full">
      <div className="w-full">
        <nav className="px-12 py-5">
          <Image src="/images/fire.webp" alt="Logo" width={200} height={100} />
        </nav>
        <div className="flex justify-center mt-10">
          <div className="lg:bg-zinc-700 lg:bg-opacity-70 md:bg-zinc-700 md:bg-opacity-70 px-16 py-16 self-center mt-2 mb-10 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 text-center font-semibold">
              {variant === "login" ? "Zaloguj się" : "Zarejestruj się"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  name="username"
                  onChange={(event: any) => setName(event.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                name="email"
                onChange={(event: any) => setEmail(event.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Hasło"
                name="password"
                onChange={(event: any) => setPassword(event.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-orange-600 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-700 transition"
            >
              {variant === "login" ? "Zaloguj się" : "Zarejestruj się"}
            </button>
            <p className="text-neutral-400 mt-8">
              {variant === "login"
                ? "Nie masz konta?"
                : "Masz konto?"}{" "}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Załóż konto" : "Zaloguj się"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
