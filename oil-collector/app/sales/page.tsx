"use client";
import { useEffect, useState } from "react";
import AppTable from "../_components/AppTable";
import AppBackArrow from "../_components/AppBackArrow";
import { useTranslations } from "next-intl";

const SalesPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const t = useTranslations("SalesPage");

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone");
    setPhoneNumber(phoneNumber ?? "");
  }, []);

  return (
    <>
      <AppBackArrow />
      <section className="relative w-full h-full p-5 flex flex-col justify-center items-center space-y-10">
        <h3 className="text-h3 font-medium text-secondary">
          {t("title")}
          <p className="text-2xl">
            <span>{t("subtitle")}</span> {phoneNumber}
          </p>
        </h3>
        <AppTable />
      </section>
    </>
  );
};

export default SalesPage;
