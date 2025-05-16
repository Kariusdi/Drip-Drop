"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const DonePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);
  return (
    <>
      {status === "approved" ? (
        <></>
      ) : (
        <section className="text-6xl font-bold space-y-10">
          <h1>🙏🏻</h1>
          <h2>ขอบคุณที่ใช้บริการกับเรา</h2>
        </section>
      )}
    </>
  );
};

export default DonePage;
