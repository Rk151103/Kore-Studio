/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Navbar } from './components/Navbar';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { Footer } from './components/Footer';
import { LandingScreen } from './components/screens/LandingScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { ShowcaseScreen } from './components/screens/ShowcaseScreen';
import { PricingScreen } from './components/screens/PricingScreen';
import { HtmlImporterScreen } from './components/screens/HtmlImporterScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [heroImageOverride, setHeroImageOverride] = useState<string | null>(null);

  // Keyboard shortcut navigation (1-5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case '1':
          setCurrentScreen('landing');
          break;
        case '2':
          setCurrentScreen('analytics');
          break;
        case '3':
          setCurrentScreen('showcase');
          break;
        case '4':
          setCurrentScreen('pricing');
          break;
        case '5':
          setCurrentScreen('importer');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on screen change
  const handleSelectScreen = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
      />

      {/* Main Dynamic Screen Viewport */}
      <main className="flex-1 w-full">
        {currentScreen === 'landing' && (
          <LandingScreen
            onSelectScreen={handleSelectScreen}
            heroImageOverride={heroImageOverride}
          />
        )}

        {currentScreen === 'analytics' && (
          <AnalyticsScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'showcase' && (
          <ShowcaseScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'pricing' && (
          <PricingScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'importer' && (
          <HtmlImporterScreen
            onSelectScreen={handleSelectScreen}
            onApplyHotlinkToSite={(url) => {
              setHeroImageOverride(url);
              handleSelectScreen('landing');
            }}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onSelectScreen={handleSelectScreen} />

      {/* Floating Screen Switcher Dock with Hotkeys */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
      />
    </div>
  );
}
