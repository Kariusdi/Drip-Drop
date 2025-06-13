"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import Approved from "@/assets/approved.png";
import Denied from "@/assets/denied.png";
import Plant from "@/assets/plant.png";
import Money from "@/assets/money.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import realtimeDB from "@/utils/realtimeDB";
import { ref, set } from "firebase/database";

const oilPrice = 10;

// ✅ Component: RewardOptionSelector
const RewardOptionSelector = ({
  rewards,
  selectedReward,
  onSelect,
  onSubmit,
  disabled,
  title,
  submitLabel,
}: {
  rewards: { key: string; name: string; image: any }[];
  selectedReward: string;
  onSelect: (key: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  title: string;
  submitLabel: string;
}) => (
  <>
    <section className="absolute inset-0 bg-black opacity-85 z-20 flex justify-center items-center"></section>
    <section className="absolute bg-white p-8 rounded-4xl z-30 space-y-8">
      <h1 className="text-h1 font-bold">{title}</h1>
      <div className="w-full flex justify-between items-center space-x-5">
        {rewards.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item.key)}
            className={`w-1/2 flex flex-col justify-center items-center border-4 border-primary rounded-4xl p-5 ${
              selectedReward === item.key && "bg-primary"
            }`}
          >
            <h3 className="text-h3 font-medium">{item.name}</h3>
            <Image
              src={item.image}
              alt="reward"
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
        onClick={onSubmit}
        disabled={disabled}
        className="w-full bg-tertiary text-white p-5 rounded-full text-h4 disabled:bg-gray-200 disabled:text-gray-400"
      >
        {submitLabel}
      </button>
    </section>
  </>
);

// ✅ Component: SummaryRow
const SummaryRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number | ReactNode;
  highlight?: boolean;
}) => (
  <div
    className={`w-full flex justify-between items-center p-8 text-h3 ${
      highlight ? "bg-secondary text-white mt-1" : ""
    }`}
  >
    <p>{label}</p>
    <p className={highlight ? "font-extrabold text-h1" : ""}>{value}</p>
  </div>
);

// ✅ Main Component
const SummaryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const t = useTranslations("SummaryPage");

  const [selectedReward, setSelectedReward] = useState("");
  const [showSelectedReward, setShowSelectedReward] = useState(false);

  const [oilVal, setOilVal] = useState(0);
  const [points, setPoints] = useState(0);
  const [userCredits, setUserCredits] = useState(0);
  const [cash, setCash] = useState(0);

  useEffect(() => {
    const oil = Number(localStorage.getItem("oilVal") || 0);
    const credits = Number(localStorage.getItem("userCredits") || 0);
    setOilVal(oil);
    setPoints(oil / oilPrice);
    setUserCredits(credits);
    setCash(oil * oilPrice);
  }, []);

  const handleFinished = useCallback(async () => {
    const phone = localStorage.getItem("phone");

    if (!selectedReward || !phone) return;

    if (selectedReward === "credit") {
      try {
        await fetch("/api/credit", {
          method: "PUT",
          body: JSON.stringify({
            phone,
            credits: (points + userCredits).toFixed(1),
          }),
        }).then(() => {
          localStorage.setItem("userCredits", String(points));
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch("/api/cash", {
          method: "POST",
          body: JSON.stringify({
            phone,
            oilVol: oilVal,
            pricePerLiter: oilPrice,
            cash: cash.toFixed(1),
          }),
        });
        localStorage.setItem("cash", cash.toFixed(1));
      } catch (error) {
        console.error(error);
      }
    }

    const oilValRef = ref(realtimeDB, "oilVal");
    await set(oilValRef, 0);
    const approvedRef = ref(realtimeDB, "approved");
    await set(approvedRef, 2);
    router.push(`/done?status=approved&reward=${selectedReward}`);
  }, [selectedReward, points, userCredits, router, cash, oilVal]);

  const rewards = useMemo(
    () => [
      { key: "cash", name: t("reward1"), image: Money },
      { key: "credit", name: t("reward2"), image: Plant },
    ],
    [t]
  );

  return (
    <>
      {showSelectedReward && (
        <RewardOptionSelector
          rewards={rewards}
          selectedReward={selectedReward}
          onSelect={setSelectedReward}
          onSubmit={handleFinished}
          disabled={!selectedReward}
          title={t("rewardTitle")}
          submitLabel={t("submit")}
        />
      )}

      <section className="bg-white w-[95%] h-[95%] rounded-4xl shadow-lg shadow-secondary-light flex flex-col justify-around items-center py-2">
        {/* Header */}
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <Image
            src={status === "approved" ? Approved : Denied}
            alt="status"
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

        {/* Summary Content */}
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <SummaryRow
            label={t("row1")}
            value={
              <span
                className={`font-medium ${
                  status === "approved" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status === "approved" ? t("approved") : t("denied")}
              </span>
            }
          />

          {status === "approved" ? (
            <>
              <SummaryRow label={t("row2")} value={`${oilVal} ${t("liter")}`} />
              <SummaryRow
                label={t("row3")}
                value={`${oilPrice} ${t("unit")}`}
              />
              <SummaryRow
                label={t("row4")}
                value={`${cash} ${t("bath")}`}
                highlight
              />
              <SummaryRow
                label={t("row5")}
                value={`${points} ${t("credit")}`}
                highlight
              />
            </>
          ) : (
            <p className="p-8 text-h2 text-red-500 text-center">
              {t("deniedPhase1")} <br />
              <span className="font-bold text-h1 text-red-600 drop-shadow-lg">
                {t("deniedPhase2")}
              </span>{" "}
              {t("deniedPhase3")}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
