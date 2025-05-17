"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const DonePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reward = searchParams.get("reward");
  useEffect(() => {
    setTimeout(() => {
      router.push("/main");
    }, 2000);
  }, []);

  // localStorage.removeItem("oilVal");
  // localStorage.removeItem("points");
  // localStorage.removeItem("userCredits");
  // localStorage.removeItem("phone");
  return (
    <>
      {status === "approved" ? (
        <>
          {reward === "credit" ? (
            <section>Show Credit</section>
          ) : (
            <section className="">Show Cash</section>
          )}
        </>
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
