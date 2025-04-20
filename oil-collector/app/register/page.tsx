"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { validatePhone } from "../utils/phone";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (validationError) {
      console.log(phone);
    } else {
      console.log(phone);
      router.push("/summary");
    }
    // Even its not error the function returns ""
    setError(validationError);
  };
  return (
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
            value={phone}
            onChange={handlePhoneChange}
            placeholder="ตัวอย่าง: 089xxxxxx"
            className="mt-1 h-auto w-full p-4 border border-gray-300 rounded-lg focus:border-primary outline-0 text-2xl shadow-lg"
          />
          {error && (
            <p className="text-red-500 mt-1 text-xl text-start">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-secondary text-white py-4 text-3xl active:bg-secondary-light w-full rounded-full"
        >
          เสร็จสิ้น
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
