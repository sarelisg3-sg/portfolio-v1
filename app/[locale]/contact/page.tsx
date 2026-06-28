import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("contact_title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        {t("title")}
      </h1>
      <p className="text-[var(--muted)] mb-10">{t("subtitle")}</p>
      <ContactForm locale={locale} />
    </section>
  );
}
