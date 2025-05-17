"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Approved from "@/assets/approved.png";
import Denied from "@/assets/denied.png";
import { useRouter, useSearchParams } from "next/navigation";
import Plant from "@/assets/plant.png";
import Money from "@/assets/money.png";

const rewards = [
  {
    name: "เงินสด",
    image: Money,
  },
  {
    name: "เครดิต",
    image: Plant,
  },
];

const SummaryPage = () => {
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [showSelectedReward, setShowSelectedReward] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  //   const [oilVal, setOilVal] = useState<number>(
  //     Number(localStorage.getItem("oilVal") || 0)
  //   );
  //   const [points, setPoints] = useState<number>(
  //     Number(localStorage.getItem("points") || 0)
  //   );
  //   const [userPoints, setUserPoints] = useState<number>(
  //     Number(localStorage.getItem("userPoints") || 0)
  //   );

  const handleFinished = useCallback(async () => {
    // const url = "/api/db";
    // try {
    //   await fetch(url, {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       phone: localStorage.getItem("phone"),
    //       points: (points + userPoints).toFixed(1),
    //     }),
    //   }).then(() => {
    //     localStorage.removeItem("oilVal");
    //     localStorage.removeItem("points");
    //     localStorage.removeItem("userPoints");
    //     localStorage.removeItem("phone");
    //     router.push("/done");
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    router.push(`/done?status=approved&reward=${selectedReward}`);
  }, [selectedReward]);
  return (
    <>
      {/* Approved Pop-up point selection */}

      {showSelectedReward && (
        <>
          <section className="absolute inset-0 bg-black opacity-85 z-20 flex justify-center items-center"></section>
          <section className="absolute bg-white p-10 rounded-4xl z-30 space-y-8">
            <h1 className="text-h1 font-bold">โปรดเลือกรางวัล</h1>

            <div className="w-full flex justify-between items-center space-x-5">
              {rewards.map((item, index) => (
                <div
                  onClick={() => setSelectedReward(item.name)}
                  key={index}
                  className={`w-1/2 flex flex-col justify-center items-center border-4 border-primary rounded-4xl p-5 ${
                    selectedReward === item.name && "bg-primary"
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
              ยืนยัน
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
            width={80}
            height={80}
            quality={100}
            placeholder="empty"
            priority
          />
          <div className="w-1/2 space-y-2">
            <h1 className="text-h1 font-bold">สรุปรายการ</h1>
            <hr />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <div className="w-full flex justify-between items-center p-10 text-h3">
            <p>คุณภาพน้ำมัน</p>
            <p>{status === "approved" ? "ผ่าน" : "ไม่ผ่าน"}</p>
          </div>
          {status === "approved" ? (
            <>
              <div className="w-full flex justify-between items-center p-10 text-h3">
                <p>ราคาต่อลิตร</p>
                <p>24 บาท/ลิตร </p>
              </div>
              <div className="w-full flex justify-between items-end px-10 py-5 text-h3 bg-secondary text-white">
                <p>ราคารวม</p>
                <p>
                  <span className="font-extrabold text-h1">100</span> บาท
                </p>
              </div>
              <div className="w-full flex justify-between items-end px-10 py-5 mt-2 text-h3 bg-secondary text-white">
                <p>เครดิตรวม</p>
                <p>
                  <span className="font-extrabold text-h1">50</span> เครดิต
                </p>
              </div>
            </>
          ) : (
            <p className="p-10 text-h2 text-red-500">
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
          เสร็จสิ้น
        </button>
      </section>
    </>
  );
};

export default SummaryPage;
