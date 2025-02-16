"use client";

import React, { useState } from "react";
import { Mail, Clock, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription } from "../components/ui/Alert";
import Footer from "../components/Footer";
import Textarea from "../components/ui/Textarea";
import { Input } from "../components/ui/Input";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/i18n";

const CONTACT_EMAIL = "support@cvbaba.com";

interface ContactHeaderProps {
  t: (key: string, options?: { [key: string]: string }) => string;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ t }) => (
  <header className="w-full px-4 sm:px-6 lg:px-8 mx-auto text-center py-8 sm:py-12 lg:py-16">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6">
      {t('contact.header.title')}
    </h2>
    <p className="text-lg sm:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-gray-200 px-4">
      {t('contact.header.subtitle')}
    </p>
  </header>
);

interface ContactInfoProps {
  t: (key: string, options?: { [key: string]: string }) => string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ t }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-6 sm:mb-8">
    {[
      {
        icon: Mail,
        title: t('contact.info.email.title'),
        content: t('contact.info.email.content'),
        href: `mailto:${CONTACT_EMAIL}`,
      },
      {
        icon: Clock,
        title: t('contact.info.officeHours.title'),
        content: t('contact.info.officeHours.content'),
      },
    ].map(({ icon: Icon, title, content, href }) => (
      <Card
        key={title}
        className="bg-gray-700 border-gray-600 hover:shadow-lg transition-shadow"
      >
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="mb-3 sm:mb-4 flex justify-center">
            <div className="p-2 sm:p-3 bg-blue-500/20 rounded-full">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h3>
          {href ? (
            <a
              href={href}
              className="text-sm sm:text-base text-blue-300 hover:text-blue-400 transition-colors"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {content}
            </a>
          ) : (
            <p className="text-sm sm:text-base text-gray-200">{content}</p>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

interface ContactFormProps {
  t: (key: string, options?: { [key: string]: string | boolean }) => string | object;
}

const ContactForm: React.FC<ContactFormProps> = ({ t }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    const { name, email, subject, message } = formState;

    if (!name) {
      setFormError(t('contact.form.errors.name') as string);
      setIsLoading(false);
      return;
    }
    if (!email || !isValidEmail(email)) {
      setFormError(t('contact.form.errors.email') as string);
      setIsLoading(false);
      return;
    }
    if (!subject) {
      setFormError(t('contact.form.errors.subject') as string);
      setIsLoading(false);
      return;
    }
    if (!message) {
      setFormError(t('contact.form.errors.message') as string);
      setIsLoading(false);
      return;
    }

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("subject", subject);
    formDataToSend.append("message", message);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT as string, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.text();
      const jsonResult = JSON.parse(result);

      if (jsonResult.result === "success") {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormError(t('contact.form.errors.generic') as string);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(t('contact.form.errors.generic') as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      subject: e.target.value,
    }));
  };

  return (
    <Card className="mx-4 sm:mx-6 lg:mx-8 mb-8 sm:mb-12 max-w-4xl lg:mx-auto shadow-none border-none">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {t('contact.form.title') as string}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {isSubmitted ? (
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="mb-4 flex justify-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Send className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t('contact.form.success.title') as string}
            </h3>
            <p className="text-lg sm:text-xl text-gray-700">
              {t('contact.form.success.message') as string}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact.form.fields.name') as string}
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full py-2 sm:py-4 px-4 sm:px-6 text-base sm:text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('contact.form.placeholders.name') as string}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact.form.fields.email') as string}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full py-2 sm:py-4 px-4 sm:px-6 text-base sm:text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('contact.form.placeholders.email') as string}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact.form.fields.subject') as string}
              </label>
              <select
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleSubjectChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2 sm:p-3 text-base sm:text-lg focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  {t('contact.form.placeholders.subject') as string}
                </option>
                {(t('contact.form.subjects', { returnObjects: true }) as unknown as { value: string; label: string }[]).map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contact.form.fields.message') as string}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full h-32 sm:h-48 py-2 sm:py-4 px-4 sm:px-6 text-base sm:text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('contact.form.placeholders.message') as string}
              />
            </div>
            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center text-base sm:text-lg font-semibold h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              )}
              {isLoading ? t('contact.form.submit.loading') as string : t('contact.form.submit.text') as string}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

const Contact = () => {
  const { t } = useTranslation('home');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Add pt-20 to create space for the navbar */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full pt-20">
        <Navbar />
      </div>
      <div className="bg-gradient-to-b from-slate-800 to-slate-900">
        <ContactHeader t={t} />
        <ContactInfo t={t} />
      </div>
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full">
        <ContactForm t={t} />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;