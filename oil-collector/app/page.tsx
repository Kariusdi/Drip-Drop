import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-full flex flex-col justify-center items-center space-y-20">
      <div className="flex flex-col justify-center items-center space-y-8">
        <Image
          src={Logo}
          alt="logo"
          width={300}
          height={300}
          quality={100}
          placeholder="empty"
          priority
        />
        <h1 className="text-5xl font-bold">เครื่องรับซื้อน้ำมันพืชใช้แล้ว</h1>
      </div>
      <Link
        className="space-y-5 bg-primary text-white px-16 py-5 rounded-full cursor-pointer active:bg-primary-light"
        href={"/"}
      >
        <p className="text-3xl font-light">กดที่หน้าจอเพื่อ</p>
        <p className="text-5xl font-extrabold">ขายน้ำมัน</p>
      </Link>
    </section>
  );
}
