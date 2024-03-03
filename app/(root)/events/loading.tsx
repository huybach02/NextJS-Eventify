import React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5">
      <span className="animate-spin">
        <AiOutlineLoading3Quarters size={30} />
      </span>
      Loading...
    </div>
  );
};

export default loading;
