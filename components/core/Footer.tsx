import Image from "next/image";
import twitterIcon from "@/public/twitter.svg";
import facebookIcon from "@/public/facebook.svg";
import googlePlusIcon from "@/public/google-plus.svg";
import { footerNavigationItems } from "@/constants/footer-navigation";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("footer");
  return (
    <footer className="flex flex-col p-8 bg-primary text-primary-foreground">
      <div className="self-end flex flex-wrap items-center gap-8">
        <div className="p-1 rounded-lg bg-background text-foreground flex">
          <input
            type="text"
            placeholder={t("email")}
            className="bg-transparent border-none outline-none px-2 w-full max-w-full"
          />
          <button className="bg-primary hover:bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-md cursor-pointer">
            {t("subscribe")}
          </button>
        </div>

        <div className="flex items-center gap-8">
          <p>{t("contacts")}</p>
          <div className="flex items-center gap-4">
            <Image
              src={twitterIcon}
              alt="Twitter Icon"
              className="cursor-pointer"
            />
            <Image
              src={facebookIcon}
              alt="Facebook Icon"
              className="cursor-pointer"
            />
            <Image
              src={googlePlusIcon}
              alt="Google plus Icon"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-background w-full my-8"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {footerNavigationItems.map((item) => (
            <button
              key={item.id}
              className="text-sm cursor-pointer hover:underline"
            >
              {t(item.title)}
            </button>
          ))}
        </div>

        <p className="text-sm">{`© 2024 . ${t("all_rights_reserved")}.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
