import Image from "next/image";
import twitterIcon from "@/public/twitter.svg";
import facebookIcon from "@/public/facebook.svg";
import googlePlusIcon from "@/public/google-plus.svg";
import { footerNavigationItems } from "@/constants/footer-navigation";
import { getTranslations } from "next-intl/server";
import SubscribeForm from "../footer/SubscribeForm";

const Footer = async () => {
  const t = await getTranslations("footer");
  return (
    <footer className="flex flex-col p-8 bg-primary text-primary-foreground">
      <div className="self-end flex flex-wrap items-center gap-8">
        <SubscribeForm />

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
