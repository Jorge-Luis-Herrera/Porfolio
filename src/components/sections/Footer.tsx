import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Send,
    MessageCircle,
    Mail,
    ArrowUp,
    FileText,
    ScrollText,
    Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Signature } from '../ui/Signature';

export const Footer = () => {
    const { t, language } = useLanguage();

    const base = import.meta.env.BASE_URL;
    const cvHref = `${base}${language === 'es' ? 'cv.html' : 'cv-en.html'}`;
    const coverHref = `${base}${language === 'es' ? 'cover-letter.html' : 'cover-letter-en.html'}`;

    const navigation = [
        { label: t('nav.home'), href: '#home' },
        { label: t('nav.projects'), href: '#projects' },
        { label: t('nav.skills'), href: '#skills' },
        { label: t('nav.about'), href: '#about' },
    ];

    const contact = [
        {
            label: 'herreraceciliajorgeluis@gmail.com',
            href: 'mailto:herreraceciliajorgeluis@gmail.com',
            icon: Mail,
            external: false,
        },
        {
            label: 'WhatsApp · +53 5072 2776',
            href: 'https://wa.me/5350722776',
            icon: MessageCircle,
            external: true,
        },
        {
            label: 'Telegram · @Jorge_Lhc',
            href: 'https://t.me/Jorge_Lhc',
            icon: Send,
            external: true,
        },
        {
            label: 'LinkedIn · Jorge Luis Herrera Cecilia',
            href: 'https://www.linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/',
            icon: Linkedin,
            external: true,
        },
        {
            label: 'GitHub · Jorge-Luis-Herrera',
            href: 'https://github.com/Jorge-Luis-Herrera',
            icon: Github,
            external: true,
        },
    ];

    const resources = [
        { label: t('footer.link.cv'), href: cvHref, icon: FileText, external: true },
        { label: t('footer.link.cover'), href: coverHref, icon: ScrollText, external: true },
        { label: t('footer.link.repos'), href: 'https://github.com/Jorge-Luis-Herrera?tab=repositories', icon: Github, external: true },
    ];

    return (
        <footer id="contact" className="scroll-mt-20 border-t border-line bg-surface-2/40">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* CTA */}
                <div className="py-16 sm:py-20 border-b border-line">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <span className="chip mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            {t('footer.availability')}
                        </span>
                        <h2 className="section-title">{t('contact.title')}</h2>
                        <p className="mt-3 text-muted leading-relaxed">{t('contact.description')}</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="mailto:herreraceciliajorgeluis@gmail.com"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-strong transition-colors shadow-sm"
                            >
                                <Mail className="w-4 h-4" />
                                {t('footer.cta.email')}
                            </a>
                            <a
                                href="https://wa.me/5350722776"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Columns */}
                <div className="py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Signature />
                        <p className="mt-5 text-sm text-muted leading-relaxed max-w-xs">
                            {t('footer.about')}
                        </p>
                    </div>

                    <nav aria-label={t('footer.nav.title')}>
                        <h3 className="font-display text-sm font-medium text-ink mb-4">
                            {t('footer.nav.title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="text-sm text-muted hover:text-accent transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h3 className="font-display text-sm font-medium text-ink mb-4">
                            {t('footer.contact.title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {contact.map(({ label, href, icon: Icon, external }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noopener noreferrer' : undefined}
                                        className="group inline-flex items-start gap-2 text-sm text-muted hover:text-accent transition-colors"
                                    >
                                        <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span className="break-all">{label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-display text-sm font-medium text-ink mb-4">
                            {t('footer.resources.title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {resources.map(({ label, href, icon: Icon, external }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noopener noreferrer' : undefined}
                                        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                                    >
                                        <Icon className="w-4 h-4 shrink-0" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-mono text-muted/80 text-center sm:text-left">
                        {t('footer.signatureLine')}
                    </p>
                    <a
                        href="#home"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted border border-line bg-surface hover:text-accent hover:border-accent/40 transition-colors"
                    >
                        <ArrowUp className="w-3.5 h-3.5" />
                        {t('footer.link.top')}
                    </a>
                </div>
            </div>
        </footer>
    );
};
