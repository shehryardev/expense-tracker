import React from "react";
import { formatIsoDate } from "../../utils/formatDate";

const Transaction = (props) => {
  return (
    <div className="flex items-center justify-between bg-[#ffffff] p-3 rounded-2xl my-3 ">
      <div className="flex items-center space-x-3">
        <div
          className="text-xl py-2 px-3 rounded-full"
          style={{
            backgroundColor: props?.category?.bgColor,
          }}
        >
          <i className={`${props?.category?.icon} `}></i>
        </div>

        <div className="">
          <p className="text-sm font-semibold">{props?.description}</p>
          <div className="text-xs text-[#828282]">
            {formatIsoDate(props?.createdAt)}
          </div>
        </div>
      </div>
      <div className="font-semibold">-{props?.amount} PKR</div>
    </div>
  );
};

export default Transaction;
