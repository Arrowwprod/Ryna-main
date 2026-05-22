import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Send } from "lucide-react";
import footerBgImage from "@/assets/footer  image/abderrahmane-meftah-ZI0nhVLpAKY-unsplash.jpg";

const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a bit more").max(2000),
});

export function Contact() {
  const [waitEmail, setWaitEmail] = useState("");
  const [waitLoading, setWaitLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({ email: waitEmail });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setWaitLoading(true);
    const { error } = await supabase.from("waitlist").insert({ email: parsed.data.email });
    setWaitLoading(false);
    if (error) {
      toast.error("Could not join waitlist. Please try again.");
      return;
    }
    setWaitEmail("");
    toast.success("You're on the list! We'll be in touch.");
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      country: parsed.data.country || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    setForm({ name: "", email: "", phone: "", country: "", message: "" });
    toast.success("Message sent. We'll respond shortly.");
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
            {/* Waitlist */}
            <form
              onSubmit={joinWaitlist}
              className="lg:col-span-2 glass-liquid rounded-3xl p-8 flex flex-col"
            >
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

            {/* Contact form */}
            <form onSubmit={submitContact} className="lg:col-span-3 glass-liquid rounded-3xl p-8">
              <h3 className="font-display text-2xl">Send us a message</h3>
              <p className="mt-1 text-sm text-foreground/75 font-body leading-relaxed">
                Tell us your goals — we'll outline next steps.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <Field
                  label="Phone (optional)"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Field
                  label="Country of Interest"
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
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
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
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full glass-input px-4 py-3 text-sm"
      />
    </div>
  );
}
