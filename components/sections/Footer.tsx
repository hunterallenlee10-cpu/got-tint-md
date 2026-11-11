import Link from "next/link";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Wordmark } from "../ui/Wordmark";
import { FacebookIcon, InstagramIcon } from "../ui/SocialIcons";
import { business, mapsUrl } from "@/lib/business";

const services = ["Auto: cars, trucks, SUVs", "Residential", "Commercial", "Marine"];

const linkCls = "inline-flex min-h-11 items-center gap-2.5 text-ink/85 transition-colors hover:text-lime";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#050607] pb-28 pt-16 lg:pb-12 lg:pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[56px]" />
            <p className="mt-3 text-muted">Come to us or we come to you.</p>
            <a
              href={business.phone.tel}
              className="display mt-6 block text-[44px] leading-none text-ink transition-colors hover:text-lime"
            >
              {business.phone.display}
            </a>
            <p className="mt-2 text-sm text-muted">
              Call or text. Also: <a href={business.phone2.tel} className="text-ink hover:text-lime">{business.phone2.display}</a>
            </p>
            <div className="mt-6 flex gap-2">
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Got Tint on Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-lime hover:text-lime">
                <FacebookIcon size={19} />
              </a>
              {/* DRAFT: confirm Instagram link (@gottint_ from his cards) */}
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Got Tint on Instagram (link to confirm)" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-lime hover:text-lime">
                <InstagramIcon size={19} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Reach us</h3>
            <ul className="space-y-1">
              <li><a href={business.phone.sms} className={linkCls}><MessageSquare size={17} strokeWidth={1.75} className="text-lime" aria-hidden />Text {business.phone.display}</a></li>
              <li><a href={business.phone.tel} className={linkCls}><Phone size={17} strokeWidth={1.75} className="text-lime" aria-hidden />Call {business.phone.display}</a></li>
              <li><a href={`mailto:${business.email}`} className={linkCls}><Mail size={17} strokeWidth={1.75} className="text-lime" aria-hidden />{business.email}</a></li>
              <li><Link href="/contact" className={linkCls}>Contact page</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">The shop</h3>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 text-ink/85 transition-colors hover:text-lime">
              <MapPin size={17} strokeWidth={1.75} className="mt-1 shrink-0 text-lime" aria-hidden />
              <span>
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state} {business.address.zip}
              </span>
            </a>
            <p className="mt-4 flex gap-2.5 text-ink/85">
              <Clock size={17} strokeWidth={1.75} className="mt-1 shrink-0 text-lime" aria-hidden />
              <span>{business.hours.label}</span>
            </p>
            <p className="mt-4 text-sm text-muted">Serving Maryland, DC and Virginia</p>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Services</h3>
            <ul className="space-y-3 text-ink/85">
              {services.map((s) => (
                <li key={s}>
                  <a href="/#services" className="hover:text-lime">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Got Tint?</p>
          <p>Concept preview by Lee Enterprises Unlimited.</p>
        </div>
      </div>
    </footer>
  );
}
