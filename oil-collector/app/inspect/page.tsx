"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import realtimeDB from "@/utils/realtimeDB";
import { ref, onValue, set, update } from "firebase/database";

const InspectPage = () => {
  const router = useRouter();
  const [isInit, setIsInit] = useState<boolean>(true);
  const t = useTranslations("InspectPage");

  useEffect(() => {
    const setInspect = async () => {
      const controlRef = ref(realtimeDB, "control");
      await update(controlRef, {
        inspect: 0,
      });
    };
    const approvedRef = ref(realtimeDB, "approved");
    const unsubscribe = onValue(approvedRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (isInit) {
          setIsInit(false);
        } else {
          if (data === 1) {
            setInspect();
            router.push("/summary?status=approved");
          } else if (data === 0) {
            setInspect();
            router.push("/summary?status=denied");
          }
        }
      } else {
        console.log("No data available");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isInit]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/summary?status=denied");
  //   }, 5000);
  // });

  return (
    <section className="space-y-5 w-full h-full flex flex-col justify-center items-center">
      <div className="loader drop-shadow-lg drop-shadow-primary"></div>
      <h1 className="text-h1 font-bold">{t("title")}</h1>
      <h2 className="text-h2">{t("wait")}</h2>
    </section>
  );
};

export default InspectPage;
