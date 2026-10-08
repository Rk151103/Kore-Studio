import { useState } from 'react';
import { ScreenId } from '../types';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenImporterModal?: () => void;
}

export function Navbar({ currentScreen, onSelectScreen, onOpenImporterModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'landing', label: 'Overview' },
    { id: 'analytics', label: 'Intelligence' },
    { id: 'showcase', label: 'Exhibition' },
    { id: 'pricing', label: 'Editions' },
    { id: 'importer', label: 'HTML Importer' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectScreen('landing')}
          className="text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition-colors font-display"
        >
          Kore Studio
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onSelectScreen('importer')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <Code2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Hotlink Images</span>
          </button>
          <button
            onClick={() => onSelectScreen('analytics')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Launch Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectScreen(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentScreen === item.id
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2">
            <button
              onClick={() => {
                onSelectScreen('importer');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg"
            >
              Hotlink HTML & Images
            </button>
            <button
              onClick={() => {
                onSelectScreen('analytics');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-neutral-950 bg-white rounded-lg"
            >
              Launch Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
