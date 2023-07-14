import React from "react";
import useCheckout from "../talons/useCheckout";

export const CheckoutForm = () => {
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
  } = useCheckout();

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(continueAsGuest)}
          className="flex flex-col p-4 gap-5"
        >
          <input
            type="text"
            {...register("email")}
            className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
            placeholder="Email"
          />
          <div>
            <button
              type="submit"
              className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
            >
              Continue as guest
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-primary border-primary mt-4 py-3.5 px-4 hover:bg-primary hover:text-white transition-all duration-300 border-2 rounded-lg shadow-md"
            >
              {" "}
              Create an account
            </button>
          </div>
        </form>
      </div>
      {level > 0 ? (
        <div>
          <div>
            <form
              onSubmit={handleSubmit(setShippingAddress)}
              className="flex flex-col p-4 gap-5"
            >
              <input
                type="text"
                {...register("firstname")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="First Name"
              />
              <input
                type="text"
                {...register("lastname")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Last Name"
              />
              <input
                type="text"
                {...register("address")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Address"
              />
              <select
                {...register("country")}
                placeholder="Please select a country"
                className="p-3 border-2 k fill-none  rounded shadow-sm focus:outline-primary"
              >
                <option value="DE">DE</option>
                <option value="US">USA</option>
              </select>
              <input
                type="text"
                {...register("city")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="city"
              />
              <input
                type="text"
                {...register("zipCode")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Zip-Code"
              />
              <input
                type="text"
                {...register("phone")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Phone"
              />
              <div>
                <button type="submit">Ship here</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>hidden block </div>
      )}

      {level > 1 ? (
        <div>
          <div>
            <form>
              <div className="flex">
                <span>10 EUR</span>
                <span>standard</span>
                <input
                  type="radio"
                  name="shipping-method"
                  value={"fd865444-9ca3-4a3a-b3e4-2eb3ea1bbb4f"}
                  onClick={(event) => setShippingMethod(event)}
                />
              </div>
              <div className="flex">
                <span>30 EUR</span>
                <span>express</span>
                <input
                  type="radio"
                  name="shipping-method"
                  value={"5c807a9e-7046-4a60-b67e-e8e6e94a9253"}
                  onClick={(event) => setShippingMethod(event)}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>hidden block 2</div>
      )}

      {level > 2 ? (
        <div>
          <div>
            <form
              onSubmit={handleSubmit(setBillingAddress)}
              className="flex flex-col p-4 gap-5"
            >
              <input
                type="text"
                {...register("firstname")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="First Name"
              />
              <input
                type="text"
                {...register("lastname")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Last Name"
              />
              <input
                type="text"
                {...register("address")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Address"
              />
              <select
                {...register("country")}
                placeholder="Please select a country"
                className="p-3 border-2 k fill-none  rounded shadow-sm focus:outline-primary"
              >
                <option value="DE">DE</option>
                <option value="US">USA</option>
              </select>
              <input
                type="text"
                {...register("city")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="city"
              />
              <input
                type="text"
                {...register("zipCode")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Zip-Code"
              />
              <input
                type="text"
                {...register("phone")}
                className="p-3 border-2 k  rounded shadow-sm focus:outline-primary"
                placeholder="Phone"
              />
              <div>
                <button type="submit">Ship here</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>hidden block 3</div>
      )}
      {level > 3 ? (
        <div>
          <div>
            <form>
              <div className="flex">
                <span>10 EUR</span>
                <span>standard</span>
                <input
                  type="radio"
                  value={"standard"}
                  onChange={(event) => setPaymentMethod(event)}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>hidden block 4</div>
      )}
      {level > 4 ? (
        <button onClick={() => createOrder()}>place ORder</button>
      ) : null}
    </div>
  );
};
