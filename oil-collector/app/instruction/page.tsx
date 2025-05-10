"use client";
import React from "react";
import Image from "next/image";
import Arrow from "@/assets/arrow.png";
import { useRouter } from "next/navigation";

const InstructionPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center space-y-28">
      <div className="text-center bg-primary text-white z-20 p-10 rounded-4xl space-y-10">
        <p className="font-bold text-3xl">
          โปรดใส่ "น้ำมันพืช" ที่ช่องใส่ด้านล่าง
        </p>
        <button
          onClick={() => router.push("/collector")}
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
  );
};

export default InstructionPage;
