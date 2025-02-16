import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface CallToActionProps {
  t: (key: string) => string;
}

const CallToAction: React.FC<CallToActionProps> = ({ t }) => (
  <section className="py-12 md:py-20 lg:py-24 ">
    <div className="mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
        {t('callToAction.title')}
      </h2>
      <p className="text-lg sm:text-xl md:text-xl mb-8 text-gray-700">
        {t('callToAction.description')}
      </p>
      <a
        href="https://chat.cvbaba.com"

        aria-label={t('callToAction.getStartedAriaLabel')}
      >
        <Button
          className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-semibold rounded-full shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t('callToAction.getStarted')}
        </Button>
      </a>

    </div>
  </section>
);

export default CallToAction;