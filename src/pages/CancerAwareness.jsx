import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Bg from "../assets/back.png";

export default function CancerAwareness() {
  const [quote, setQuote] = useState({ content: "Loading...", author: "" });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [visible, setVisible] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    fetchQuote();
    const interval = setInterval(fetchQuote, 10000);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  async function fetchQuote() {
    try {
      setVisible(false);
      setLoading(true);

      const res = await axios.get("https://dummyjson.com/quotes");
      const quotes = res?.data?.quotes;

      if (!Array.isArray(quotes) || quotes.length === 0) throw new Error();

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      await new Promise((r) => setTimeout(r, 200));
      if (!mountedRef.current) return;

      setQuote({
        content: randomQuote.quote || "",
        author: randomQuote.author || "Unknown",
      });

      setVisible(true);
    } catch {
      if (mountedRef.current) setQuote({ content: "Could not load quote.", author: "" });
      setVisible(true);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Thank you, ${form.name || "friend"}.`);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/25"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-sm uppercase tracking-wider opacity-90">Cancer Awareness & Support</p>

            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              We stand together — bring hope, spread awareness.
            </h1>

            <p className="mt-4 text-base opacity-90 max-w-lg">
              Providing support, care and knowledge to patients and families.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="px-4 py-2 rounded-md bg-pink-600 text-white font-medium hover:bg-pink-700 transition">Contact</a>
              <a href="#learn" className="px-4 py-2 rounded-md border border-white/25 text-white bg-white/5 hover:bg-white/10 transition">Learn</a>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-xl p-6 bg-white/10 backdrop-blur-md border border-white/10 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/60"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/60"
                  />
                </div>

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/60"
                />

                <button type="submit" className="px-4 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition w-full">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MOBILE: show quote above content */}
          <div className="block lg:hidden">
            <article className="p-6 rounded-xl bg-white border shadow-sm mb-6">
              <h3 className="text-lg font-semibold">Quote of the Moment</h3>
              <div className={`mt-3 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
                <p className="text-lg italic text-slate-700">“{quote.content}”</p>
                <p className="mt-2 text-sm font-medium text-slate-600">— {quote.author || "Unknown"}</p>
              </div>
              {loading && (
                <svg className="w-7 h-7 mt-4 animate-spin text-pink-600" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              )}
            </article>
          </div>

          {/* ABOUT (Left on desktop, main content on mobile) */}
          <section className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <article className="p-6 rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-semibold">About</h2>

              <p className="mt-3 text-slate-600">
                Cancer impacts millions worldwide. Our mission is to empower
                individuals through guidance, support systems and proper
                information regarding screening and care.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-pink-50 border">
                  <h4 className="font-medium">Screening</h4>
                  <p className="text-sm mt-2 text-slate-600">Early detection guides.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border">
                  <h4 className="font-medium">Support</h4>
                  <p className="text-sm mt-2 text-slate-600">Counseling & groups.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border">
                  <h4 className="font-medium">Aid</h4>
                  <p className="text-sm mt-2 text-slate-600">Financial resources.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border">
                  <h4 className="font-medium">Volunteer</h4>
                  <p className="text-sm mt-2 text-slate-600">Community involvement.</p>
                </div>
              </div>
            </article>

            
          </section>

          {/* DESKTOP: quotes on the right */}
          <aside className="hidden lg:block order-1 lg:order-2">
            <article className="p-6 rounded-xl bg-white border shadow-sm">
              <h3 className="text-lg font-semibold">Quote of the Moment</h3>

              <div className={`mt-3 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
                <p className="text-lg italic text-slate-700">“{quote.content}”</p>
                <p className="mt-2 text-sm font-medium text-slate-600">— {quote.author || "Unknown"}</p>
              </div>

              {loading && (
                <svg className="w-7 h-7 mt-4 animate-spin text-pink-600" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              )}
            </article>
          </aside>

        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-slate-500 py-6">
        © {new Date().getFullYear()} Cancer Awareness & Support
      </footer>
    </div>
  );
}
