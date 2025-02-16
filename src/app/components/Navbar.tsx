'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { useTranslation } from "../i18n/i18n";
import Logo from "./ui/Logo";
import { usePromoBanner } from "../contexts/PromoBannerContext";
import LanguageSelector from "./LanguageSelector";

interface NavItem {
  name: string;
  path: string;
}

interface MobileNavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isPromoBannerVisible } = usePromoBanner();

  const { t } = useTranslation('home');

  const navItems: NavItem[] = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.blog"), path: "/blog" },
    { name: t("navbar.pricing"), path: "/pricing" },
    { name: t("navbar.contact"), path: "/contact" },
  ];

  const mobileNavItems: MobileNavItem[] = [
    { href: "/", label: t("navbar.home"), Icon: AiFillHome },
    { href: "/blog", label: t("navbar.blog"), Icon: BsFillBookmarkFill },
    { href: "/pricing", label: t("navbar.pricing"), Icon: FaMoneyBillAlt },
    { href: "/contact", label: t("navbar.contact"), Icon: MdContactMail },
  ];

  return (
    <nav className={`fixed left-0 w-full z-50 bg-gradient-to-b from-blue-50 to-white shadow-none border-none ${isPromoBannerVisible ? "top-16" : "top-0"}`}>      
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl text-gray-800 font-bold tracking-tight">
          <Logo className="text-2xl sm:text-3xl font-bold text-blue-700" showIcon={false} />
        </div>

        <button
          className="text-gray-800 block md:hidden focus:outline-none hover:opacity-75 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t("navbar.openMenu")}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="hidden md:flex md:items-center md:space-x-4 w-full">
          <div className="flex-grow flex justify-center space-x-12">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center group">
                <Link href={item.path} className="text-gray-600 transition-colors duration-200 text-lg font-medium">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector mode="client" />
            <div className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200">
              <button onClick={() => (window.location.href = "https://chat.cvbaba.com")} className="flex items-center space-x-2 text-sm font-medium text-white">
                <RiLoginBoxFill className="h-4 w-4" />
                <span>{t("navbar.talkToCVBABA")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full bg-gradient-to-b from-blue-50 to-white text-gray-800 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out w-64`} aria-hidden={!isOpen}>
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-medium">{t("navbar.menu")}</span>
          <button className="text-gray-800 focus:outline-none hover:opacity-75 transition-opacity" onClick={() => setIsOpen(false)} aria-label={t("navbar.closeMenu")}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex flex-col group">
            <LanguageSelector mode="client" />
          </div>
          {mobileNavItems.map(({ href, label, Icon }) => (
            <div key={label} className="flex flex-col group">
              <Link href={href} className="text-gray-600 flex items-center space-x-3 text-sm" onClick={() => setIsOpen(false)}>
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </div>
          ))}
          <div className="flex flex-col group">
            <button onClick={() => (window.location.href = "https://chat.cvbaba.com")} className="text-gray-600 flex items-center space-x-3 text-sm">
              <RiLoginBoxFill className="h-5 w-5" />
              <span>{t("navbar.talkToCVBABA")}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
