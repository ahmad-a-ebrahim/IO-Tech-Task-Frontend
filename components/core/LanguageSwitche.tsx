"use client";

import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function setLang(locale: string) {
    router.push(pathname, { locale });
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setLang("en")}>English</button>
      <button onClick={() => setLang("ar")}>العربية</button>
    </div>
  );
}
