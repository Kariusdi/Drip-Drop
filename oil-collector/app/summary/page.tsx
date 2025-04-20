"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SummaryPage = () => {
  const router = useRouter();

  const handleFinished = () => {
    router.push("/done");
  };
  return (
    <section className="bg-white w-3/4 h-3/4 rounded-2xl shadow-md shadow-secondary-light flex flex-col justify-around items-center">
      <div className="w-1/2 space-y-2">
        <h1 className="text-5xl font-bold">สรุปรายการ</h1>
        <hr />
      </div>
      <div className="w-full h-[50%] flex flex-col justify-between items-center">
        <div className="w-full">
          <div className="w-full flex justify-between items-center p-10 text-3xl">
            <p>น้ำมันที่ขายได้</p>
            <p>56 มล.</p>
          </div>
          <div className="w-full flex justify-between items-center p-10 text-3xl">
            <p>แต้มที่ได้</p>
            <p>5.6 แต้ม</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-end p-10 text-3xl bg-secondary text-white">
          <p>แต้มสะสมปัจจุบัน</p>
          <p>
            <span className="font-extrabold text-6xl">90</span> แต้ม
          </p>
        </div>
      </div>
      <button
        onClick={handleFinished}
        className="self-end  mr-10 px-10 py-5 rounded-full text-2xl z-10 bg-primary active:bg-primary-light text-white"
      >
        เสร็จสิ้น
      </button>
    </section>
  );
};

export default SummaryPage;
