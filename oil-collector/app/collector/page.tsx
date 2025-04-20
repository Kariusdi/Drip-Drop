"use client";
import React, { useState } from "react";
import Image from "next/image";
import Arrow from "@/assets/arrow.png";
import { useRouter } from "next/navigation";

const CollectorPage = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [oilVal, setOilVal] = useState<number>(50);
  const router = useRouter();

  const handleFinished = () => {
    router.push("/register");
  };
  return (
    <>
      {!isStart && (
        <>
          <div className="flex flex-col justify-center items-center space-y-28">
            <div className="text-center bg-primary text-white z-20 p-10 rounded-4xl space-y-10">
              <p className="font-bold text-3xl">
                โปรดใส่ "น้ำมันพืช" ที่ช่องใส่ด้านล่าง
              </p>
              <button
                onClick={() => setIsStart(true)}
                className="text-4xl font-semibold bg-secondary px-5 py-3 rounded-full active:bg-secondary-light text-primary"
              >
                กดปุ่มเพื่อเริ่ม
              </button>
            </div>
            <Image
              src={Arrow}
              alt="arrow down"
              width={50}
              height={50}
              quality={100}
              placeholder="empty"
              className="animate-bounce"
              priority
            />
          </div>
        </>
      )}
      {isStart && (
        <section className="">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 rounded-full space-y-10 flex flex-col justify-center items-center">
            <h3
              className={`text-5xl text-primary-light font-medium drop-shadow-2xl`}
            >
              ปริมาณการขาย
            </h3>
            <div className="bg-primary rounded-full h-[350px] w-[350px] flex flex-col justify-center items-center text-secondary-light shadow-md space-y-6">
              <div className="">
                <h1 className="text-9xl font-bold drop-shadow-2xl">
                  {oilVal}
                  <span className="text-3xl font-medium ml-2">มล.</span>
                </h1>
              </div>
              <h3 className="bg-white h-fit w-[250px] py-2 text-primary rounded-full text-4xl font-extrabold">
                ได้ {oilVal / 10} แต้ม
              </h3>
            </div>
          </div>
          {oilVal !== 0 && (
            <>
              <AppWaterWave value={oilVal} />
              <button
                onClick={handleFinished}
                className="absolute bottom-5 right-5 px-10 py-5 rounded-full text-2xl z-10 bg-amber-950 active:bg-amber-700 text-white"
              >
                เสร็จสิ้น
              </button>
              <p className="absolute bottom-5 left-0 px-8 rounded-r-full py-2 text-amber-900 text-lg font-bold bg-orange-50">
                *10 มิลลิลิตร = 1 แต้ม*
              </p>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default CollectorPage;

interface AppWaterWaveProps {
  value: number;
}

const AppWaterWave: React.FC<AppWaterWaveProps> = ({ value }) => {
  return (
    <>
      <div
        className="indicator"
        style={
          {
            "--height": `${value}%`,
            "--offset": "0vh",
          } as React.CSSProperties
        }
      ></div>
    </>
  );
};
