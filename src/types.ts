export type ScreenId = 'landing' | 'analytics' | 'showcase' | 'pricing' | 'importer';

export interface ShowcaseProject {
  id: string;
  title: string;
  category: 'Product' | 'Architecture' | 'Systems' | 'Visual';
  year: string;
  summary: string;
  deliverables: string[];
  imageUrl: string;
  client: string;
  metric: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  dataPoints: number[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  features: string[];
  specs: {
    workspaces: string;
    events: string;
    support: string;
    exportFormat: string;
  };
}

export interface HotlinkedAsset {
  id: string;
  url: string;
  altText: string;
  sourceContext: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
}
