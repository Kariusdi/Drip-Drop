"use client";
import { FC } from "react";
import Image from "next/image";
import Arrow from "@/assets/arrow.png";
import { useRouter } from "next/navigation";

const AppBackArrow: FC = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/main")}
      className="absolute top-0 left-0 p-3 flex justify-center items-center space-x-2 cursor-pointer"
    >
      <Image
        src={Arrow}
        alt="arrow back"
        width={40}
        height={40}
        quality={100}
        placeholder="empty"
        priority
        className="rotate-90"
      />
      <p className="text-xl">กลับ</p>
    </div>
  );
};

export default AppBackArrow;
