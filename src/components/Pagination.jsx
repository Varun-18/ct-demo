// Third -party dependencies

import { Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useSearchParams } from "react-router-dom";

/**
 * Custom made component for pagination
 * @param {number} active shows the page that is currently active
 * @param {function} next  fucntion that navigates to the next page
 * @param {fucntion} prev fucntion that navigates to the previous page
 * @returns
 */

export const Pagination = ({ next, prev }) => {
  const [params, setParasm] = useSearchParams();
  const active = params.get("pageNo");
  return (
    <div>
      <div className="flex items-center gap-8">
        <button onClick={prev}>
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </button>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
          <strong className="text-blue-gray-900">10</strong>
        </Typography>
        <button onClick={next}>
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
