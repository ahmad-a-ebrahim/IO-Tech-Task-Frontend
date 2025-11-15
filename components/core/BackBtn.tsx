"use client";

import { useRouter } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const BackBtn = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer flex items-center gap-1 text-primary font-medium"
    >
      {locale === "ar" ? <ChevronRight /> : <ChevronLeft />}
      {t("back")}
    </button>
  );
};

export default BackBtn;
