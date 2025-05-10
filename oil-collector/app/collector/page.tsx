"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const CollectorPage = () => {
  const [oilVal, setOilVal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = () => {
      console.log("Connected");
    };
    socket.onclose = () => {
      console.log("Disconnected");
    };
    socket.onmessage = (event) => {
      // console.log(event.data);
      setOilVal(event.data);
    };

    return () => {
      console.log(`Closing socket connection...`);
      socket.close();
    };
  }, []);

  const handleFinished = useCallback(() => {
    router.push("/register");
    localStorage.setItem("oilVal", String(oilVal));
    localStorage.setItem("points", String(oilVal / 10));
  }, [oilVal]);

  return (
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
      <p className="absolute bottom-5 left-0 px-8 rounded-r-full py-2 text-amber-900 text-lg font-bold bg-orange-50 z-10">
        *10 มิลลิลิตร = 1 แต้ม*
      </p>
      {oilVal !== 0 && (
        <>
          <AppWaterWave value={oilVal} />
          <button
            onClick={handleFinished}
            className="absolute bottom-5 right-5 px-10 py-5 rounded-full text-2xl z-10 bg-primary active:bg-primary-light text-white"
          >
            เสร็จสิ้น
          </button>
        </>
      )}
    </section>
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
