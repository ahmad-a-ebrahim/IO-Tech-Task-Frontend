"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/hero/hero.css";
import { Locale } from "@/types";

const fakeData = [
  {
    title: {
      en: "John Doe",
      ar: "جون دو",
    },
    description: {
      en: "Full-stack developer with a passion for clean code.",
      ar: "مطور شامل (Full-stack developer) بشغف للكود النظيف.",
    },
    profile_image: "https://randomuser.me/api/portraits/men/22.jpg",
    cover_image: "https://picsum.photos/800/300?random=76",
  },
  {
    title: {
      en: "Jane Smith",
      ar: "جين سميث",
    },
    description: {
      en: "Product designer focusing on user experience and visuals.",
      ar: "مصممة منتجات تركز على تجربة المستخدم والمرئيات.",
    },
    profile_image: "https://randomuser.me/api/portraits/men/99.jpg",
    cover_image: "https://picsum.photos/800/300?random=60",
  },
];

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
  const totalSlides = fakeData.length;

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);

  function getAnimationDirection(dir: "left" | "right") {
    if (locale === "ar") {
      return dir === "left" ? "right" : "left";
    }
    return dir;
  }

  function goToSlide(index: number, dir: "left" | "right") {
    if (animating || index === activeSlideIndex) return;

    setAnimating(true);
    setPrevSlideIndex(activeSlideIndex);
    setDirection(dir);
    setActiveSlideIndex(index);
  }

  const nextSlide = () => {
    goToSlide((activeSlideIndex + 1) % totalSlides, "right");
  };

  const prevSlide = () => {
    goToSlide(
      activeSlideIndex === 0 ? totalSlides - 1 : activeSlideIndex - 1,
      "left"
    );
  };

  useEffect(() => {
    if (!animating) return;

    const timeout = setTimeout(() => {
      setPrevSlideIndex(null);
      setAnimating(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [animating]);

  useEffect(() => {
    if (animating) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [activeSlideIndex, animating]);

  return (
    <section>
      <div className="w-full min-h-screen relative overflow-hidden">
        {prevSlideIndex !== null && (
          <div
            key={`prev-${prevSlideIndex}`}
            className={`absolute inset-0 transition-transform duration-700 ease-out ${
              getAnimationDirection(direction) === "right"
                ? "animate-slide-out-left"
                : "animate-slide-out-right"
            }`}
          >
            <Image
              src={fakeData[prevSlideIndex].cover_image}
              alt="Cover Image"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(-45deg, #4B261547 0%, #4B2615AD 100%)",
              }}
            ></div>
          </div>
        )}

        <div
          key={`active-${activeSlideIndex}`}
          className={`absolute inset-0 transition-transform duration-700 ease-out ${
            getAnimationDirection(direction) === "right"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }`}
        >
          <Image
            src={fakeData[activeSlideIndex].cover_image}
            alt="Cover Image"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(-45deg, #4B261547 0%, #4B2615AD 100%)",
            }}
          ></div>
        </div>

        <div className="absolute w-full h-full flex items-center justify-between gap-4 z-40 px-8 sm:px-16">
          <div className="flex flex-col items-end gap-10">
            <button
              className="text-white cursor-pointer"
              onClick={() => {
                if (!animating) prevSlide();
              }}
              disabled={animating}
              aria-disabled={animating}
            >
              {locale === "ar" ? (
                <ChevronRight size={48} />
              ) : (
                <ChevronLeft size={48} />
              )}
            </button>

            <div className="flex flex-col gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!animating) {
                      setDirection(index > activeSlideIndex ? "right" : "left");
                      goToSlide(
                        index,
                        index > activeSlideIndex ? "right" : "left"
                      );
                    }
                  }}
                  className={`border-white border-2 rounded-full w-3 h-3 transition-all cursor-pointer ${
                    index === activeSlideIndex
                      ? "bg-white scale-110"
                      : "bg-transparent"
                  }`}
                  disabled={animating}
                  aria-disabled={animating}
                ></button>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-col gap-10 transition-all duration-700 ${
              getAnimationDirection(direction) === "right"
                ? "animate-text-right"
                : "animate-text-left"
            }`}
            key={`text-${activeSlideIndex}`}
          >
            <div className="flex flex-col gap-5">
              <Image
                src={fakeData[activeSlideIndex].profile_image}
                alt="Profile Image"
                width={263}
                height={263}
                className={`object-cover rounded-sm transition-all duration-700 sm:hidden ${
                  getAnimationDirection(direction) === "right"
                    ? "animate-img-right"
                    : "animate-img-left"
                }`}
                key={`profile-${activeSlideIndex}`}
              />
              <p className="text-5xl sm:text-7xl text-primary-foreground font-bold">
                {fakeData[activeSlideIndex].title[locale as Locale]}
              </p>
              <p className="text-lg text-primary-foreground font-normal">
                {fakeData[activeSlideIndex].description[locale as Locale]}
              </p>
            </div>

            <button className="bg-white hover:bg-gray-100 transition-colors duration-150 text-black text-sm font-medium px-6 py-3 rounded-lg w-fit cursor-pointer">
              {t("read_more")}
            </button>
          </div>

          <Image
            src={fakeData[activeSlideIndex].profile_image}
            alt="Profile Image"
            width={374}
            height={374}
            className={`object-cover rounded-sm transition-all duration-700 max-sm:hidden ${
              getAnimationDirection(direction) === "right"
                ? "animate-img-right"
                : "animate-img-left"
            }`}
            key={`profile-${activeSlideIndex}`}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
