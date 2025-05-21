"use client";
import { useEffect, useState } from "react";
import AppBackArrow from "../_components/AppBackArrow";
import { useTranslations } from "next-intl";

const CreditsPage = () => {
  const t = useTranslations("CreditPage");
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const phoneNumber = localStorage.getItem("phone");
      try {
        const response = await fetch(`/api/credit?phone=${phoneNumber}`);
        const result = await response.json();
        setCredits(result.data.credits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {credits && (
        <>
          <AppBackArrow />
          <section className="flex flex-col items-center justify-center h-full w-full space-y-10 p-10">
            {credits === 0 ? (
              <>
                {" "}
                <h1 className="text-h1 font-bold text-tertiary">
                  {t("noPoint")}
                </h1>
                <h3 className="text-h3 text-secondary">{t("suggesstion")}</h3>
              </>
            ) : (
              <>
                <h1 className="text-h1 font-bold">{t("title")}</h1>
                <div className="bg-primary rounded-full p-20 text-center text-secondary shadow-2xl">
                  <p className="text-9xl font-bold drop-shadow-2xl">
                    {credits}
                  </p>
                  <p className="text-h1 font-medium ml-2">{t("point")}</p>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default CreditsPage;
