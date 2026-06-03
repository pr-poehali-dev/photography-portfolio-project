import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/0aeb7adb-2cff-49f8-8f13-80914befb9f8.jpg";

const photos = [
  { id: 1, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/4021305e-28de-44b0-95df-1945c53e003f.jpg", category: "Авто" },
  { id: 2, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/e4e5e417-156e-4fd8-be15-a645d1e84f16.jpg", category: "Авто" },
  { id: 3, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/545a253b-a068-40a7-a57c-ef50376bdd58.jpg", category: "Стрит" },
  { id: 4, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/25165711-c0fb-4914-85b1-c4de1b0d0bd3.JPG", category: "Авто" },
  { id: 5, src: "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/bucket/0aeb7adb-2cff-49f8-8f13-80914befb9f8.jpg", category: "Стрит" },
];

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "Работы", href: "#works" },
  { label: "Обо мне", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"Все" | "Авто" | "Стрит">("Все");
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

  const filteredPhotos =
    filter === "Все" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="bg-[#100c07] min-h-screen text-[#ede4d8]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <a
          href="#home"
          className="font-display text-2xl tracking-[0.15em] text-white font-light"
        >
          WKIDTAG
        </a>

        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link font-body text-xs tracking-[0.2em] uppercase transition-opacity ${
                  activeSection === link.href.slice(1)
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#100c07]/97 flex items-center justify-center">
          <ul className="flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-light tracking-widest text-white"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#100c07] via-[#100c07]/50 to-transparent" />

        <div className="relative z-10">
          <p className="animate-fade-in-up delay-100 font-body text-xs tracking-[0.4em] uppercase text-white/50 mb-4">
            Фотограф · Авто & Стрит культура
          </p>
          <h1 className="animate-fade-in-up delay-200 font-display text-[18vw] md:text-[10vw] leading-none font-light tracking-tight text-white">
            WKIDTAG
          </h1>
          <p className="animate-fade-in-up delay-400 font-body text-xs tracking-[0.3em] uppercase text-white/40 mt-4">
            2024
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={16} className="text-white/30" />
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-8 md:px-16 py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-white/30 mb-2">
              02 / Портфолио
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-light text-white">
              Работы
            </h2>
          </div>

          <div className="flex gap-1">
            {(["Все", "Авто", "Стрит"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 font-body text-xs tracking-[0.2em] uppercase border transition-all ${
                  filter === f
                    ? "border-white text-white"
                    : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className={`photo-card overflow-hidden cursor-pointer ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.category}
                  className={`w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ${
                    i === 0 ? "h-[60vh]" : "h-[45vh]"
                  }`}
                />
                <span className="absolute bottom-4 left-4 font-body text-xs tracking-[0.25em] uppercase text-white/60">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-8 md:px-16 py-24 border-t border-white/5">
        <div className="max-w-5xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-white/30 mb-2">
            03 / Обо мне
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-16 text-white">
            Обо мне
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-8 italic">
                «Я снимаю то, что движется — машины, улицы, людей в потоке города.»
              </p>
              <p className="font-body text-sm leading-relaxed text-white/50 mb-6">
                Меня зовут Wkidtag — я фотограф, влюблённый в автомобильную и стрит культуру. Каждый кадр для меня — это момент, который живёт между движением и остановкой.
              </p>
              <p className="font-body text-sm leading-relaxed text-white/50">
                Снимаю авто на треках, в городе, на закате и на автовыставках. Ловлю жизнь улиц — граффити, скейтеры, суету переулков. Стиль — контрастный, атмосферный, без лишнего.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "Специализация", value: "Авто / Стрит культура" },
                { label: "Формат", value: "Фото, репортаж, коммерческая съёмка" },
                { label: "Работаю с", value: "2025 года" },
                { label: "Локация", value: "Москва" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-start border-b border-white/10 pb-4"
                >
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-white/30">
                    {item.label}
                  </span>
                  <span className="font-body text-sm text-white/80 text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-8 md:px-16 py-24 border-t border-white/5">
        <div className="max-w-2xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-white/30 mb-2">
            04 / Контакты
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-16 text-white">
            Связаться
          </h2>

          <p className="font-body text-sm text-white/50 mb-12 leading-relaxed">
            Если хочешь снять авто, коллаборацию или просто поговорить о стрите — пиши.
          </p>

          <div className="space-y-6">
            <a
              href="https://t.me/wkidtag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/50 transition-all">
                <Icon name="Send" size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-white/30 mb-1">
                  Telegram
                </p>
                <p className="font-body text-lg text-white/80 group-hover:text-white transition-colors">
                  @wkidtag
                </p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="ml-auto text-white/20 group-hover:text-white/60 transition-all" />
            </a>

            <div className="h-px bg-white/5" />

            <a
              href="https://instagram.com/wkidtag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/50 transition-all">
                <Icon name="Instagram" size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-white/30 mb-1">
                  Instagram
                </p>
                <p className="font-body text-lg text-white/80 group-hover:text-white transition-colors">
                  @wkidtag
                </p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="ml-auto text-white/20 group-hover:text-white/60 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-display text-sm text-white/20 tracking-widest">
          WKIDTAG
        </span>
        <span className="font-body text-xs text-white/20 tracking-[0.2em] uppercase">
          Фотограф · 2024
        </span>
      </footer>
    </div>
  );
};

export default Index;