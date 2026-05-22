import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Mail, Send } from "lucide-react";
import footerBgImage from "@/assets/footer  image/abderrahmane-meftah-ZI0nhVLpAKY-unsplash.jpg";

/**
 * Submits a form to Netlify Forms via AJAX (fetch).
 * Netlify auto-detects forms with data-netlify="true" during the deploy crawl.
 * The hidden "form-name" field tells Netlify which form is being submitted.
 */
async function submitToNetlify(formName: string, data: Record<string, string>) {
  const body = new URLSearchParams({ "form-name": formName, ...data });
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error("Network error");
}

export function Contact() {
  const [waitEmail, setWaitEmail] = useState("");
  const [waitLoading, setWaitLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = waitEmail.trim();
    if (!trimmed) {
      toast.error("Enter a valid email");
      return;
    }
    setWaitLoading(true);
    try {
      await submitToNetlify("waitlist", { email: trimmed });
      setWaitEmail("");
      toast.success("You're on the list! We'll be in touch.");
    } catch {
      toast.error("Could not join waitlist. Please try again.");
    } finally {
      setWaitLoading(false);
    }
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Enter a valid email");
      return;
    }
    if (form.message.trim().length < 5) {
      toast.error("Tell us a bit more");
      return;
    }
    setLoading(true);
    try {
      await submitToNetlify("contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        message: form.message.trim(),
      });
      setForm({ name: "", email: "", phone: "", country: "", message: "" });
      toast.success("Message sent. We'll respond shortly.");
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6">
      {/* Continuous Grounded background image spanning Contact and Footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        }}
      >
        <motion.img
          src={footerBgImage}
          className="absolute inset-0 h-[125%] w-full object-cover"
          style={{
            y: reduceMotion ? undefined : bgY,
            objectPosition: "center -10%",
            opacity: 0.75,
            willChange: "transform",
          }}
        />
        {/* Warm sunset/amber tint overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,150,60,0.06) 60%, rgba(255,110,40,0.1) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-mint">Write Us</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            Begin your <span className="italic text-gradient-mint">runway</span>.
          </h2>
          <p className="mt-4 text-foreground/70">
            Join our waitlist for updates, or send a detailed inquiry — we respond personally within
            24 hours.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Decorative glowing refraction blobs behind glass cards */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-sky/40 to-mint/25 blur-[100px] pointer-events-none opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-sunset/45 to-coral/30 blur-[110px] pointer-events-none opacity-20" />

          <div className="relative z-10 grid lg:grid-cols-5 gap-6">
            {/* Waitlist — Netlify Form */}
            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={joinWaitlist}
              className="lg:col-span-2 glass-liquid rounded-3xl p-8 flex flex-col"
            >
              {/* Hidden fields for Netlify detection */}
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gradient-mint)] text-primary-foreground">
                <Mail size={20} />
              </div>
              <h3 className="mt-6 font-display text-2xl">Email Waitlist</h3>
              <p className="mt-2 text-sm text-foreground/75 font-body leading-relaxed">
                Get early access to scholarship updates, intake openings & visa tips — once a month,
                no spam.
              </p>
              <div className="mt-auto pt-8">
                <input
                  type="email"
                  name="email"
                  required
                  value={waitEmail}
                  onChange={(e) => setWaitEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full glass-input px-5 py-3.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={waitLoading}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-mint px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
                >
                  {waitLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                  Join Waitlist
                </button>
              </div>
            </form>

            {/* Contact form — Netlify Form */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submitContact}
              className="lg:col-span-3 glass-liquid rounded-3xl p-8"
            >
              {/* Hidden fields for Netlify detection */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <h3 className="font-display text-2xl">Send us a message</h3>
              <p className="mt-1 text-sm text-foreground/75 font-body leading-relaxed">
                Tell us your goals — we'll outline next steps.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Field
                  label="Country of Interest"
                  name="country"
                  value={form.country}
                  onChange={(v) => setForm({ ...form, country: v })}
                  placeholder="e.g. Germany, Italy"
                />
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-foreground/75 font-semibold">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your academic background and goals..."
                  className="mt-2 w-full rounded-2xl glass-input px-4 py-3 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-foreground/75 font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full glass-input px-4 py-3 text-sm"
      />
    </div>
  );
}
