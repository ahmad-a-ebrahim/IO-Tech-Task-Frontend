"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import whatsappIcon from "@/public/whatsapp.svg";
import phoneIcon from "@/public/phone.svg";
import mailIcon from "@/public/mail.svg";

import "swiper/css";
import "swiper/css/navigation";
import { Locale } from "@/types";

const fakeData = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: {
      en: "Ahmed Al-Sayed",
      ar: "أحمد السيد",
    },
    position: {
      en: "Software Engineer",
      ar: "مهندس برمجيات",
    },
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: {
      en: "Sara Khalil",
      ar: "سارة خليل",
    },
    position: {
      en: "Product Manager",
      ar: "مديرة منتجات",
    },
  },
  {
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    name: {
      en: "Omar Mansour",
      ar: "عمر منصور",
    },
    position: {
      en: "UX/UI Designer",
      ar: "مصمم تجربة المستخدم / واجهات المستخدم",
    },
  },
  {
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    name: {
      en: "Laila Hassan",
      ar: "ليلى حسن",
    },
    position: {
      en: "Marketing Specialist",
      ar: "أخصائية تسويق",
    },
  },
];

type CardProps = {
  image: string;
  name: {
    en: string;
    ar: string;
  };
  position: {
    en: string;
    ar: string;
  };
};

const Card = ({ member }: { member: CardProps }) => {
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-3 items-center">
      <Image
        src={member.image}
        alt={member.name[locale as Locale]}
        width={269}
        height={269}
        className="rounded"
      />
      <p className="text-primary text-lg text-center font-medium">
        {member.name[locale as Locale]}
      </p>
      <p className="text-slate-500 text-base text-center uppercase">
        {member.position[locale as Locale]}
      </p>
      <div className="flex items-center gap-4">
        <Image src={whatsappIcon} alt="Whatsapp Icon" />
        <Image src={phoneIcon} alt="Phone Icon" />
        <Image src={mailIcon} alt="Mail Icon" />
      </div>
    </div>
  );
};

const Team = () => {
  const t = useTranslations("team");

  return (
    <section className="min-h-screen bg-[#F3F3F3] flex flex-col items-center justify-center p-8">
      <p className="text-4xl font-bold text-primary mb-5">{t("our_team")}</p>
      <p className="text-base font-normal text-[#1E1E1E] text-center max-w-2xl mb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s.
      </p>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
        navigation
        loop
        className="w-full max-w-4xl"
      >
        {fakeData.map((member, idx) => (
          <SwiperSlide
            key={idx}
            className="flex justify-center items-center p-12"
          >
            <Card member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Team;
