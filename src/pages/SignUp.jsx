import { useForm } from "react-hook-form";
import useSignup from "../talons/useSignup";
import { NavLink as Link } from "react-router-dom";

export const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { check, getOtp, verifyOtp, googleSignup ,githubSignup} = useSignup();

  return (
    <div className="max-w-[700px] mx-auto my-2">
      <div className="p-3 shadow-md border-2 m-5">
        <form
          onSubmit={handleSubmit(getOtp)}
          className="flex flex-col p-4 gap-5"
        >
          <div className="flex justify-between">
            <h4 className="text-xl uppercase font-semibold">Sign-up </h4>
          </div>

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

          <button
            type="submit"
            className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
          >
            GET OTP
          </button>
        </form>

        {check ? (
          <div>
            <form
              onSubmit={handleSubmit(verifyOtp)}
              className="flex flex-col p-4 gap-5"
            >
              <div className="flex justify-between">
                <h4 className="text-xl uppercase font-semibold">Verify oTP </h4>
              </div>

              <input
                type="text"
                {...register("otp")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="OTP"
              />

              <button
                type="submit"
                className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                VERIFY OTP
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
            onClick={() => googleSignup()}
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
            className="outline-primary  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-primary flex items-center w-full mt-4 justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md"
            onClick={githubSignup}
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg"
              alt="github"
            />

            <p className="text-base   font-medium ml-4 ">Github</p>
          </button>
        </div>
        <div className="p-4 text-center text-lg">
          <Link to={"/login"}>Already have an account ? login</Link>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};
