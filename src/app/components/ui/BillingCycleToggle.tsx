import React from "react";
import { Check, Sparkles } from "lucide-react";

interface BillingCycleToggleProps {
  billingCycle: 'monthly' | 'annual';
  onToggle: (cycle: 'monthly' | 'annual') => void;
  savings?: number;
}

const BillingCycleToggle: React.FC<BillingCycleToggleProps> = ({ 
  billingCycle, 
  onToggle,
  savings = 50
}) => {
  const isAnnual = billingCycle === 'annual';

  const getTextStyle = (isActive: boolean) =>
    `text-lg font-semibold transition-all duration-300 ${
      isActive ? 'text-blue-900 scale-105' : 'text-gray-500'
    }`;

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex items-center justify-center space-x-6">
        <button 
          onClick={() => onToggle('monthly')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            !isAnnual ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <span className={getTextStyle(!isAnnual)}>Monthly</span>
          {!isAnnual && <Check className="w-5 h-5 text-blue-600" />}
        </button>

        <button
          onClick={() => onToggle(isAnnual ? 'monthly' : 'annual')}
          className={`relative w-20 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${
            isAnnual ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          aria-label="Toggle Billing Cycle"
          role="switch"
          aria-checked={isAnnual}
        >
          <div
            className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md transition-transform duration-300 ${
              isAnnual ? 'translate-x-10' : 'translate-x-0'
            }`}
          />
        </button>

        <button 
          onClick={() => onToggle('annual')}
          className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isAnnual ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <span className={getTextStyle(isAnnual)}>Annual</span>
          {isAnnual && <Check className="w-5 h-5 text-blue-600" />}
        </button>
      </div>

      {/* Savings badge */}
      <div 
        className={`flex items-center space-x-2 px-4 py-2 bg-green-50 text-blue-500 rounded-full transition-all duration-500 ${
          isAnnual ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <Sparkles className="w-4 h-4 0" />
        <span className="text-sm font-medium ">
          Save {savings}% with annual billing
        </span>
      </div>
    </div>
  );
};

export default BillingCycleToggle;