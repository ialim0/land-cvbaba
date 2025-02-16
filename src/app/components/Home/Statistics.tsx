import React from 'react';
import { Users, LayoutTemplate, Award, Clock } from 'lucide-react';

interface StatisticItem {
  label: string;
  value: string;
  icon: React.ReactElement;
}

const statistics: StatisticItem[] = [
  { label: "Active Users", value: "10K+", icon: <Users className="h-8 w-8 text-blue-600" /> },
  { label: "Templates", value: "1000+", icon: <LayoutTemplate className="h-8 w-8 text-blue-600" /> },
  { label: "Success Rate", value: "90%", icon: <Award className="h-8 w-8 text-blue-600" /> },
  { label: "Hours Saved", value: "40k hrs", icon: <Clock className="h-8 w-8 text-blue-600" /> }
];

interface StatisticsProps {
  t: (key: string) => string;
}

const Statistics: React.FC<StatisticsProps> = ({ t }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto text-center mb-10">
      <h2 className="text-4xl font-bold text-blue-900 mb-6">{t("statistics.title")}</h2>
      <p className="text-xl text-blue-800 mb-8">{t("statistics.subtitle")}</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {statistics.map((stat, index) => (
        <div
          key={index}
          className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-center mb-4">{stat.icon}</div>
          <div className="text-4xl font-bold mb-2 text-blue-900">
            {t(`statistics.items.${index}.value`)}
          </div>
          <div className="text-lg font-medium text-blue-600">
            {t(`statistics.items.${index}.label`)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Statistics;
