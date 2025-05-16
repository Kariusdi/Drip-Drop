import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookiesLocale = (await cookies()).get("NEXTAPP_LOCALE")?.value || "th";
  const locale = cookiesLocale;
  return {
    messages: (await import(`../dictionaries/${locale}.json`)).default,
    locale,
  };
});
