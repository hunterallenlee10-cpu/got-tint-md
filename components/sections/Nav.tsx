"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, MessageSquare, Phone, X } from "lucide-react";
import { Wordmark } from "../ui/Wordmark";
import { BookButton, buttonClass } from "../ui/Button";
import { business } from "@/lib/business";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#shades", label: "Shades" },
  { href: "/#work", label: "Our Work" },
  { href: "/#how", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      burgerRef.current?.focus();
    };
  }, [menu]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <Link href="/" aria-label="got tint? home" className="-ml-1 rounded-md px-1 py-2">
            <Wordmark className="text-[30px] lg:text-[34px]" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:text-lime"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={business.phone.tel}
              className="hidden items-center gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-lime md:inline-flex"
            >
              <Phone size={17} strokeWidth={1.75} className="text-lime" aria-hidden />
              {business.phone.display}
            </a>
            <span className="hidden sm:block">
              <BookButton />
            </span>
            <button
              ref={burgerRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {menu && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between">
            <Wordmark className="text-[30px]" />
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <ul className="container-x mt-6 flex-1 overflow-y-auto">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.href}
                  onClick={() => setMenu(false)}
                  className="display flex min-h-16 items-center text-[40px] text-ink active:text-lime"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <Link href="/contact" onClick={() => setMenu(false)} className="display flex min-h-16 items-center text-[40px] text-ink">
                Contact
              </Link>
            </li>
          </ul>
          <div className="container-x grid shrink-0 gap-3 pb-8 pt-6">
            <div onClickCapture={() => setMenu(false)}>
              <BookButton size="lg" className="w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={business.phone.tel} className={buttonClass("ghost", "lg")}>
                <Phone size={18} strokeWidth={1.75} aria-hidden /> Call
              </a>
              <a href={business.phone.sms} className={buttonClass("ghost", "lg")}>
                <MessageSquare size={18} strokeWidth={1.75} aria-hidden /> Text
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
