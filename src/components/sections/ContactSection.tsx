import { Github, Linkedin, Send, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ContactSection = () => {
    const { t } = useLanguage();

    const channels = [
        { href: 'mailto:herreraceciliajorgeluis@gmail.com', icon: Mail, label: 'herreraceciliajorgeluis@gmail.com' },
        { href: 'https://github.com/Jorge-Luis-Herrera', icon: Github, label: 'github.com/Jorge-Luis-Herrera' },
        { href: 'https://linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://t.me/Jorge_Lhc', icon: Send, label: 'Telegram' },
        { href: 'https://wa.me/5350722776', icon: MessageCircle, label: 'WhatsApp' },
    ];

    return (
        <footer id="contact" className="scroll-mt-20 py-20 sm:py-28 border-t border-line bg-surface-2/40">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="max-w-2xl">
                    <h2 className="section-title">{t('contact.title')}</h2>
                    <p className="mt-3 text-muted leading-relaxed">{t('contact.description')}</p>
                </div>

                <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {channels.map(({ href, icon: Icon, label }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-line hover:border-accent/40 transition-colors group"
                            >
                                <Icon className="w-4 h-4 text-accent shrink-0" />
                                <span className="text-sm text-muted group-hover:text-ink transition-colors truncate">{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="mt-14 pt-6 border-t border-line text-xs font-mono text-muted/70">
                    {t('footer.copy')}
                </p>
            </div>
        </footer>
    );
};
