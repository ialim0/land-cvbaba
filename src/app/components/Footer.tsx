import React, { useState, useCallback } from "react";
import Link from "next/link";
import { 
  Linkedin, 
  Mail, 
  Loader2, 
  ExternalLink, 
  Github, 
  Twitter, 
  Send,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "./ui/Button";
import { Alert, AlertDescription } from "./ui/Alert";
import { Input } from "./ui/Input";
import { useTranslation } from '../i18n/i18n';
import { cn } from "./lib/utils";

export default function Footer() {
  const { t } = useTranslation('footer');
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !consent) {
      setError(t('newsletterError'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);

      const response = await fetch(process.env.NEXT_PUBLIC_NEWSLETTER as string, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.result === "success") {
        setSuccess(true);
        setEmail("");
        setConsent(false);
      } else {
        setError(result.message || t('newsletterUnexpectedError'));
      }
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setError(t('newsletterUnexpectedError'));
    } finally {
      setLoading(false);
    }
  }, [email, consent, t]);

  return (
    <footer className="relative w-full bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">
            {t('newsletterTitle')}
          </h2>
          <p className="text-xl text-slate-300">
            {t('newsletterSubtitle')}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          {success ? (
            <div className="text-center space-y-4">
              <Zap className="mx-auto h-16 w-16 text-yellow-500 animate-pulse" />
              <p className="text-2xl font-semibold text-green-400">
                {t('newsletterSuccessMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-600"
                required
              />
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-slate-300">
                  {t('newsletterConsent')}
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <span className="flex items-center justify-center">
                    {t('newsletterButton')}
                    <ArrowRight className="ml-2" />
                  </span>
                )}
              </Button>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        {[
          {
            title: t('resourcesTitle'),
            links: [
              { href: "/", label: t('resourcesLinks.home') },
              { href: "/pricing", label: t('resourcesLinks.pricing') },
              { href: "/blog", label: t('resourcesLinks.blog') },
              { href: "/contact", label: t('resourcesLinks.contact') }
            ]
          },
          {
            title: t('legalTitle'),
            links: [
              { href: "/faq", label: t('legalLinks.faq') },
              { href: "/privacy", label: t('legalLinks.privacy') },
              { href: "/terms", label: t('legalLinks.terms') }
            ]
          }
        ].map((section, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-b border-slate-700 pb-3">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors group flex items-center"
                >
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bottom with Social Icons */}
      <div className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 mb-4 md:mb-0">
            &copy; {currentYear} CVBABA. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            {[
              { icon: Linkedin, href: "https://linkedin.com/cvbaba" },
              { icon: Mail, href: "mailto:support@cvbaba.com" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}