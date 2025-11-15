"use client";

import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addSubscription } from "@/actions/subscriptions";
import { useState } from "react";

interface FormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("invalid_email").required("email_required"),
});

const SubscribeForm = () => {
  const t = useTranslations("footer");

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleSubscribe = async (values: FormValues) => {
    const { data, error } = await addSubscription(values.email);

    if (!error) {
      alert("Success!");
    } else {
      setErrorMessage(error);
    }

    formik.resetForm();
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubscribe,

    validateOnChange: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-1 rounded-lg bg-background text-foreground flex">
        <input
          type="email"
          placeholder={t("email")}
          className="bg-transparent border-none outline-none px-2 w-full max-w-full"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="bg-primary hover:bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-md cursor-pointer disabled:opacity-50"
        >
          {t("subscribe")}
        </button>
      </div>

      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-500 text-sm mt-1">
          {t(formik.errors.email)}
        </div>
      ) : errorMessage ? (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      ) : null}
    </form>
  );
};

export default SubscribeForm;
