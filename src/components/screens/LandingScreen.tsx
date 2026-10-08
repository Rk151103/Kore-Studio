import { useState } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ScreenId } from '../../types';
import { 
  ArrowRight, 
  Check, 
  ExternalLink, 
  Layers, 
  SlidersHorizontal, 
  Monitor, 
  Tablet, 
  Smartphone,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LandingScreenProps {
  onSelectScreen: (screen: ScreenId) => void;
  heroImageOverride?: string | null;
}

export function LandingScreen({ onSelectScreen, heroImageOverride }: LandingScreenProps) {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [emailInput, setEmailInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'canvas' | 'data' | 'export'>('canvas');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Value Proposition Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                <span>Next-Generation Studio Systems</span>
                <span aria-hidden="true">·</span>
                <span>Version 2026.4</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
                Digital interfaces with surgical clarity and zero compromise.
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                We craft multi-screen web architectures, spatial software canvases, and real-time operational interfaces engineered for modern high-performance engineering teams.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectScreen('importer')}
                  className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-xl transition-all shadow-lg hover:shadow-white/10 flex items-center gap-2"
                >
                  <span>Import HTML & Hotlink Images</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectScreen('analytics')}
                  className="px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Explore Intelligence Screen</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              {/* Claim to Proof Adjacency */}
              <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                    +142%
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">Delivery velocity in 90 days</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                    &lt; 64ms
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">Global render latency</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                    99.98%
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">Asset uptime resiliency</p>
                </div>
              </div>
            </div>

            {/* Marquee Visual Hero Right Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
                <ImageWithFallback
                  src={heroImageOverride || "/src/assets/images/hero_product_interface_1791448551489.jpg"}
                  alt="Kore Studio High-Fidelity Workspace"
                  aspectRatioClass="aspect-[4/3]"
                  fallbackTitle="Digital Architecture Workstation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Live Production Canvas</p>
                    <p className="text-[11px] text-neutral-400">1440px desktop grid baseline verified</p>
                  </div>
                  <button
                    onClick={() => onSelectScreen('showcase')}
                    className="text-xs font-medium text-neutral-200 hover:text-white underline underline-offset-2"
                  >
                    View Works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-medium text-neutral-400">Core Capabilities</div>
          <h2 className="text-3xl font-bold text-white font-display text-balance">
            System architectural pillars for mission-critical software.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: Marquee Large Span */}
          <div className="md:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">01. Dynamic Multi-Screen Routing</span>
                <span className="text-xs text-neutral-400">Spatial Topology</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Fluid screen transitions without layout shifts or memory leaks.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Native state preservation across all screens: Overview, Telemetry, Exhibition, Editions, and Hotlinked HTML preview. Every viewport respects high-resolution density and single-elevation hierarchy.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero jitter tabular numerals</span>
              </div>
              <button
                onClick={() => onSelectScreen('analytics')}
                className="text-xs font-medium text-white hover:text-neutral-300 transition-colors flex items-center gap-1"
              >
                <span>Inspect Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 2: Medium Span */}
          <div className="md:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">02. HTML & Image Hotlinking</span>
                <span className="text-xs text-neutral-400">Direct CDN</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Extract and live-embed raw HTML and external imagery.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Paste any external markup or image hotlinks. Our parser sanitizes elements and guarantees fallback rendering with the zero-broken-image policy.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800">
              <button
                onClick={() => onSelectScreen('importer')}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors text-center"
              >
                Test HTML Importer Now
              </button>
            </div>
          </div>

          {/* Bento Item 3: Medium Span */}
          <div className="md:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">03. High-Fidelity Visual Fidelity</span>
                <span className="text-xs text-neutral-400">Gallery Grade</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Domain-authentic visual standards and typographic restraint.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Curated typography pairings featuring Syne and Plus Jakarta Sans with tabular monospace figures. Zero pill clutter, zero generic gradients.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>WCAG AA 4.5:1 Contrast</span>
              <span className="text-emerald-400 font-mono">100% Compliant</span>
            </div>
          </div>

          {/* Bento Item 4: Large Span */}
          <div className="md:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">04. Real-Time Telemetry & BI</span>
                <span className="text-xs text-neutral-400">Observability</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Complete operational dashboards with live filters and zero fake telemetry.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Filter by period, audit conversion funnels, observe response times, and download structured reports with clean single-elevation cards.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Quarterly cohorts & export matrix</span>
              </div>
              <button
                onClick={() => onSelectScreen('analytics')}
                className="text-xs font-medium text-white hover:text-neutral-300 transition-colors flex items-center gap-1"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Screen Inspector Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
            <div>
              <div className="text-xs font-medium text-neutral-400">Interactive Simulation</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Multi-Screen Viewport Simulator
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Preview how our modular screens render across various device breakpoints.
              </p>
            </div>

            {/* Viewport switch controls */}
            <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-xl self-start md:self-auto">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  devicePreview === 'desktop'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop 1440px</span>
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  devicePreview === 'tablet'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablet 1024px</span>
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  devicePreview === 'mobile'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile 390px</span>
              </button>
            </div>
          </div>

          {/* Simulator Viewport Frame */}
          <div className="pt-8 flex justify-center">
            <div
              className={`transition-all duration-300 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 ${
                devicePreview === 'desktop'
                  ? 'w-full'
                  : devicePreview === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              {/* Simulator Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <span className="text-[11px] text-neutral-400 ml-2 font-mono">
                    https://studio.kore.internal/{devicePreview}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  {devicePreview === 'desktop' ? '1440 × 900' : devicePreview === 'tablet' ? '768 × 1024' : '375 × 812'}
                </div>
              </div>

              {/* Dynamic Interactive Tab Controls */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setActiveInteractiveTab('canvas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'canvas'
                      ? 'bg-white text-neutral-950'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Spatial Workspace
                </button>
                <button
                  onClick={() => setActiveInteractiveTab('data')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'data'
                      ? 'bg-white text-neutral-950'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Telemetry Feeds
                </button>
                <button
                  onClick={() => setActiveInteractiveTab('export')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeInteractiveTab === 'export'
                      ? 'bg-white text-neutral-950'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Asset Manifest
                </button>
              </div>

              {/* Tab Contents */}
              {activeInteractiveTab === 'canvas' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                      <p className="text-xs text-neutral-400">Viewport Render Engine</p>
                      <p className="text-sm font-semibold text-white mt-1">Accelerated DOM Pipeline</p>
                      <div className="mt-3 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-4/5" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                      <p className="text-xs text-neutral-400">Font Cache Integrity</p>
                      <p className="text-sm font-semibold text-white mt-1">Syne &amp; Plus Jakarta</p>
                      <div className="mt-3 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-full" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between">
                    <div className="text-xs text-neutral-400">
                      Status: Nominal · 60fps compositor thread
                    </div>
                    <button
                      onClick={() => onSelectScreen('analytics')}
                      className="text-xs text-white hover:underline font-medium"
                    >
                      Open Live Dashboard →
                    </button>
                  </div>
                </div>
              )}

              {activeInteractiveTab === 'data' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex justify-between text-xs">
                    <span className="text-neutral-400">HTTP/3 Response Time</span>
                    <span className="font-mono text-emerald-400">42ms</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex justify-between text-xs">
                    <span className="text-neutral-400">Cumulative Layout Shift</span>
                    <span className="font-mono text-emerald-400">0.001 (Zero Jitter)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex justify-between text-xs">
                    <span className="text-neutral-400">DOM Reconciliation</span>
                    <span className="font-mono text-emerald-400">1.2ms / frame</span>
                  </div>
                </div>
              )}

              {activeInteractiveTab === 'export' && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <p className="text-white font-medium">Export System Artifacts</p>
                    <p className="text-neutral-400 text-[11px]">
                      Compile screens to production ready static bundles or inspect raw DOM tokens.
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => onSelectScreen('importer')}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs"
                      >
                        Inspect Hotlinks
                      </button>
                      <button
                        onClick={() => onSelectScreen('pricing')}
                        className="px-3 py-1.5 bg-white text-neutral-950 font-medium rounded-lg text-xs"
                      >
                        View Enterprise Tier
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Impact & Attributable Testimonial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl relative">
              <ImageWithFallback
                src="/src/assets/images/avatar_founder_lead_1791448601320.jpg"
                alt="Elena Vance, Principal Systems Architect"
                aspectRatioClass="aspect-square"
                fallbackTitle="Executive Architect"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-mono text-neutral-400">Attributable Verification</div>
            <blockquote className="text-lg sm:text-xl text-neutral-200 font-medium leading-relaxed">
              "Kore Studio replaced seven disparate mock consoles with a single cohesive multi-screen production system. The ability to directly hotlink external HTML snippets and test screens live shortened our delivery cycles by over 60%."
            </blockquote>
            <div className="pt-2">
              <p className="text-sm font-bold text-white">Elena Vance</p>
              <p className="text-xs text-neutral-400">
                Principal Systems Architect · Apex Digital Infrastructure Group
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Lead Capture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <div className="text-xs font-medium text-neutral-400">Deployment Gateway</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display text-balance">
            Ready to deploy your multi-screen web infrastructure?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Connect with our engineering specialists for custom deployment blueprints, dedicated cloud instances, and high-throughput asset pipelines.
          </p>

          {formSubmitted ? (
            <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl max-w-md mx-auto text-emerald-300 text-xs flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Request received. Our engineering director will contact you within 2 business hours.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@organization.com"
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Schedule Technical Review
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 text-xs text-neutral-400 pt-2">
            <span>Direct engineer consultation</span>
            <span>·</span>
            <span>No sales qualification delays</span>
            <span>·</span>
            <span>SOC2 Type II certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
