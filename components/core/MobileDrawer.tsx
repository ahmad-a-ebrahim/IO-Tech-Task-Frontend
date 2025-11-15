"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronDown, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { navigationItems } from "@/constants/navigation";
import SearchBar from "./SearchBar";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const t = useTranslations("header-navigation");
  const locale = useLocale();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  function toggleItem(title: string) {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 h-full w-64 bg-primary text-primary-foreground p-5
          z-50
          lg:hidden
          flex flex-col
          overflow-auto
          ${locale === "ar" ? "left-0" : "right-0"}

          transform transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
          }
        `}
      >
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="mb-6 text-primary-foreground self-end cursor-pointer"
        >
          <X />
        </button>

        <div className="md:hidden mb-6">
          <SearchBar />
        </div>

        <button className="mb-6 p-1.5 border border-white rounded-lg text-sm cursor-pointer hover:bg-background hover:text-foreground transition-colors duration-150">
          {t("book_appointment")}
        </button>

        <nav className="flex flex-col gap-3">
          {navigationItems.map((item, index) => {
            if (!item.sub_items) {
              return (
                <Link
                  key={index}
                  href={item.href as string}
                  className="text-sm"
                  onClick={onClose}
                >
                  {t(item.title)}
                </Link>
              );
            }

            const isOpen = openItems[item.title] || false;

            return (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => toggleItem(item.title)}
                  className="text-sm flex items-center justify-between cursor-pointer"
                >
                  {t(item.title)}
                  <ChevronDown
                    className={`${
                      isOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>

                <div
                  className={`
                    overflow-hidden
                    transition-[max-height,opacity]
                    duration-300
                    ease-in-out
                    pl-4 mt-2 gap-2 flex flex-col
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  {item.sub_items.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={`${sub.href}/${sub.id}`}
                      className="text-sm"
                      onClick={onClose}
                    >
                      {t(sub.title)}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
