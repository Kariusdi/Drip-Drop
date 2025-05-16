"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const InspectPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/summary?status=approved");
    }, 3000);
  });
  return (
    <section className="space-y-5 w-full h-full flex flex-col justify-center items-center">
      <div className="loader drop-shadow-lg drop-shadow-primary"></div>
      <h1 className="text-h1 font-bold">กำลังตรวจสอบคุณภาพน้ำมัน</h1>
      <h2 className="text-h2">โปรดรอสักครู่</h2>
    </section>
  );
};

export default InspectPage;
