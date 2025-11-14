"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { navigationItems } from "@/constants/navigation";
import MobileDrawer from "./MobileDrawer";

const HeaderNavigation = () => {
  const t = useTranslations("header-navigation");

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-0 w-full flex items-center justify-between gap-4 py-4 px-8
        text-primary-foreground
        transition-colors duration-300
        ${scrolled ? "bg-primary" : "bg-transparent"}
      `}
    >
      <p className="text-sm">LOGO</p>

      <div className="flex items-center gap-6 max-lg:hidden">
        {navigationItems.map((item, index) => {
          if (!item.sub_items) {
            return (
              <Link key={index} href={item.href as string} className="text-sm">
                {t(item.title)}
              </Link>
            );
          }

          return (
            <div key={index} className="group">
              <button className="text-sm flex items-center gap-1">
                {t(item.title)}
                <ChevronDown />
              </button>

              {/* MEGA MENU */}
              <div
                className="
                  absolute left-1/2 top-13 mt-0
                  w-[calc(100vw-64px)]
                  max-w-[calc(100vw-64px)]
                  -translate-x-1/2
                  bg-primary text-primary-foreground
                  rounded-xl p-5 z-50
                  opacity-0 invisible scale-95
                  group-hover:opacity-100 group-hover:visible group-hover:scale-100
                  transition-all duration-200 ease-out
                "
              >
                <div className="grid grid-cols-4 gap-3">
                  {item.sub_items.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={`${sub.href}/${sub.id}`}
                      className="block px-3 py-2 rounded-md hover:bg-primary-foreground/10 text-sm"
                    >
                      {t(sub.title)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div
        className="
          relative flex items-center rounded-lg p-1.5
          transition-border duration-300
          border border-transparent
          group
          hover:border-primary-foreground
          focus-within:border-primary-foreground
          max-md:hidden
        "
      >
        <Search className="text-primary-foreground cursor-pointer" size={20} />
        <input
          type="text"
          placeholder={t("search")}
          className="
            mx-2
            w-0
            opacity-0
            group-hover:w-28
            group-hover:xl:w-40
            group-hover:opacity-100
            focus:w-28
            focus:xl:w-40
            focus:opacity-100
            transition-[width,opacity]
            duration-300
            ease-in-out
            text-primary-foreground
            border-none
            outline-none
            text-sm
          "
        />
      </div>
      <Link href={"/search"} className="md:hidden p-1.5">
        <Search className="text-primary-foreground cursor-pointer" size={20} />
      </Link>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button className="p-1.5 border border-white rounded-lg text-sm cursor-pointer hover:bg-background hover:text-foreground transition-colors duration-150 max-lg:hidden">
          {t("book_appointment")}
        </button>
        <button
          className="cursor-pointer lg:hidden"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default HeaderNavigation;
