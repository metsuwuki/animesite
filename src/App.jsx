import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";

const metrics = [
    { title: "24/7", text: "модерация и анти-рейд защита" },
    { title: "Voice", text: "каналы для пати, chill и кино" },
    { title: "Roles", text: "авто-роли по играм и интересам" },
    { title: "Events", text: "регулярные активности и конкурсы" }
];

const features = [
    {
        title: "🎮 Gaming Rooms",
        text: "Текстовые и голосовые каналы под разные жанры и командную игру."
    },
    {
        title: "🌐 Community",
        text: "Живой общий чат, где легко найти тиммейтов и друзей по интересам."
    },
    {
        title: "🤖 Automation",
        text: "Боты для модерации, ролей, уведомлений и полезных команд."
    },
    {
        title: "🏆 Events",
        text: "Ивенты, мини-турниры и совместные активности внутри комьюнити."
    }
];

const guide = [
    {
        title: "📒 INFO",
        items: ["Info — базовая информация", "Ideas — предложения по развитию", "Bots — команды и обратная связь"]
    },
    {
        title: "🌐 COMMUNITY",
        items: ["General — общий чат", "Auto-Roles — выбор ролей", "Media — клипы и лучшие моменты"]
    },
    {
        title: "🎧 VOICE",
        items: ["No-Micro — без микрофона", "General 64kbps — стандарт", "General 128kbps — high quality"]
    },
    {
        title: "😴 AFK & PRIVATE",
        items: ["AFK — когда отошёл", "Create — создание приватного канала", "Edit — настройка приватного канала"]
    }
];

const revealUp = {
    initial: { opacity: 0, y: 56, scale: 0.92 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1.08, ease: [0.16, 1, 0.3, 1] }
};

const buttonMotion = {
    whileHover: { y: -4, scale: 1.045 },
    whileTap: { y: 0, scale: 0.985 },
    transition: { type: "spring", stiffness: 280, damping: 22 }
};

