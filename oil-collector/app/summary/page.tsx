"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Approved from "@/assets/approved.png";
import Denied from "@/assets/denied.png";
import { useRouter, useSearchParams } from "next/navigation";
import Plant from "@/assets/plant.png";
import Money from "@/assets/money.png";
import { useTranslations } from "next-intl";

const oilPrice = 10;

const SummaryPage = () => {
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [showSelectedReward, setShowSelectedReward] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  const t = useTranslations("SummaryPage");

  const [oilVal, setOilVal] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [userCredits, setUserPoints] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);

  useEffect(() => {
    const oilVal = Number(localStorage.getItem("oilVal") || 0);
    setOilVal(oilVal);
    setPoints(oilVal / oilPrice);

    const userCredits = Number(localStorage.getItem("userCredits") || 0);
    setUserPoints(userCredits);

    setCash(oilVal * oilPrice);
  }, []);

  const handleFinished = useCallback(async () => {
    if (!selectedReward) {
      return;
    }

    if (selectedReward === "credit") {
      const url = "/api/credit";
      try {
        console.log(points, userCredits, points + userCredits);
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            phone: localStorage.getItem("phone"),
            credits: (points + userCredits).toFixed(1),
          }),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // If the reward is cash
      const url = "/api/cash";
      try {
        await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            phone: localStorage.getItem("phone"),
            oilVol: oilVal,
            pricePerLiter: oilPrice,
            cash: cash.toFixed(1),
          }),
        }).then(() => {
          localStorage.setItem("cash", cash.toFixed(1));
        });
      } catch (error) {
        console.log(error);
      }
    }

    router.push(`/done?status=approved&reward=${selectedReward}`);
  }, [selectedReward, points, userCredits, router, cash, oilVal]);

  const rewards = useMemo(
    () => [
      {
        key: "cash",
        name: t("reward1"),
        image: Money,
      },
      {
        key: "credit",
        name: t("reward2"),
        image: Plant,
      },
    ],
    [t]
  );

  return (
    <>
      {showSelectedReward && (
        <>
          {/* Approved Pop-up point selection */}
          <section className="absolute inset-0 bg-black opacity-85 z-20 flex justify-center items-center"></section>
          <section className="absolute bg-white p-8 rounded-4xl z-30 space-y-8">
            <h1 className="text-h1 font-bold">{t("rewardTitle")}</h1>

            <div className="w-full flex justify-between items-center space-x-5">
              {rewards.map((item, index) => (
                <div
                  onClick={() => setSelectedReward(item.key)}
                  key={index}
                  className={`w-1/2 flex flex-col justify-center items-center border-4 border-primary rounded-4xl p-5 ${
                    selectedReward === item.key && "bg-primary"
                  }`}
                >
                  <h3 className="text-h3 font-medium">{item.name}</h3>
                  <Image
                    src={item.image}
                    alt="menu"
                    width={100}
                    height={100}
                    quality={100}
                    placeholder="empty"
                    priority
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleFinished}
              disabled={!selectedReward}
              className="w-full bg-tertiary text-white p-5 rounded-full text-h4 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {t("submit")}
            </button>
          </section>
        </>
      )}

      {/* Summary Result */}
      <section className="bg-white w-[95%] h-[95%] rounded-4xl shadow-lg shadow-secondary-light flex flex-col justify-around items-center py-2">
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <Image
            src={status === "approved" ? Approved : Denied}
            alt="menu"
            width={70}
            height={70}
            quality={100}
            placeholder="empty"
            priority
          />
          <div className="w-1/2 space-y-2">
            <h2 className="text-h2 font-bold">{t("title")}</h2>
            <hr />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <div className="w-full flex justify-between items-center p-8 text-h3">
            <p>{t("row1")}</p>
            <p
              className={`${
                status === "approved" ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {status === "approved" ? `${t("approved")}` : `${t("denied")}`}
            </p>
          </div>
          {status === "approved" ? (
            <>
              <div className="w-full flex justify-between items-center p-8 text-h3">
                <p>{t("row2")}</p>
                <p>
                  {oilVal} {t("liter")}
                </p>
              </div>
              <div className="w-full flex justify-between items-center p-8 text-h3">
                <p>{t("row3")}</p>
                <p>
                  {oilPrice} {t("unit")}
                </p>
              </div>
              <div className="w-full flex justify-between items-end px-10 py-5 text-h3 bg-secondary text-white">
                <p>{t("row4")}</p>
                <p>
                  <span className="font-extrabold text-h1">{cash}</span>{" "}
                  {t("bath")}
                </p>
              </div>
              <div className="w-full flex justify-between items-end px-10 py-5 mt-2 text-h3 bg-secondary text-white">
                <p>{t("row5")}</p>
                <p>
                  <span className="font-extrabold text-h1">{points}</span>{" "}
                  {t("credit")}
                </p>
              </div>
            </>
          ) : (
            <p className="p-8 text-h2 text-red-500">
              โปรดรับน้ำมันคืนที่ <br />
              <span className="font-bold text-h1 text-red-600 drop-shadow-lg">
                ช่องด้านข้าง
              </span>{" "}
              ของเครื่อง
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (status === "approved") {
              setShowSelectedReward(true);
            } else {
              router.push("/done?status=denied");
            }
          }}
          className="self-end mr-10 px-10 py-5 rounded-full text-h4 z-10 bg-tertiary active:bg-secondary text-white"
        >
          {t("submit")}
        </button>
      </section>
    </>
  );
};

export default SummaryPage;
