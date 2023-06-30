import React from "react";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";

export const Pagination = ({ active, next, prev }) => {
  console.log(active);
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
