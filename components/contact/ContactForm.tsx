"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("server_error");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <p className="font-medium text-green-800">{t("success_title")}</p>
        <p className="text-sm text-green-700 mt-1">{t("success_body")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {state === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-800 text-sm">{t("error_title")}</p>
          <p className="text-sm text-red-700 mt-0.5">{t("error_body")}</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
          {t("name_label")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t("name_placeholder")}
          className="px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
          {t("email_label")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("email_placeholder")}
          className="px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">
          {t("message_label")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("message_placeholder")}
          className="px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
