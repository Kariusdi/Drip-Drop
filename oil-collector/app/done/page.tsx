"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DonePage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);
  return (
    <section className="text-6xl font-bold space-y-10">
      <h1>🙏🏻</h1>
      <h2>ขอบคุณที่ใช้บริการกับเรา</h2>
    </section>
  );
};

export default DonePage;
