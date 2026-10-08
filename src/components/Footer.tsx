import { ScreenId } from '../types';

interface FooterProps {
  onSelectScreen: (screen: ScreenId) => void;
}

export function Footer({ onSelectScreen }: FooterProps) {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 mt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-white font-display">Kore Studio</span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
              Autonomous digital interface platform and modular screen design system for modern technology teams.
            </p>
          </div>

          {/* Column 2: System Screens */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Architecture</p>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onSelectScreen('landing')} className="hover:text-white transition-colors">
                  Marquee Overview
                </button>
              </li>
              <li>
                <button onClick={() => onSelectScreen('analytics')} className="hover:text-white transition-colors">
                  Telemetry Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onSelectScreen('showcase')} className="hover:text-white transition-colors">
                  Editorial Showcase
                </button>
              </li>
              <li>
                <button onClick={() => onSelectScreen('pricing')} className="hover:text-white transition-colors">
                  Deployment Editions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Assets & Tooling */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Tooling</p>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onSelectScreen('importer')} className="hover:text-white transition-colors">
                  HTML & Hotlink Importer
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Tailwind CSS Engine v4</span>
              </li>
              <li>
                <span className="text-neutral-500">Direct CDN Hotlinking</span>
              </li>
              <li>
                <span className="text-neutral-500">Zero-Broken-Image Scrim</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Spec */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Specifications</p>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>Baseline: 1440px Desktop Grid</p>
              <p>Typeface: Syne / Plus Jakarta Sans</p>
              <p>Security: Isolated Iframe Compliant</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Kore Studio Systems. All rights reserved.</p>
          <div className="flex items-center gap-6 text-neutral-400">
            <button className="hover:text-neutral-200 transition-colors">Privacy Notice</button>
            <span>·</span>
            <button className="hover:text-neutral-200 transition-colors">Terms of Service</button>
            <span>·</span>
            <button className="hover:text-neutral-200 transition-colors">Security Architecture</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
