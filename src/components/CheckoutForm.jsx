import React from "react";
import useCheckout from "../talons/useCheckout";

export const CheckoutForm = ({ fn }) => {
  const {
    register,
    handleSubmit,
    navigate,
    continueAsGuest,
    level,
    setShippingAddress,
    setShippingMethod,
    setBillingAddress,
    setPaymentMethod,
    createOrder,
    email,
    setEmail,
    shippingAddress,
    setShipAddress,
    shippingMethod,
    setShipMethod,
    billingAddress,
    setBillAddress,
  } = useCheckout();

  return (
    <div className="m-4">
      <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
        {email === null ? (
          <form
            onSubmit={handleSubmit(continueAsGuest)}
            className="flex flex-col p-4 gap-5"
          >
            <p className="font-semibold text-lg uppercase">Enter Email</p>
            <input
              type="text"
              {...register("email")}
              className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
              placeholder="Email"
            />
            <div className="flex w-full justify-between gap-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white border-black uppercase  py-2.5 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                Continue as guest
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 bg-black text-white border-black uppercase  py-2.5 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                Create an account
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col p-3 px-4">
            <p className="uppercase text-lg  font-semibold">Email</p>
            <div className="flex items-center justify-between ">
              <span>{email}</span>
              <button
                onClick={() => setEmail(null)}
                className=" bg-black text-white border-black uppercase  py-2 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>
      {level > 0 ? (
        <div>
          <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
            {shippingAddress === null ? (
              <form
                onSubmit={handleSubmit(setShippingAddress)}
                className="flex flex-col p-4 gap-5"
              >
                <p className="font-semibold text-lg uppercase">
                  Shipping Address
                </p>
                <input
                  type="text"
                  {...register("firstname")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  {...register("lastname")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  {...register("address")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Address"
                />
                <select
                  {...register("country")}
                  placeholder="Please select a country"
                  className="p-3 border-2 k fill-none  rounded shadow-sm focus:outline-black"
                >
                  <option value="DE">DE</option>
                  <option value="US">USA</option>
                </select>
                <input
                  type="text"
                  {...register("city")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="city"
                />
                <input
                  type="text"
                  {...register("zipCode")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Zip-Code"
                />
                <input
                  type="text"
                  {...register("phone")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Phone"
                />
                <div>
                  <button
                    type="submit"
                    className="py-2.5 bg-black w-full text-center text-white uppercase rounded shadow-lg hover:text-black hover:bg-white border border-black transition-all duration-300"
                  >
                    Ship here
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col p-3 px-4">
                <p className="uppercase text-lg  font-semibold">
                  shipping address
                </p>
                <div className="flex items-center justify-between ">
                  <span>{shippingAddress}</span>
                  <button
                    onClick={() => setShipAddress(null)}
                    className=" bg-black text-white border-black uppercase  py-2 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
          <div className="p-3">
            <p className="font-semibold text-lg uppercase">Shipping address</p>
          </div>
        </div>
      )}

      {level > 1 ? (
        <div>
          <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
            {shippingMethod === null ? (
              <form className="p-3 ">
                <p className="font-semibold text-lg uppercase">
                  Shipping method
                </p>
                <div className="flex justify-between uppercase p-1 my-1">
                  <span>10 EUR</span>
                  <span>standard</span>
                  <input
                    type="radio"
                    name="shipping-method"
                    value={"fd865444-9ca3-4a3a-b3e4-2eb3ea1bbb4f"}
                    className="scale-150"
                    onClick={(event) => (setShippingMethod(event), fn(true))}
                  />
                </div>
                <hr className="border border-slate-300 px-2 my-1" />
                <div className="flex justify-between uppercase p-1 my-1">
                  <span>30 EUR</span>
                  <span>express</span>
                  <input
                    type="radio"
                    className="scale-150"
                    name="shipping-method"
                    value={"5c807a9e-7046-4a60-b67e-e8e6e94a9253"}
                    onClick={(event) => (setShippingMethod(event), fn(true))}
                  />
                </div>
              </form>
            ) : (
              <div className="flex flex-col p-3 px-4">
                <p className="uppercase text-lg  font-semibold">
                  shipping method
                </p>
                <div className="flex items-center justify-between ">
                  <span>{shippingMethod}</span>
                  <button
                    onClick={() => (setShipMethod(null), fn(false))}
                    className=" bg-black text-white border-black uppercase  py-2 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
          <div className="p-3">
            <p className="font-semibold text-lg uppercase">Shipping method</p>
          </div>
        </div>
      )}

      {level > 2 ? (
        <div>
          <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
            {billingAddress === null ? (
              <form
                onSubmit={handleSubmit(setBillingAddress)}
                className="flex flex-col p-4 gap-5"
              >
                <p className="font-semibold text-lg uppercase">
                  Billing address
                </p>
                <input
                  type="text"
                  {...register("firstname")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  {...register("lastname")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  {...register("address")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Address"
                />
                <select
                  {...register("country")}
                  placeholder="Please select a country"
                  className="p-3 border-2 k fill-none  rounded shadow-sm focus:outline-black"
                >
                  <option value="DE">DE</option>
                  <option value="US">USA</option>
                </select>
                <input
                  type="text"
                  {...register("city")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="city"
                />
                <input
                  type="text"
                  {...register("zipCode")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Zip-Code"
                />
                <input
                  type="text"
                  {...register("phone")}
                  className="p-3 border-2 k  rounded shadow-sm focus:outline-black"
                  placeholder="Phone"
                />
                <div>
                  <button
                    type="submit"
                    className="py-2.5 bg-black w-full text-center text-white uppercase rounded shadow-lg hover:text-black hover:bg-white border border-black transition-all duration-300"
                  >
                    Bill here
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col p-3 px-4">
                <p className="uppercase text-lg  font-semibold">
                  billing address
                </p>
                <div className="flex items-center justify-between ">
                  <span>{billingAddress}</span>
                  <button
                    onClick={() => setBillAddress(null)}
                    className=" bg-black text-white border-black uppercase  py-2 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
          <div className="p-3">
            <p className="font-semibold text-lg uppercase">Billing address</p>
          </div>
        </div>
      )}
      {level > 3 ? (
        <div>
          <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
            <form className="p-3 ">
              <p className="font-semibold text-lg uppercase mb-2">
                payment method
              </p>
              <div className="flex justify-between px-5">
                <span>C.O.D</span>
                <input
                  type="radio"
                  className="scale-150"
                  value={"95af0f4c-8dbe-4dc7-ac9c-99038d1a3e12"}
                  onClick={(event) => setPaymentMethod(event)}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-200 rounded shadow-lg my-3">
          <div className="p-3">
            <p className="font-semibold text-lg uppercase mb-2">
              payment method
            </p>
          </div>
        </div>
      )}
      {level > 4 ? (
        <button
          className="py-2.5 bg-black w-full text-center text-white uppercase rounded shadow-lg hover:text-black hover:bg-white border border-black transition-all duration-300"
          onClick={() => createOrder()}
        >
          place ORder
        </button>
      ) : null}
    </div>
  );
};
