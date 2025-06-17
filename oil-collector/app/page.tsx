import Image from "next/image";
import BG from "@/assets/bg.gif";
import Logo from "@/assets/logo.webp";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("LandingPage");
  return (
    <Link href="/main" className="w-full h-full">
      <section className="relative flex justify-center items-center w-full h-full overflow-hidden -m-2">
        <Image
          src={BG}
          alt="bg"
          fill
          quality={100}
          placeholder="empty"
          className="object-cover"
          priority
        />
        <div className="flex flex-col justify-center items-center z-50 -mt-32">
          <Image
            src={Logo}
            alt="logo"
            width={800}
            height={800}
            quality={100}
            priority
          />
          <h3 className="text-h3 animate-bounce text-black -mt-44">
            {t("tab")}
          </h3>
        </div>
      </section>
    </Link>
  );
}
