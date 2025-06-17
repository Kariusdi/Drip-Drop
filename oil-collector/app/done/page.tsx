"use client";
import realtimeDB from "@/utils/realtimeDB";
import { ref, set, update } from "firebase/database";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DonePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reward = searchParams.get("reward");

  const [cash, setCash] = useState<number>(0);
  const [userCredits, setUserPoints] = useState<number>(0);

  const t = useTranslations("DonePage");

  useEffect(() => {
    const cash = Number(localStorage.getItem("cash") || 0);
    setCash(cash);

    const userCredits = Number(localStorage.getItem("userCredits") || 0);
    setUserPoints(userCredits);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      const approvedRef = ref(realtimeDB, "approved");
      await set(approvedRef, 2);
      const sensorRef = ref(realtimeDB, "sensor");
      await update(sensorRef, {
        oilVal: 0,
      });
      localStorage.removeItem("oilVal");
      localStorage.removeItem("cash");
      localStorage.removeItem("userCredits");
      localStorage.removeItem("phone");
      router.push("/");
    }, 3500);
  }, []);

  return (
    <>
      {status === "approved" ? (
        reward === "credit" ? (
          <RewardDisplay amount={userCredits} label={t("creditUnit")} />
        ) : (
          <RewardDisplay amount={cash} label={t("cashUnit")} />
        )
      ) : (
        <section className="text-h1 font-bold space-y-10">
          <h1>🙏🏻</h1>
          <h2>{t("thanks")}</h2>
        </section>
      )}
    </>
  );
};

export default DonePage;

const RewardDisplay = ({
  amount,
  label,
}: {
  amount: number;
  label: string;
}) => {
  const t = useTranslations("DonePage");
  return (
    <section className="space-y-10">
      <div className="bg-white rounded-xl p-10 text-center font-bold">
        <h1 className="text-h1">🎊</h1>
        <h1 className="text-h2">
          {t("reward")} <br />
          <span className="text-h1 text-secondary">
            {amount.toFixed(2)}
          </span>{" "}
          {label}
        </h1>
      </div>

      <h2 className="text-h3 font-medium tracking-widest">{t("thanks")}</h2>
    </section>
  );
};
