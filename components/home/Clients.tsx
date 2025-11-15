"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/types";

const fakeData = [
  {
    name: {
      en: "Fatima Al-Zahra",
      ar: "فاطمة الزهراء",
    },
    position: {
      en: "Digital Marketing Manager",
      ar: "مُديرة تسويق رقمي",
    },
    review: {
      en: "This product exceeded all my expectations. The speed of performance and the outstanding technical support made my work significantly easier. I highly recommend it to anyone looking for high-quality solutions.",
      ar: "لقد تجاوز هذا المنتج توقعاتي بالكامل. السرعة في الأداء والدعم الفني المتميز جعلت عملي أسهل بكثير. أوصي به بشدة لأي شخص يبحث عن حلول عالية الجودة.",
    },
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: {
      en: "Khaled Al-Mansour",
      ar: "خالد المنصور",
    },
    position: {
      en: "Startup Founder",
      ar: "مؤسس شركة ناشئة",
    },
    review: {
      en: "Thanks to the tools they provide, we achieved a 40% growth in just three months. The user interface is highly intuitive, saving us a massive amount of time and effort.",
      ar: "بفضل الأدوات التي يقدمونها، تمكنا من تحقيق نمو بنسبة 40% في ثلاثة أشهر فقط. واجهة المستخدم بديهية للغاية، مما يوفر علينا قدراً هائلاً من الوقت والجهد.",
    },
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    name: {
      en: "Laila Abdullah",
      ar: "ليلى عبد الله",
    },
    position: {
      en: "Frontend Developer",
      ar: "مُطورة واجهات أمامية",
    },
    review: {
      en: "The flexibility and precision offered by this system are unmatched. It helped me streamline a complex workflow and achieve more professional results in record time.",
      ar: "المرونة والدقة التي يوفرها هذا النظام لا مثيل لها. لقد ساعدني في تبسيط سير العمل المعقد وتحقيق نتائج أكثر احترافية في وقت قياسي.",
    },
    image: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    name: {
      en: "Yousef Al-Najjar",
      ar: "يوسف النجار",
    },
    position: {
      en: "Financial Consultant",
      ar: "مُستشار مالي",
    },
    review: {
      en: "Their customer service is exceptional. They were quick to respond and resolved my issue within minutes. This is the gold standard for quality and professionalism.",
      ar: "خدمة العملاء لديهم استثنائية. كانوا سريعين في الاستجابة وحلوا مشكلتي في دقائق. هذا هو المعيار الذهبي للجودة والاحترافية.",
    },
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
];

const Clients = () => {
  const locale = useLocale();
  const t = useTranslations("client");

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const goNext = () => {
    if (activeSlideIndex === fakeData.length - 1) return;
    setFade(true);
    setTimeout(() => {
      setActiveSlideIndex((prev) => prev + 1);
      setFade(false);
    }, 250);
  };

  const goPrev = () => {
    if (activeSlideIndex === 0) return;
    setFade(true);
    setTimeout(() => {
      setActiveSlideIndex((prev) => prev - 1);
      setFade(false);
    }, 250);
  };

  return (
    <section className="min-h-screen bg-primary text-primary-foreground flex flex-col justify-center py-4 px-8 md:px-16">
      <p className="text-3xl md:text-4xl font-bold">{t("title")}</p>
      <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-4">
        {t("description")}
      </p>

      {/* Slide */}
      <div
        className={`w-full flex flex-col lg:flex-row gap-6 mt-12 transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={fakeData[activeSlideIndex].image}
          alt="Client Image"
          width={374}
          height={374}
          className="rounded-sm max-lg:max-w-40"
        />
        <div className="flex flex-col justify-between gap-10">
          <p className="text-base md:text-lg text-slate-200 max-w-5xl">{`" ${
            fakeData[activeSlideIndex].review[locale as Locale]
          } "`}</p>
          <div className="space-y-4">
            <p className="text-lg font-bold">
              {fakeData[activeSlideIndex].name[locale as Locale]}
            </p>
            <p className="text-sm text-slate-200">
              {fakeData[activeSlideIndex].position[locale as Locale]}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 self-end mt-6">
        <button
          onClick={goPrev}
          disabled={activeSlideIndex === 0 || fade}
          className={`cursor-pointer p-3 rounded-full ${
            activeSlideIndex === 0
              ? "bg-white/10 text-white cursor-not-allowed!"
              : "bg-white hover:bg-slate-100 text-black"
          }`}
        >
          {locale === "ar" ? <ArrowRight /> : <ArrowLeft />}
        </button>

        <button
          onClick={goNext}
          disabled={activeSlideIndex === fakeData.length - 1 || fade}
          className={`cursor-pointer p-3 rounded-full ${
            activeSlideIndex === fakeData.length - 1
              ? "bg-white/10 text-white cursor-not-allowed!"
              : "bg-white hover:bg-slate-100 text-black"
          }`}
        >
          {locale === "ar" ? <ArrowLeft /> : <ArrowRight />}
        </button>
      </div>
    </section>
  );
};

export default Clients;
