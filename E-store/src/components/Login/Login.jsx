import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginedImg from "../../assets/images/cart.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import axios from "axios";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";
import { authContext } from "../../context/authContext";

const loginedSchema = zod.object({
  username: zod
    .string()
    .min(1, "Name is required")
    .min(3, "Min name length is 3")
    .max(30, "Max name length is 30"),

  password: zod.string().min(1, "Password is required"),
  // .regex(
  //   /^(?=.*[a-z])[A-Za-z\d]{4,}$/,
  //   "Minimum Password Length is 8 and must encludes one uppercase letter and one number and no symbols",
  // ),
});

function Login() {
  const navigate = useNavigate();

  const { saveUserTkn } = useContext(authContext);

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginedSchema),
  });

  function onSubmit(data) {
    console.log(data);

    setIsLoading(true);

    axios
      .post("https://fakestoreapi.com/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userTkn", res.data.token);
        saveUserTkn(res.data.token);

        toast.success("Welcome 🎉");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        reset();
      })
      .catch((err) => {
        toast.error(err.response?.data || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <>
      {/* {isSuccess && <p className="text-2xl">{}</p>}
      {errorMsg && <p className="text-2xl">{}</p>} */}

      <section className="register mt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 items-center">
            {/* image placeholder */}
            <div className="col hidden sm:block md:col-span-7">
              <div className="img-wrapper text-center ">
                <img
                  src={loginedImg}
                  className="w-1/2 shadow object-cover rounded-2xl "
                  alt=""
                />
              </div>
            </div>

            <div className="col flex justify-center md:block md:col-span-5">
              <div className="form w-3/4">
                <h2 className="mb-5 font-bold text-2xl exo-font">Login</h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="name-field ">
                    <input
                      className="w-full border-b border-[#989898] border-solid focus:outline-none "
                      type="text"
                      id="username"
                      placeholder="UserName"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="err-msg text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="password-field">
                    <input
                      type="password"
                      id="password"
                      className="w-full border-b border-[#989898] border-solid focus:outline-none"
                      placeholder="Password"
                      {...register("password")}
                    />

                    {errors.password && (
                      <p className="text-red-500">{errors.password?.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 text-white rounded-md cursor-pointer font-medium py-2 px-4 my-2 mt-5 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !(isDirty && isValid)}
                  >
                    {isLoading ? <PulseLoader color="#ffffff" /> : "signIn"}
                  </button>

                  {/* Login Link */}
                  <p className="">
                    Don't have account?{" "}
                    <Link
                      to={"/register"}
                      className="text-blue-500 underline ps-2"
                    >
                      Register Now
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
