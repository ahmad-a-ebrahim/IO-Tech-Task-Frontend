"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Client = {
  image: string;
  name: string;
  position: string;
  review: string;
};

type ClientsProps = {
  clients: Client[];
};

const Clients = ({ clients }: ClientsProps) => {
  const locale = useLocale();
  const t = useTranslations("client");

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const goNext = () => {
    if (activeSlideIndex === clients.length - 1) return;
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
          src={clients[activeSlideIndex].image}
          alt="Client Image"
          width={374}
          height={374}
          className="rounded-sm max-lg:max-w-40"
        />
        <div className="flex flex-col justify-between gap-10">
          <p className="text-base md:text-lg text-slate-200 max-w-5xl">{`" ${clients[activeSlideIndex].review} "`}</p>
          <div className="space-y-4">
            <p className="text-lg font-bold">
              {clients[activeSlideIndex].name}
            </p>
            <p className="text-sm text-slate-200">
              {clients[activeSlideIndex].position}
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
          disabled={activeSlideIndex === clients.length - 1 || fade}
          className={`cursor-pointer p-3 rounded-full ${
            activeSlideIndex === clients.length - 1
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
