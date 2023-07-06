import React from "react";
import { useForm } from "react-hook-form";
import useLogin from "../talons/useLogin";
import { NavLink as Link } from "react-router-dom";
import { from } from "@apollo/client";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loginType, setLoginType, onSubmit, otp, submitOTP } = useLogin();

  return (
    <div className="max-w-[700px] mx-auto my-2">
      <div className="p-3 shadow-md border-2 m-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-4 gap-5"
        >
          <div className="flex justify-between">
            <h4 className="text-xl uppercase font-semibold">Login </h4>
            <div className="flex gap-3">
              <span onClick={() => setLoginType(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="30px"
                  height="30px"
                  className="transition-all duration-150"
                  style={{ fill: !loginType ? "black" : "#00b39e" }}
                >
                  <path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 18.005859 12.033203 C 18.633859 12.060203 19.210594 12.414031 19.558594 12.957031 C 19.954594 13.575031 20.569141 14.534156 21.369141 15.785156 C 22.099141 16.926156 22.150047 18.399844 21.498047 19.589844 L 20.033203 21.673828 C 19.637203 22.237828 19.558219 22.959703 19.824219 23.595703 C 20.238219 24.585703 21.040797 26.107203 22.466797 27.533203 C 23.892797 28.959203 25.414297 29.761781 26.404297 30.175781 C 27.040297 30.441781 27.762172 30.362797 28.326172 29.966797 L 30.410156 28.501953 C 31.600156 27.849953 33.073844 27.901859 34.214844 28.630859 C 35.465844 29.430859 36.424969 30.045406 37.042969 30.441406 C 37.585969 30.789406 37.939797 31.366141 37.966797 31.994141 C 38.120797 35.558141 35.359641 37.001953 34.556641 37.001953 C 34.000641 37.001953 27.316344 37.761656 19.777344 30.222656 C 12.238344 22.683656 12.998047 15.999359 12.998047 15.443359 C 12.998047 14.640359 14.441859 11.879203 18.005859 12.033203 z" />
                </svg>
              </span>
              <span onClick={() => setLoginType(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="30px"
                  height="30px"
                  style={{ fill: loginType ? "black" : "#00b39e" }}
                >
                  <path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 13 16 L 37 16 C 37.18 16 37.349766 16.020312 37.509766 16.070312 L 27.679688 25.890625 C 26.199688 27.370625 23.790547 27.370625 22.310547 25.890625 L 12.490234 16.070312 C 12.650234 16.020312 12.82 16 13 16 z M 11.070312 17.490234 L 18.589844 25 L 11.070312 32.509766 C 11.020312 32.349766 11 32.18 11 32 L 11 18 C 11 17.82 11.020312 17.650234 11.070312 17.490234 z M 38.929688 17.490234 C 38.979688 17.650234 39 17.82 39 18 L 39 32 C 39 32.18 38.979687 32.349766 38.929688 32.509766 L 31.400391 25 L 38.929688 17.490234 z M 20 26.410156 L 20.890625 27.310547 C 22.020625 28.440547 23.510234 29 24.990234 29 C 26.480234 29 27.959844 28.440547 29.089844 27.310547 L 29.990234 26.410156 L 37.509766 33.929688 C 37.349766 33.979688 37.18 34 37 34 L 13 34 C 12.82 34 12.650234 33.979687 12.490234 33.929688 L 20 26.410156 z" />
                </svg>
              </span>
            </div>
          </div>
          {loginType ? (
            <div>
              <div className="flex">
                <select
                  name="countryCode"
                  id="countryCode"
                  className="p-3 border-2 rounded shadow-sm "
                  {...register("countryCode")}
                >
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  {...register("phone")}
                  className="p-3 border-2 rounded shadow-sm w-full focus:outline-primary"
                  placeholder="Phone"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <input
                type="text"
                {...register("email")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Email"
              />
              <input
                type="text"
                {...register("password")}
                className="p-3 border-2 rounded shadow-sm focus:outline-primary"
                placeholder="Password"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
          >
            LOGIN
          </button>
        </form>
        {otp ? (
          <div>
            <form onSubmit={handleSubmit(submitOTP)} className="flex flex-col p-4 gap-5">
              <input
                type="text"
                {...register("otp")}
                className="p-3 border-2 rounded shadow-sm focus:outline-primary"
                placeholder="otp"
              />

              <button
                type="submit"
                className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                confirm otp
              </button>
            </form>
          </div>
        ) : null}
        <div className="flex gap-5 items-center mx-8 mt-4">
          <hr className="border-1 flex-1" />
          <span className="uppercase">or</span>
          <hr className="border-1 flex-1" />
        </div>
        <div className="p-4   sm:flex-row flex flex-col  gap-5 justify-center items-center">
          <button
            aria-label="Continue with google"
            role="button"
            className="border-primary focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg  flex items-center w-full mt-4 justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md"
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
              alt="google"
            />

            <p className="text-base  font-medium ml-4 ">Google</p>
          </button>

          <button
            aria-label="Continue with github"
            role="button"
            className="outline-primary focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-primary flex items-center w-full mt-4 justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md"
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg"
              alt="github"
            />

            <p className="text-base   font-medium ml-4 ">Github</p>
          </button>
        </div>
        <div className="p-4 text-center text-lg">
          <Link to={"/signup"}>Dont have an account ? signup</Link>
        </div>
      </div>
      <div id="recaptcha-container" />
    </div>
  );
};
