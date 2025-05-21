"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const InspectPage = () => {
  const router = useRouter();
  const t = useTranslations("InspectPage");

  useEffect(() => {
    setTimeout(() => {
      router.push("/summary?status=denied");
    }, 5000);
  });

  return (
    <section className="space-y-5 w-full h-full flex flex-col justify-center items-center">
      <div className="loader drop-shadow-lg drop-shadow-primary"></div>
      <h1 className="text-h1 font-bold">{t("title")}</h1>
      <h2 className="text-h2">{t("wait")}</h2>
    </section>
  );
};

export default InspectPage;
