"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function setLang(locale: string) {
    router.push(pathname, { locale });
  }

  return (
    <div className="relative inline-block text-left group">
      <button className="text-sm flex items-center gap-1">
        {locale === "ar" ? "عربي" : "English"} <ChevronDown />
      </button>

      <div
        className="
          absolute mt-2 w-32 rounded-lg shadow-lg p-1 z-50 
          bg-background text-foreground
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible 
          transition-all duration-150
        "
      >
        <button
          onClick={() => setLang("en")}
          className="flex items-center gap-2 font-inter! w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100"
        >
          English
          {locale === "en" && <Check size={16} />}
        </button>

        <button
          onClick={() => setLang("ar")}
          className="flex items-center gap-2 font-cairo! w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100"
        >
          عربي
          {locale === "ar" && <Check size={16} />}
        </button>
      </div>
    </div>
  );
}
