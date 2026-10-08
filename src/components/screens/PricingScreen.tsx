import { useState } from 'react';
import { ScreenId, PricingPlan } from '../../types';
import { Check, ArrowRight, ChevronDown, ChevronUp, ShieldCheck, Zap } from 'lucide-react';

interface PricingScreenProps {
  onSelectScreen: (screen: ScreenId) => void;
}

export function PricingScreen({ onSelectScreen }: PricingScreenProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('growth');
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter Operations',
      tagline: 'For fast-moving early engineering teams building up to 3 screens.',
      monthlyPrice: 89,
      annualPrice: 69,
      features: [
        'Up to 3 concurrent active screens',
        'Standard HTML & image hotlinking engine',
        'Zero-broken-image fallback scrim',
        '60-day telemetry retention log',
        'Community Discord & email support',
      ],
      specs: {
        workspaces: '1 Dedicated Production Workspace',
        events: '500,000 monthly telemetry events',
        support: '48-hour email response SLA',
        exportFormat: 'Static JSON & HTML bundles',
      },
    },
    {
      id: 'growth',
      name: 'Scale Engineering',
      tagline: 'For high-throughput product teams requiring multi-screen real-time pipelines.',
      monthlyPrice: 249,
      annualPrice: 199,
      highlighted: true,
      features: [
        'Unlimited active screens & viewports',
        'Accelerated CDN hotlink asset proxy',
        'Real-time P99 latency tracking & CSV exports',
        '1-year telemetry retention with SQL querying',
        'Priority Slack & engineer support',
      ],
      specs: {
        workspaces: '5 Dedicated Production Workspaces',
        events: '5,000,000 monthly telemetry events',
        support: '4-hour business response SLA',
        exportFormat: 'Automated CI/CD webhook triggers',
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise Core',
      tagline: 'For mission-critical enterprises requiring bespoke SLAs and VPC isolation.',
      monthlyPrice: 699,
      annualPrice: 559,
      features: [
        'Dedicated isolated cloud tenancy',
        'Custom domain CDN with SSL offloading',
        'Role-based access control (RBAC) & SAML SSO',
        'Indefinite telemetry archive & audit compliance',
        'Dedicated technical account director',
      ],
      specs: {
        workspaces: 'Unlimited isolated VPC instances',
        events: 'Custom unmetered throughput',
        support: '15-minute 24/7/365 critical pager SLA',
        exportFormat: 'Direct S3/GCS mirror replication',
      },
    },
  ];

  const faqs = [
    {
      question: 'How does HTML and image hotlinking work in Kore Studio?',
      answer:
        'You can paste raw HTML markup or direct image URLs. Our parser extracts image tags, sanitizes DOM structures, and loads them safely with no-referrer headers. If a hotlinked image fails or gets rate-limited, our Zero-Broken-Image fallback container automatically renders with no visual jitter.',
    },
    {
      question: 'Can I migrate custom screens into our own production codebase?',
      answer:
        'Yes. All screens and configurations can be exported directly as modular React TypeScript components or static production bundles compatible with Next.js, Vite, or vanilla static hosting.',
    },
    {
      question: 'What is the refund and cancellation policy?',
      answer:
        'All plans come with a 30-day money-back guarantee. You can cancel or change billing intervals at any time directly through your dashboard with no lock-in.',
    },
  ];

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlanId(plan.id);
    setConfirmationNotice(`Selected ${plan.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'} cadence).`);
    setTimeout(() => setConfirmationNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Pricing Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-mono text-neutral-400">Deployment Editions</div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display text-balance">
          Transparent licensing for teams that build without friction.
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Scale from single-screen prototypes to distributed multi-screen clusters. Every plan includes full access to our hotlink ingestion pipeline.
        </p>

        {/* Billing Cadence Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="p-1 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {confirmationNotice && (
        <div className="max-w-xl mx-auto p-3 bg-neutral-900 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 text-center flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{confirmationNotice}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-neutral-900 border-2 border-neutral-400 shadow-2xl relative'
                  : 'bg-neutral-900/60 border border-neutral-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-100 text-neutral-950 text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">{plan.name}</h2>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white font-mono tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">/ month</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {billingCycle === 'annual' ? 'Billed annually ($' + price * 12 + '/yr)' : 'Billed monthly'}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Included Capabilities
                  </p>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Concrete Specs Comparison */}
              <div className="mt-8 pt-6 border-t border-neutral-800/80 space-y-4">
                <div className="text-[11px] space-y-1.5 text-neutral-400 font-mono">
                  <div className="flex justify-between">
                    <span>Workspaces:</span>
                    <span className="text-white text-right">{plan.specs.workspaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Events SLA:</span>
                    <span className="text-white text-right">{plan.specs.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support SLA:</span>
                    <span className="text-white text-right">{plan.specs.support}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                      : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }`}
                >
                  <span>{isSelected ? 'Currently Selected' : `Deploy with ${plan.name}`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Concrete Specification Matrix */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white font-display">Technical Matrix Comparison</h2>
          <p className="text-xs text-neutral-400">
            Clear limits without hidden asterisk traps or arbitrary surcharges.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Technical Metric</th>
                <th className="py-3 px-4 font-semibold">Starter</th>
                <th className="py-3 px-4 font-semibold">Scale Operations</th>
                <th className="py-3 px-4 font-semibold">Enterprise Core</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-200">Concurrent Active Screens</td>
                <td className="py-3 px-4">3 Screens</td>
                <td className="py-3 px-4 text-white">Unlimited</td>
                <td className="py-3 px-4 text-white">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-200">Asset Hotlinking Engine</td>
                <td className="py-3 px-4">Direct Client CDN</td>
                <td className="py-3 px-4 text-white">Edge Accelerated Proxy</td>
                <td className="py-3 px-4 text-white">Dedicated VPC Mirror</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-200">Zero-Broken-Image Scrim</td>
                <td className="py-3 px-4 text-emerald-400">Standard Fallback</td>
                <td className="py-3 px-4 text-emerald-400">High-Res Fallback</td>
                <td className="py-3 px-4 text-emerald-400">Custom Brand Fallback</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-200">Audit Log Retention</td>
                <td className="py-3 px-4">60 Days</td>
                <td className="py-3 px-4">365 Days</td>
                <td className="py-3 px-4 text-white">Indefinite Cold Storage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-white text-center font-display mb-6">
          Frequently Answered Technical Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between text-xs font-semibold text-white hover:text-neutral-200 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-5 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
