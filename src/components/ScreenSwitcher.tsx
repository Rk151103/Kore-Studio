import { ScreenId } from '../types';
import { LayoutTemplate, BarChart3, GalleryVerticalEnd, Layers, CodeXml } from 'lucide-react';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

export function ScreenSwitcher({ currentScreen, onSelectScreen }: ScreenSwitcherProps) {
  const screens: { id: ScreenId; label: string; icon: React.ElementType; keyNum: string }[] = [
    { id: 'landing', label: '1. Marquee', icon: LayoutTemplate, keyNum: '1' },
    { id: 'analytics', label: '2. Intelligence', icon: BarChart3, keyNum: '2' },
    { id: 'showcase', label: '3. Exhibition', icon: GalleryVerticalEnd, keyNum: '3' },
    { id: 'pricing', label: '4. Editions', icon: Layers, keyNum: '4' },
    { id: 'importer', label: '5. HTML Importer', icon: CodeXml, keyNum: '5' },
  ];

  return (
    <aside aria-label="Screen switcher" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 shadow-2xl rounded-2xl">
        {screens.map((screen) => {
          const Icon = screen.icon;
          const isActive = currentScreen === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => onSelectScreen(screen.id)}
              title={`Switch to ${screen.label} (Key: ${screen.keyNum})`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{screen.label}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isActive ? 'bg-neutral-200 text-neutral-800' : 'text-neutral-500'
                }`}
              >
                {screen.keyNum}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
