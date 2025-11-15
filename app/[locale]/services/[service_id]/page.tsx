import Image from "next/image";
import mainBackground from "@/public/main-bg.jpg";
import BackBtn from "@/components/core/BackBtn";
import { getServiceById } from "@/actions/services";
import { getLocale } from "next-intl/server";
import { ServiceType } from "../../search/page";

const page = async ({
  params,
}: {
  params: Promise<{ service_id: string }>;
}) => {
  const locale = await getLocale();

  const pageParams = await params;
  const serviceId = pageParams.service_id;

  const service: ServiceType = await getServiceById({ serviceId });

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
        </div>
        {service.title && (
          <p
            className={`text-primary-foreground text-5xl font-bold absolute top-1/2 -translate-y-1/2 max-w-md ${
              locale === "ar" ? "right-14" : "left-14"
            }`}
          >
            {service.title}
          </p>
        )}
      </div>
      {service.description && (
        <div className="p-8 sm:p-16 space-y-12">
          <BackBtn />

          {service.title && (
            <p className="text-primary text-4xl font-medium">{service.title}</p>
          )}

          <p>{service.description}</p>
        </div>
      )}
    </section>
  );
};

export default page;
