"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { validatePhone } from "@/app/utils/phone";
import { useRouter, useSearchParams } from "next/navigation";
import AppBackArrow from "../_components/AppBackArrow";

const RegisterPage = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from");
  const router = useRouter();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (!validationError) {
      const createUser_url = "/api/db";
      const getUser_url = `/api/db?phone=${phone}`;
      try {
        if (fromPage === "collector") {
          // Do fetch point of the user
          await fetch(createUser_url, {
            method: "POST",
            body: JSON.stringify({ phone: phone }),
          })
            .then(async () => {
              const getUserPoist_res = await fetch(getUser_url, {
                method: "GET",
              });
              const json = await getUserPoist_res.json();
              localStorage.setItem("userPoints", String(json.data.points));
            })
            .catch(() => {
              localStorage.setItem("userPoints", "0");
            });
          localStorage.setItem("phone", phone);
          router.push("/collector");
        } else if (fromPage === "sales") {
          router.push("/sales");
        } else {
          router.push("/credits");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // Even its not error the function returns ""
    setError(validationError);
  };
  return (
    <>
      <AppBackArrow />
      <section className="w-full p-10 space-y-28">
        <div className="text-5xl font-bold space-y-5">
          <h1>โปรดกรอกเบอร์โทรศัพท์</h1>
          <h2>เพื่อสะสมแต้ม</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 w-full h-[250px] flex flex-col justify-between items-stretch"
        >
          <div className="space-y-2">
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="ตัวอย่าง: 089xxxxxx"
              className="mt-1 h-auto w-full p-4 border bg-white border-primary rounded-lg focus:border-secondary outline-0 text-2xl shadow-lg"
            />
            {error && (
              <p className="text-red-500 mt-1 text-xl text-start">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-secondary text-white py-4 text-3xl active:bg-secondary w-full rounded-full"
          >
            เสร็จสิ้น
          </button>
        </form>
      </section>
    </>
  );
};

export default RegisterPage;