function App() {
    const [brandSrc, setBrandSrc] = useState("/anime.png");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            wheelMultiplier: 0.85,
            lerp: 0.08,
            duration: 1.2
        });

        let rafId = 0;

        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 26,
        mass: 0.25
    });

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        setIsScrolled(latest > 0.012);
    });

    const backgroundY = useTransform(smoothProgress, [0, 1], [0, -360]);
    const heroY = useTransform(smoothProgress, [0, 0.35], [0, -180]);
    const heroScale = useTransform(smoothProgress, [0, 0.36], [1, 0.8]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.36], [1, 0.38]);
    const mediaY = useTransform(smoothProgress, [0, 0.75], [0, -220]);
    const scrollLine = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    const metricsY = useTransform(smoothProgress, [0.08, 0.42], [120, -20]);
    const metricsOpacity = useTransform(smoothProgress, [0.08, 0.2], [0.25, 1]);
    const aboutY = useTransform(smoothProgress, [0.18, 0.56], [132, -24]);
    const featuresY = useTransform(smoothProgress, [0.28, 0.7], [142, -28]);
    const guideY = useTransform(smoothProgress, [0.42, 0.9], [150, -30]);
    const ctaY = useTransform(smoothProgress, [0.58, 1], [130, -14]);

    return (
        <div className="app-shell" id="top">
            <motion.div className="bg-stage" style={{ y: backgroundY }} aria-hidden="true">
                <span className="orb orb-1"></span>
                <span className="orb orb-2"></span>
                <span className="orb orb-3"></span>
                <span className="prism-mist prism-mist-1"></span>
                <span className="prism-mist prism-mist-2"></span>
                <span className="prism-mist prism-mist-3"></span>
                <span className="beam beam-1"></span>
                <span className="beam beam-2"></span>
                <span className="beam beam-3"></span>
                <span className="grid-layer"></span>
                <span className="grain-layer"></span>
            </motion.div>

            <div className="scroll-line" aria-hidden="true">
                <motion.span style={{ height: scrollLine }}></motion.span>
            </div>

            <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
                <div className="container nav-row">
                    <a href="#top" className="brand" aria-label="Metsuki home">
                        <span className="brand-mark">
                            <img
                                src={brandSrc}
                                alt="Metsuki brand"
                                loading="eager"
                                onError={() => setBrandSrc("/metsuki-brand.svg")}
                            />
                        </span>
                        <span className="brand-text">
                            <strong>Metsuki</strong>
                            <small>Discord community</small>
                        </span>
                    </a>

                    <nav className="nav-links" aria-label="Main navigation">
                        <a href="#about">About</a>
                        <a href="#features">Features</a>
                        <a href="#guide">Guide</a>
                    </nav>

                    <motion.a
                        {...buttonMotion}
                        href="https://discord.gg/ZZyBZytaWT"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-terr nav-cta"
                    >
                        <span>Join Discord</span>
                    </motion.a>
                </div>
            </header>

            <main>
                <section className="hero-pin">
                    <motion.div className="container hero" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
                        <motion.div className="hero-copy" {...revealUp}>
                            <p className="eyebrow">Gaming • Anime • Chill • Community</p>
                            <h1>
                                Сервер, где <span>приятная атмосфера</span>
                                важнее токсичности
                            </h1>
                            <p className="hero-lead">
                                Профильная площадка для игр, общения и ивентов. Нормальная модерация, живые люди,
                                удобная структура каналов и минимум хаоса.
                            </p>

                            <div className="hero-chips" aria-label="Сильные стороны сервера">
                                <span>🟢 Open invites</span>
                                <span>🎙 Daily voice online</span>
                                <span>🛡 Safe & friendly vibe</span>
                            </div>

                            <div className="hero-actions">
                                <motion.a
                                    {...buttonMotion}
                                    href="https://discord.gg/ZZyBZytaWT"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-terr"
                                >
                                    <span>Перейти в сервер</span>
                                </motion.a>
                                <motion.a {...buttonMotion} href="#intro" className="btn btn-ghost">
                                    <span>Смотреть интро</span>
                                </motion.a>
                            </div>

                            <ul className="hero-points">
                                <li>Дружелюбное комьюнити без драм</li>
                                <li>Авто-роли и боты для удобства</li>
                                <li>Голосовые комнаты 64/128 kbps</li>
                            </ul>
                        </motion.div>

                        <motion.aside className="hero-media glass" id="intro" style={{ y: mediaY }} {...revealUp}>
                            <div className="media-head">
                                <span className="media-dot"></span>
                                <span className="media-dot"></span>
                                <span className="media-dot"></span>
                                <p>server-intro.mp4</p>
                            </div>
                            <div className="media-body">
                                <video width="720" height="1280" controls playsInline preload="metadata">
                                    <source src="/assets/video/intro.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <p className="media-note">Короткое видео с атмосферой сервера и основными каналами.</p>
                        </motion.aside>
                    </motion.div>
                </section>

                <motion.section className="container metric-grid" style={{ y: metricsY, opacity: metricsOpacity }}>
                    {metrics.map((item, index) => (
                        <motion.article
                            className="metric-card glass"
                            key={item.title}
                            initial={{ opacity: 0, y: 60, scale: 0.88 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -9, scale: 1.024 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.article>
                    ))}
                </motion.section>

                <motion.section className="container section split" id="about" style={{ y: aboutY }}>
                    <motion.div className="section-title" {...revealUp}>
                        <p className="section-kicker">About</p>
                        <h2>Что делает сервер удобным</h2>
                        <p>
                            Мы держим фокус на комфорте: понятные каналы, быстрый онбординг, активная поддержка и
                            нормальные правила для общения.
                        </p>
                    </motion.div>

                    <motion.div className="rules-card glass" {...revealUp}>
                        <div className="rules-head">
                            <span></span>
                            <p>server.rules.ts</p>
                        </div>
                        <pre>{`export const ServerRules = {
  friendliness: "Respect everyone",
  toxicity: "No toxic behavior",
  conflicts: "No escalation",
  support: "Help new members"
};

export function joinServer(user) {
  if (!user.acceptedRules) {
    throw new Error("Rules required");
  }
  return "Welcome to Metsuki";
}`}</pre>
                    </motion.div>
                </motion.section>

                <motion.section className="container section" id="features" style={{ y: featuresY }}>
                    <motion.div className="section-title" {...revealUp}>
                        <p className="section-kicker">Features</p>
                        <h2>Основные направления</h2>
                    </motion.div>

                    <div className="feature-grid">
                        {features.map((item, index) => (
                            <motion.article
                                className="feature-card glass"
                                key={item.title}
                                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                whileHover={{ y: -10, scale: 1.026 }}
                                viewport={{ once: true, amount: 0.24 }}
                                transition={{ duration: 0.98, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </motion.article>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="container section" id="guide" style={{ y: guideY }}>
                    <motion.div className="section-title" {...revealUp}>
                        <p className="section-kicker">Server Guide</p>
                        <h2>Карта каналов</h2>
                    </motion.div>

                    <div className="guide-grid">
                        {guide.map((column, index) => (
                            <motion.article
                                className="guide-card glass"
                                key={column.title}
                                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                whileHover={{ y: -10, scale: 1.026 }}
                                viewport={{ once: true, amount: 0.24 }}
                                transition={{ duration: 0.99, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
                            >
                                <h3>{column.title}</h3>
                                <ul>
                                    {column.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </motion.article>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="container section" style={{ y: ctaY }}>
                    <motion.div className="cta-card" {...revealUp}>
                        <h2>Готов(а) зайти?</h2>
                        <p>Подключайтесь к серверу и сразу выбирайте роли, чтобы получать нужные уведомления.</p>
                        <motion.a
                            {...buttonMotion}
                            href="https://discord.gg/ZZyBZytaWT"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-terr"
                        >
                            <span>Join Metsuki Discord</span>
                        </motion.a>
                    </motion.div>
                </motion.section>
            </main>

            <footer className="site-footer">
                <div className="container footer-row">
                    <p>© 2026 Metsuki</p>
                    <div className="footer-links">
                        <a href="https://github.com/metsuwuki" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                        <a href="https://discord.gg/ZZyBZytaWT" target="_blank" rel="noreferrer">
                            Discord
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;