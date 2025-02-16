import React from 'react';
import { FileText, Rocket, Globe, Zap, Palette, LayoutTemplate } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "AI-Driven Resume Optimization",
    description: "Receive targeted insights to craft resumes that stand out."
  },
  {
    icon: <Rocket className="h-8 w-8 text-blue-600" />,
    title: "Professionally Designed Templates",
    description: "Access over 1,000 modern templates for a unique and polished look."
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Language Support",
    description: "Reach global employers with resumes in multiple languages."
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Instant Resume Creation",
    description: "Save time with a fast, streamlined process that's ready in minutes."
  },
  {
    icon: <Palette className="h-8 w-8 text-blue-600" />,
    title: "Customizable Designs",
    description: "Personalize every detail to match your professional style."
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-blue-600" />,
    title: "ATS-Compatible",
    description: "Boost your visibility by ensuring your resume passes ATS checks."
  }
];

interface FeaturesProps {
  t: (key: string) => string;
}

const Features: React.FC<FeaturesProps> = ({ t }) => (
  <section className="py-t sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
          {t("features.title")}
        </h2>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
          {t("features.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="p-4 sm:p-6 group-hover:scale-95 group-hover:opacity-0 transition-all duration-300">
              <div className="flex flex-col sm:flex-row lg:flex-col items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  {React.cloneElement(feature.icon, {
                    className: "h-6 w-6 sm:h-8 sm:w-8 text-blue-600"
                  } as { className: string })}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center sm:text-left lg:text-center">
                  {t(`features.items.${index}.title`)}
                </h3>
              </div>
            </div>

            <div
              className="absolute inset-0 bg-blue-600 rounded-xl flex items-center justify-center p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <p className="text-white text-sm sm:text-base text-center font-medium">
                {t(`features.items.${index}.description`)}
              </p>
            </div>

            <div className="sr-only">
              {t(`features.items.${index}.description`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;