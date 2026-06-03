import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PLACEHOLDER_IMG = "https://cdn.poehali.dev/projects/07419fe2-c15f-4811-acad-127575893204/files/ca54b72e-64ef-4af4-b574-dd83da0afb06.jpg";

const photos = [
  { id: 1, src: PLACEHOLDER_IMG, category: "Авто" },
  { id: 2, src: PLACEHOLDER_IMG, category: "Стрит" },
  { id: 3, src: PLACEHOLDER_IMG, category: "Авто" },
  { id: 4, src: PLACEHOLDER_IMG, category: "Стрит" },
  { id: 5, src: PLACEHOLDER_IMG, category: "Авто" },
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
    <div className="bg-[#0d0d0d] min-h-screen text-white">
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
        <div className="fixed inset-0 z-40 bg-[#0d0d0d]/97 flex items-center justify-center">
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
          style={{ backgroundImage: `url(${PLACEHOLDER_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-transparent" />

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
                Снимаю авто на треках, в городе, на закате. Ловлю жизнь улиц — граффити, скейтеры, суету переулков. Стиль — контрастный, атмосферный, без лишнего.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "Специализация", value: "Авто / Стрит культура" },
                { label: "Формат", value: "Фото, репортаж, коммерческая съёмка" },
                { label: "Работаю с", value: "2020 года" },
                { label: "Локация", value: "Россия" },
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
