import Image from "next/image";
import Logo from "@/assets/drop.png";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("LandingPage");
  return (
    <Link href={"/main"} className="w-full h-full">
      <section className="h-full w-full flex flex-col justify-center items-center space-y-20">
        <Image
          src={Logo}
          alt="logo"
          width={600}
          height={600}
          quality={100}
          placeholder="empty"
          priority
        />
        <h2 className="text-h2 animate-bounce">{t("tab")}</h2>
      </section>
    </Link>
  );
}
