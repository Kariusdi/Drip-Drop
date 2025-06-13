"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Arrow from "@/assets/arrow.png";
import { useTranslations } from "next-intl";
import realtimeDB from "@/utils/realtimeDB";
import { ref, onValue, update } from "firebase/database";

function mapToRange(
  yo: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 100
) {
  return ((yo - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const CollectorPage = () => {
  const [oilVal, setOilVal] = useState<number>(0);
  const router = useRouter();
  const t = useTranslations("CollectorPage");

  useEffect(() => {
    const oilValRef = ref(realtimeDB, "sensor");
    const unsubscribe = onValue(oilValRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setOilVal(mapToRange(data.oilVal, 784, 5000, 0, 100));
      } else {
        console.log("No data available");
      }
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const socket = new WebSocket(
  //     `ws://${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}:8765`
  //   );

  //   socket.onopen = () => {
  //     console.log("Connected");
  //   };
  //   socket.onclose = () => {
  //     console.log("Disconnected");
  //   };
  //   socket.onmessage = (event) => {
  //     // console.log(event.data);
  //     setOilVal(event.data);
  //   };

  //   return () => {
  //     console.log(`Closing socket connection...`);
  //     socket.close();
  //   };
  // }, []);

  const handleFinished = useCallback(async () => {
    const controlRef = ref(realtimeDB, "control");
    await update(controlRef, {
      start: 0,
      inspect: 1,
    });
    console.log("Set inspect state successfully...");
    router.push("/inspect");
    localStorage.setItem("oilVal", String(oilVal));
  }, [oilVal]);

  return (
    <section>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 rounded-full space-y-10 flex flex-col justify-center items-center">
        <h2 className={`text-h2 text-tertiary font-medium drop-shadow-2xl`}>
          {t("title")}
        </h2>
        <div className="bg-primary rounded-full h-[350px] w-[350px] flex flex-col justify-center items-center text-secondary shadow-2xl space-y-6">
          <div>
            <p className="text-9xl font-bold drop-shadow-2xl">
              {oilVal}
              <span className="text-h3 font-medium ml-2">{t("unit")}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 opacity-80">
          <h2 className="text-h4 text-tertiary">{t("instruction")}</h2>
          <Image
            src={Arrow}
            alt={"arrow"}
            width={40}
            height={40}
            className="animate-bounce"
          />
        </div>
      </div>
      {/* <p className="absolute bottom-5 left-0 px-8 rounded-r-full py-2 text-amber-900 text-h4 font-bold bg-primary-light z-10">
        *10 มิลลิลิตร = 1 แต้ม*
      </p> */}
      {oilVal !== 0 && (
        <>
          <AppWaterWave value={oilVal} />
          <button
            onClick={handleFinished}
            className="absolute bottom-5 right-5 px-10 py-5 rounded-full text-h4 z-10 bg-tertiary active:bg-secondary text-primary-light"
          >
            {t("submit")}
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
            "--height": `${mapToRange(value, 784, 5000, 0, 100)}%`,
            "--offset": "0vh",
          } as React.CSSProperties
        }
      ></div>
    </>
  );
};
