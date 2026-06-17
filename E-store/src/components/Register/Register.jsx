import { useForm } from "react-hook-form";
import registerImg from "../../assets/images/cart.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";

const registseredSchema = zod.object({
  name: zod
    .string()
    .min(1, "Name is required")
    .min(3, "Min name length is 3")
    .max(30, "Max name length is 30"),

  email: zod
    .string()
    .min(1, "Email is required!")
    .regex(
      /[a-z0-9.]+@(gmail|yahoo)\.com\b/,
      "Invalid email for Ex:test@gmail.com",
    ),

  password: zod
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimum Password Length is 8 and must encludes one uppercase letter and one number and no symbols",
    ),

  avatar: zod.string().url("Invalid url").min(1, "Image is required"),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registseredSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // { email: "...", password: "..." }

    navigate("/login");
    // axios.get('').then(res)=>{
    //   console.log('Server Response:',res.data);

    // }.catch(x)=>{
    //   console.log('ERROR:',rex.error);

    // }
  };
  return (
    <>
      <section className="register mt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 items-center">
            {/* image placeholder */}
            <div className="col hidden sm:block md:col-span-7">
              <div className="img-wrapper text-center ">
                <img
                  src={registerImg}
                  className="w-1/2 shadow object-cover rounded-2xl "
                  alt=""
                />
              </div>
            </div>

            <div className="col flex justify-center md:block md:col-span-5">
              <div className="form w-3/4">
                <h2 className="mb-5 font-bold text-2xl exo-font">Register</h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="name-field ">
                    <input
                      className="w-full border-b border-[#989898] border-solid focus:outline-none "
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...register("name")}
                      // {...register("name", {
                      //   required: {
                      //     value: true,
                      //     message: "Name is required",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message: "Min name length is 3",
                      //   },
                      //   maxLength: {
                      //     value: 30,
                      //     message: "Max name length is 30",
                      //   },
                      // })}
                    />
                    {errors.name && (
                      <p className="err-msg text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="email-field">
                    <input
                      type="email"
                      id="email"
                      className="w-full border-b border-[#989898] border-solid focus:outline-none"
                      placeholder="Email"
                      {...register("email")}
                      // {...register("email", {
                      //   required: {
                      //     value: true,
                      //     message: "Email is required!",
                      //   },
                      //   pattern: {
                      //     value: /[a-z0-9.]+@(gmail|yahoo)\.com\b/,
                      //     message: "Invalid email for Ex:test@gmail.com",
                      //   },
                      // })}
                    />

                    {errors.email && (
                      <p className="text-red-500">{errors.email?.message}</p>
                    )}
                  </div>

                  <div className="password-field">
                    <input
                      type="password"
                      id="password"
                      className="w-full border-b border-[#989898] border-solid focus:outline-none"
                      placeholder="********"
                      {...register("password")}
                      // {...register("password", {
                      //   required: {
                      //     value: true,
                      //     message: "Password is required",
                      //   },
                      //   pattern: {
                      //     value:
                      //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      //     message:
                      //       "Minimum Password Length is 8 and must encludes one uppercase letter and one number and no symbols",
                      //   },
                      // })}
                    />

                    {errors.password && (
                      <p className="text-red-500">{errors.password?.message}</p>
                    )}
                  </div>

                  <div className="img-field">
                    <input
                      type="url"
                      id="avatar"
                      placeholder="Image url"
                      className="w-full border-b border-[#989898] border-solid focus:outline-none"
                      {...register("avatar")}

                      // {...register("avatar", {
                      //   required: {
                      //     value: true,
                      //     message: "Image is required",
                      //   },
                      // })}
                    />

                    {errors.avatar && (
                      <p className="text-red-500">{errors.avatar?.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 text-white rounded-md cursor-pointer font-medium py-2 px-4 my-2 mt-5 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!(isDirty && isValid)}
                  >
                    SignUp
                  </button>

                  {/* Login Link */}
                  <p className="">
                    Already have account?{" "}
                    <Link
                      to={"/login"}
                      className="text-blue-500 underline ps-2"
                    >
                      LogIn
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
