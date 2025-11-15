import Image from "next/image";
import mainBackground from "@/public/main-bg.jpg";
import { getLocale, getTranslations } from "next-intl/server";
import { getServices } from "@/actions/services";
import BackBtn from "@/components/core/BackBtn";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ServiceType = {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const SearchCard = async ({ service }: { service: ServiceType }) => {
  const t = await getTranslations("hero");
  return (
    <div className="space-y-2 border-b p-4">
      <p className="text-primary font-medium">{service.title}</p>

      <Link
        className="cursor-pointer underline"
        href={`/services/${service.id}`}
      >
        {t("read_more")}
      </Link>
    </div>
  );
};

const SearchResults = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: number }>;
}) => {
  const t = await getTranslations("search");
  const locale = await getLocale();

  const pageSearchParams = await searchParams;
  const searchQuery = pageSearchParams.q || "";
  const paginationPage = Number(pageSearchParams.page) || 1;

  const { services, hasNextPage, hasPrevPage, totalPages } = await getServices({
    q: searchQuery,
    limit: 5,
    page: paginationPage,
  });

  return (
    <section>
      <div className="w-full min-h-screen relative overflow-hidden">
        <div className={`absolute inset-0`}>
          <Image
            src={mainBackground}
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

          <p
            className={`text-primary-foreground text-5xl font-bold absolute top-1/2 left-1/2 max-w-md -translate-1/2`}
          >
            {t("search_results_for") + " " + `"${searchQuery}"`}
          </p>
        </div>
      </div>

      <div id="results" className="bg-background p-8 sm:p-16">
        <BackBtn />

        {Boolean(services && services.length) ? (
          <div className="flex flex-col gap-4 mt-8">
            {services.map((service: ServiceType) => (
              <SearchCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <p className="p-8 sm:p-16 text-center">{t("no_results")}</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 my-8">
        {hasPrevPage ? (
          <Link
            href={`/search?q=${searchQuery}&page=${paginationPage - 1}#results`}
          >
            {locale === "ar" ? <ChevronRight /> : <ChevronLeft />}
          </Link>
        ) : (
          <button>
            {locale === "ar" ? (
              <ChevronRight className="opacity-50" />
            ) : (
              <ChevronLeft className="opacity-50" />
            )}
          </button>
        )}

        <span className="text-base font-medium text-gray-700">
          {`${t("page")} ${paginationPage} ${t("of")} ${totalPages}`}
        </span>

        {hasNextPage ? (
          <Link
            href={`/search?q=${searchQuery}&page=${paginationPage + 1}#results`}
          >
            {locale === "ar" ? <ChevronLeft /> : <ChevronRight />}
          </Link>
        ) : (
          <button>
            {locale === "ar" ? (
              <ChevronLeft className="opacity-50" />
            ) : (
              <ChevronRight className="opacity-50" />
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
