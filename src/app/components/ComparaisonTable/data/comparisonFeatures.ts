// data/comparisonFeatures.ts

const MONTHLY_DISCOUNT_PERCENTAGE = 0.5
const FREE_MONTHS_ANNUAL = 2

export const COMPARISON_FEATURES = [
  {
    feature: "pricing.comparisonTable.featuresComparison.monthlyAICredits",
    free: "10",
    basic: "60",
    pro: "120",
    premium: "250",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.templates",
    free: "pricing.comparisonTable.features.basic.label",
    basic: "pricing.comparisonTable.features.standard",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.quickCreation",
    free: true,
    basic: true,
    pro: true,
    premium: true,
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.smartFormatting",
    free: "pricing.comparisonTable.features.basic.label",
    basic: "pricing.comparisonTable.features.standard",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.documentUpdates",
    free: "pricing.comparisonTable.features.limited",
    basic: "pricing.comparisonTable.features.unlimited",
    pro: "pricing.comparisonTable.features.unlimited",
    premium: "pricing.comparisonTable.features.unlimited",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.documentDownloads",
    free: "pricing.comparisonTable.features.unlimited",
    basic: "pricing.comparisonTable.features.unlimited",
    pro: "pricing.comparisonTable.features.unlimited",
    premium: "pricing.comparisonTable.features.unlimited",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.resumeAI",
    free: true,
    basic: true,
    pro: true,
    premium: true,
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.coverLetterAI",
    free: true,
    basic: true,
    pro: true,
    premium: true,
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.accessToZenAI",
    free: "pricing.comparisonTable.features.basic.label",
    basic: "pricing.comparisonTable.features.standard",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.templateCustomization",
    free: "pricing.comparisonTable.features.basic.label",
    basic: "pricing.comparisonTable.features.standard",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.atsOptimization",
    free: "pricing.comparisonTable.features.basic.label",
    basic: "pricing.comparisonTable.features.standard",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.interviewQASimulation",
    free: false,
    basic: "pricing.comparisonTable.features.basicOnly",
    pro: "pricing.comparisonTable.features.advanced",
    premium: "pricing.comparisonTable.features.premium.label",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.customerSupport",
    free: "pricing.comparisonTable.features.email",
    basic: "pricing.comparisonTable.features.priorityEmail",
    pro: "pricing.comparisonTable.features.priorityChat",
    premium: "pricing.comparisonTable.features.24_7Priority",
  },
  {
    feature: "pricing.comparisonTable.featuresComparison.dedicatedAccountManager",
    free: false,
    basic: false,
    pro: false,
    premium: true,
  },
];