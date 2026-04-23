"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface Field {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}

interface AuthFormCardProps {
  title: string;
  description: string;
  fields: Field[];
  submitLabel: string;
  submitTo?: string;
  footerLinks?: { label: string; href: string }[];
}

export function AuthFormCard({
  title,
  description,
  fields,
  submitLabel,
  submitTo,
  footerLinks,
}: AuthFormCardProps) {
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitTo) router.push(submitTo);
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-[#ddd6cb] bg-white p-8 shadow-[0_18px_30px_rgba(20,16,12,0.06)]">
      <h1 className="text-[44px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h1>
      <p className="mt-2 text-[#6a6258]">{description}</p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2">
            <span className="text-sm font-medium text-[#3f3931]">{field.label}</span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-[#d9d2c8] bg-[#faf8f5] px-4 py-3 text-sm text-[#111111] placeholder:text-[#a59d92] outline-none focus:border-[#a38f76]"
            />
          </label>
        ))}
        <PrimaryButton type="submit" className="w-full py-3.5">
          {submitLabel}
        </PrimaryButton>
      </form>

      {footerLinks?.length ? (
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#6a6258]">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
