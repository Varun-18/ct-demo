import { useState } from "react";

import useAccordian from "../talons/useAccordion";

const Accordion = ({ details }) => {
  const {
    shippingReturnsOpen,

    toggleProductDetails,

    toggleShippingReturns,

    productDetailsOpen,
  } = useAccordian();

  return (
    <div className="mt-10">
      <button
        className={`flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300 ${
          shippingReturnsOpen ? "bg-gray-200" : ""
        }`}
        onClick={toggleShippingReturns}
      >
        <h3 className="text-lg font-heading font-medium">
          Shipping &amp; returns
        </h3>

        <span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
              fill="black"
            ></path>
          </svg>
        </span>
      </button>

      {shippingReturnsOpen && (
        <div className="pl-6 lg:pl-12 pr-6 py-4 mb-4 bg-gray-100">
          <h2 className="font-bold text-2xl">Shipping Information:</h2>

          <br />

          <ol>
            <li>
              <strong>Delivery Timeframe:</strong>

              <p>We strive to process and ship all orders promptly...</p>
            </li>

            <li>
              <strong>Shipping Methods:</strong>

              <p>
                We partner with reliable shipping carriers to deliver your
                products safely and efficiently...
              </p>
            </li>

            <li>
              <strong>Shipping Charges:</strong>

              <p>
                Shipping charges will be calculated based on the total weight of
                your order, the shipping method selected, and your delivery
                address...
              </p>
            </li>

            <li>
              <strong>Order Tracking:</strong>

              <p>
                Once your order is shipped, we will provide you with a tracking
                number via email or through your account on our website...
              </p>
            </li>
          </ol>

          <br />

          <h2 className="font-bold text-2xl">Return Policy:</h2>

          <br />

          <ol>
            <li>
              <strong>Eligibility:</strong>

              <p>We want you to be satisfied with your purchase...</p>
            </li>

            <li>
              <strong>Return Process:</strong>

              <p>
                If you wish to initiate a return, please contact our customer
                support team...
              </p>
            </li>

            <li>
              <strong>Refund or Exchange:</strong>

              <p>Upon receiving and inspecting the returned item...</p>
            </li>

            <li>
              <strong>Damaged or Defective Products:</strong>

              <p>
                In the unlikely event that your product arrives damaged or
                defective...
              </p>
            </li>
          </ol>
        </div>
      )}

      <button
        className={`flex w-full pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300 ${
          productDetailsOpen ? "bg-gray-200" : ""
        }`}
        onClick={toggleProductDetails}
      >
        <h3 className="text-lg font-heading font-medium">Product details</h3>

        <span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
              fill="black"
            ></path>
          </svg>
        </span>
      </button>

      {productDetailsOpen && (
        <div className="pl-6 lg:pl-12 pr-6 py-4 mb-4 bg-gray-100">
          <div className="mb-5 mt-6 flex items-center pb-5">
            <div className=" text-left text-base text-gray-500 dark:text-gray-400">
              <div className="relative flex flex-wrap max-sm:flex-col gap-3">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex border-b w-[565px] flex-row justify-between bg-white flex-wrap dark:border-gray-700 dark:bg-gray-80 max-sm:w-full max-sm:text-sm "
                  >
                    <div
                      scope="row"
                      className="bg-gray-50 px-6 py-3 text-base uppercase font-bold  text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                    >
                      {detail.name}
                    </div>

                    <div className="px-6 py-4 uppercase">
                      {detail?.value?.key || detail?.value?.en || detail?.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
