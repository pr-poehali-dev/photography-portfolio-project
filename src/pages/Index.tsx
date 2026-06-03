import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/1016ebb7-a0ac-4e31-a929-d8b9e7645d3c.jpg";

const photos = [
  { id: 1, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/4021305e-28de-44b0-95df-1945c53e003f.jpg" },
  { id: 2, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/e4e5e417-156e-4fd8-be15-a645d1e84f16.jpg" },
  { id: 3, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/25165711-c0fb-4914-85b1-c4de1b0d0bd3.JPG" },
  { id: 4, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/0aeb7adb-2cff-49f8-8f13-80914befb9f8.jpg" },
  { id: 5, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/6bf6c2b2-b7e5-4c80-aff4-93090d33e016.jpg" },
  { id: 6, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/304d3b15-c223-4edd-958a-810d8151f560.jpg" },
  { id: 7, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/8a783e59-fe77-475b-aaff-cb85f48196f8.jpg" },
  { id: 8, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/ba996ddd-2fc9-4e68-b9f4-3539ccf9b265.jpg" },
  { id: 9, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/545a253b-a068-40a7-a57c-ef50376bdd58.jpg" },
  { id: 10, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/7102416d-9d05-48ca-8566-36a86a0368b8.jpg" },
  { id: 11, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/82c62548-fa32-451e-bb51-a741ff8be2e5.jpg" },
  { id: 12, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/212209cc-7c50-49a7-8c71-dc43804d3168.jpg" },
  { id: 13, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/4d8c170a-5777-493c-8988-4b31f9675df6.jpg" },
];

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "Работы", href: "#works" },
  { label: "Обо мне", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const BG = "#f5f0e8";
const TEXT = "#1a1410";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "works", "about", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: BG, color: TEXT }} className="min-h-screen">
      {/* NAV */}
      <nav
        style={{ backgroundColor: BG }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-stone-200"
      >
        <a
          href="#home"
          className="font-display text-2xl tracking-[0.15em] font-light"
          style={{ color: TEXT }}
        >
          ИВАН <span className="opacity-40 text-lg">(WKIDTAG)</span>
        </a>

        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link font-body text-xs tracking-[0.2em] uppercase transition-opacity"
                style={{
                  color: TEXT,
                  opacity: activeSection === link.href.slice(1) ? 1 : 0.35,
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          style={{ color: TEXT }}
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{ backgroundColor: BG }}
          className="fixed inset-0 z-40 flex items-center justify-center"
        >
          <ul className="flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-light tracking-widest"
                  style={{ color: TEXT }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BG} 0%, ${BG}88 20%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          <p className="animate-fade-in-up delay-100 font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: TEXT, opacity: 0.5 }}>
            Автофотограф · Москва
          </p>
          <h1 className="animate-fade-in-up delay-200 font-display text-[18vw] md:text-[10vw] leading-none font-light tracking-tight" style={{ color: TEXT }}>
            WKIDTAG
          </h1>
          <p className="animate-fade-in-up delay-400 font-body text-xs tracking-[0.3em] uppercase mt-4" style={{ color: TEXT, opacity: 0.35 }}>
            2025
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={16} style={{ color: TEXT, opacity: 0.3 }} />
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-8 md:px-16 py-24">
        <div className="mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-2" style={{ color: TEXT, opacity: 0.35 }}>
            02 / Портфолио
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light" style={{ color: TEXT }}>
            Работы
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`photo-card overflow-hidden cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt="Авто"
                  className={`w-full object-cover transition-all duration-700 ${i === 0 ? "h-[65vh]" : "h-[45vh]"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-8 md:px-16 py-24 border-t border-stone-200">
        <div className="max-w-5xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-2" style={{ color: TEXT, opacity: 0.35 }}>
            03 / Обо мне
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-16" style={{ color: TEXT }}>
            Обо мне
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display text-2xl md:text-3xl font-light leading-relaxed mb-8 italic" style={{ color: TEXT, opacity: 0.85 }}>
                «Я снимаю машины — в движении, на выставках, в городе.»
              </p>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: TEXT, opacity: 0.55 }}>
                Меня зовут Иван — я автофотограф из Москвы. Снимаю автомобили на треках, в городе, на закате и на автовыставках. Каждый кадр — это характер машины, пойманный в нужный момент.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: TEXT, opacity: 0.55 }}>
                Стиль — атмосферный, детальный, с вниманием к свету и форме. Без лишнего.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "Специализация", value: "Автофотография" },
                { label: "Формат", value: "Фото, репортаж, коммерческая съёмка" },
                { label: "Работаю с", value: "2025 года" },
                { label: "Локация", value: "Москва" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-start pb-4"
                  style={{ borderBottom: "1px solid rgba(26,20,16,0.12)" }}
                >
                  <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: TEXT, opacity: 0.35 }}>
                    {item.label}
                  </span>
                  <span className="font-body text-sm text-right" style={{ color: TEXT, opacity: 0.8 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-8 md:px-16 py-24 border-t border-stone-200">
        <div className="max-w-2xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-2" style={{ color: TEXT, opacity: 0.35 }}>
            04 / Контакты
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-16" style={{ color: TEXT }}>
            Связаться
          </h2>

          <p className="font-body text-sm mb-12 leading-relaxed" style={{ color: TEXT, opacity: 0.55 }}>
            Хочешь снять своё авто или сотрудничество — пиши.
          </p>

          <div className="space-y-6">
            <a
              href="https://t.me/wkidtag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div
                className="w-12 h-12 flex items-center justify-center transition-all"
                style={{ border: "1px solid rgba(26,20,16,0.15)" }}
              >
                <Icon name="Send" size={16} style={{ color: TEXT, opacity: 0.4 }} />
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: TEXT, opacity: 0.35 }}>
                  Telegram
                </p>
                <p className="font-body text-lg" style={{ color: TEXT }}>
                  @wkidtag
                </p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="ml-auto transition-all" style={{ color: TEXT, opacity: 0.25 }} />
            </a>

            <div style={{ height: 1, backgroundColor: "rgba(26,20,16,0.08)" }} />

            <a
              href="https://instagram.com/wkidtag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div
                className="w-12 h-12 flex items-center justify-center transition-all"
                style={{ border: "1px solid rgba(26,20,16,0.15)" }}
              >
                <Icon name="Instagram" size={16} style={{ color: TEXT, opacity: 0.4 }} />
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: TEXT, opacity: 0.35 }}>
                  Instagram
                </p>
                <p className="font-body text-lg" style={{ color: TEXT }}>
                  @wkidtag
                </p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="ml-auto transition-all" style={{ color: TEXT, opacity: 0.25 }} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderTop: "1px solid rgba(26,20,16,0.08)" }}
      >
        <span className="font-display text-sm tracking-widest" style={{ color: TEXT, opacity: 0.25 }}>
          WKIDTAG
        </span>
        <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: TEXT, opacity: 0.25 }}>
          Автофотограф · 2025
        </span>
      </footer>
    </div>
  );
};

export default Index;