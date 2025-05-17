"use client";
import { useEffect, useState } from "react";
import AppBackArrow from "../_components/AppBackArrow";

const CreditsPage = () => {
  // const [points, setPoints] = useState<number>(0);

  // useEffect(() => {
  //   const storedPoints = localStorage.getItem("userPoints");
  //   if (storedPoints) {
  //     setPoints(Number(storedPoints));
  //   }
  // }, []);

  return (
    <>
      <AppBackArrow />
      <section className="flex flex-col items-center justify-center h-full w-full space-y-10 p-10">
        <h1 className="text-h1 font-bold">คะแนนสะสมของคุณ</h1>
        <div className="bg-primary rounded-full p-20 text-center text-secondary shadow-2xl">
          <p className="text-9xl font-bold drop-shadow-2xl">10</p>
          <p className="text-h1 font-medium ml-2">คะแนน</p>
        </div>
      </section>
    </>
  );
};

export default CreditsPage;
