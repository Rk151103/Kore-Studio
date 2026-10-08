import { useState, useId } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ScreenId, HotlinkedAsset } from '../../types';
import { 
  Code2, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Check, 
  Copy, 
  Trash2, 
  Eye, 
  RefreshCw,
  Plus,
  Play
} from 'lucide-react';

interface HtmlImporterScreenProps {
  onSelectScreen: (screen: ScreenId) => void;
  onApplyHotlinkToSite?: (url: string) => void;
}

export function HtmlImporterScreen({ onSelectScreen, onApplyHotlinkToSite }: HtmlImporterScreenProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [htmlInput, setHtmlInput] = useState<string>(`<!-- Sample HTML with hotlinked screens and images -->
<section class="editorial-hero">
  <div class="content-block">
    <h1 class="headline">Modern Spatial Architecture & Workspace Console</h1>
    <p class="summary">High-frequency distributed systems with visual clarity.</p>
  </div>
  <div class="gallery-grid">
    <img src="/src/assets/images/hero_product_interface_1791448551489.jpg" alt="Primary Workspace Canvas" width="1280" height="720" />
    <img src="/src/assets/images/screen_analytics_overview_1791448569866.jpg" alt="Operational Telemetry Cluster" width="800" height="600" />
    <img src="/src/assets/images/screen_creative_showcase_1791448589246.jpg" alt="Exhibition Design Monograph" width="800" height="600" />
    <img src="/src/assets/images/avatar_founder_lead_1791448601320.jpg" alt="Elena Vance Architect Portrait" width="400" height="400" />
  </div>
</section>`);

  const [extractedAssets, setExtractedAssets] = useState<HotlinkedAsset[]>([
    {
      id: 'asset-1',
      url: '/src/assets/images/hero_product_interface_1791448551489.jpg',
      altText: 'Primary Workspace Canvas',
      sourceContext: 'hero.gallery-grid img#1',
      aspectRatio: '16:9',
    },
    {
      id: 'asset-2',
      url: '/src/assets/images/screen_analytics_overview_1791448569866.jpg',
      altText: 'Operational Telemetry Cluster',
      sourceContext: 'hero.gallery-grid img#2',
      aspectRatio: '4:3',
    },
    {
      id: 'asset-3',
      url: '/src/assets/images/screen_creative_showcase_1791448589246.jpg',
      altText: 'Exhibition Design Monograph',
      sourceContext: 'hero.gallery-grid img#3',
      aspectRatio: '4:3',
    },
    {
      id: 'asset-4',
      url: '/src/assets/images/avatar_founder_lead_1791448601320.jpg',
      altText: 'Elena Vance Architect Portrait',
      sourceContext: 'hero.gallery-grid img#4',
      aspectRatio: '1:1',
    },
  ]);

  const [singleUrlInput, setSingleUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'parser' | 'live-canvas'>('parser');
  const [parseNotice, setParseNotice] = useState<string | null>(null);

  // Extract images from raw HTML
  const handleParseHtml = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      const imgElements = Array.from(doc.querySelectorAll('img'));
      
      // Also look for background images in inline styles
      const allElements = Array.from(doc.querySelectorAll('*'));
      const bgUrls: string[] = [];
      allElements.forEach((el) => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/background(?:-image)?:\s*url\(['"]?(.*?)['"]?\)/i);
        if (match && match[1]) {
          bgUrls.push(match[1]);
        }
      });

      const parsed: HotlinkedAsset[] = [];

      imgElements.forEach((img, idx) => {
        const src = img.getAttribute('src');
        if (src) {
          parsed.push({
            id: `img-${Date.now()}-${idx}`,
            url: src,
            altText: img.getAttribute('alt') || `Extracted Asset ${idx + 1}`,
            sourceContext: `img[src="${src.slice(0, 24)}..."]`,
            aspectRatio: '16:9',
          });
        }
      });

      bgUrls.forEach((url, idx) => {
        parsed.push({
          id: `bg-${Date.now()}-${idx}`,
          url,
          altText: `Background CSS Asset ${idx + 1}`,
          sourceContext: `style="background: url(...)"`,
          aspectRatio: '16:9',
        });
      });

      if (parsed.length > 0) {
        setExtractedAssets(parsed);
        setParseNotice(`Successfully parsed ${parsed.length} hotlinked visual assets from HTML.`);
      } else {
        setParseNotice('No <img> tags or background-image URLs detected in the provided HTML.');
      }

      setTimeout(() => setParseNotice(null), 4000);
    } catch {
      setParseNotice('Unable to parse HTML markup. Please verify syntax.');
      setTimeout(() => setParseNotice(null), 4000);
    }
  };

  const handleAddSingleHotlink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleUrlInput.trim()) return;

    const newAsset: HotlinkedAsset = {
      id: `manual-${Date.now()}`,
      url: singleUrlInput.trim(),
      altText: 'Hotlinked User Asset',
      sourceContext: 'Manual Direct Input',
      aspectRatio: '16:9',
    };

    setExtractedAssets([newAsset, ...extractedAssets]);
    setSingleUrlInput('');
    setParseNotice('Added hotlinked image to asset queue.');
    setTimeout(() => setParseNotice(null), 3000);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveAsset = (id: string) => {
    setExtractedAssets(extractedAssets.filter((a) => a.id !== id));
  };

  const loadPreset = (preset: 'editorial' | 'minimal' | 'ecommerce') => {
    if (preset === 'editorial') {
      setHtmlInput(`<!-- Editorial Monograph Preset -->
<div class="exhibition-frame">
  <h2>Tactile Monograph Showcase</h2>
  <img src="/src/assets/images/screen_creative_showcase_1791448589246.jpg" alt="Tactile Monograph" />
  <img src="/src/assets/images/hero_product_interface_1791448551489.jpg" alt="Architectural Screen" />
</div>`);
    } else if (preset === 'ecommerce') {
      setHtmlInput(`<!-- Modern Hardware Drop Preset -->
<section class="hardware-launch">
  <h1>Quantum Spatial Computing Array</h1>
  <img src="/src/assets/images/screen_analytics_overview_1791448569866.jpg" alt="Hardware Display" />
  <img src="/src/assets/images/avatar_founder_lead_1791448601320.jpg" alt="Chief Engineer" />
</section>`);
    } else {
      setHtmlInput(`<!-- Minimal System Dashboard Preset -->
<div class="dashboard-header">
  <img src="/src/assets/images/hero_product_interface_1791448551489.jpg" alt="Workspace Interface" />
</div>`);
    }
    setTimeout(() => handleParseHtml(), 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header and Value Statement */}
      <div className="pb-6 border-b border-neutral-800 space-y-2">
        <div className="text-xs font-mono text-neutral-400">Direct Ingestion Engine</div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
              HTML &amp; Image Hotlink Importer
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Paste raw HTML markup, external links, or image URLs from your reference screens. Our parser extracts and hotlinks them into live production viewports with zero-broken-image fallbacks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('parser')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'parser'
                  ? 'bg-white text-neutral-950 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Parser &amp; Queue
            </button>
            <button
              onClick={() => setActiveTab('live-canvas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'live-canvas'
                  ? 'bg-white text-neutral-950 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Live Rendered Canvas
            </button>
          </div>
        </div>
      </div>

      {parseNotice && (
        <div className="p-3 bg-neutral-900 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{parseNotice}</span>
          </div>
          <button onClick={() => setParseNotice(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {activeTab === 'parser' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Formats */}
          <div className="lg:col-span-5 space-y-6">
            {/* HTML Paste Box */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-neutral-400" />
                  <span>Paste Raw HTML Snippet</span>
                </span>
                {/* Presets */}
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span>Presets:</span>
                  <button
                    onClick={() => loadPreset('editorial')}
                    className="hover:text-white underline underline-offset-2"
                  >
                    Editorial
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => loadPreset('ecommerce')}
                    className="hover:text-white underline underline-offset-2"
                  >
                    Hardware
                  </button>
                </div>
              </div>

              <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                rows={9}
                placeholder="Paste <img src='...'> or full HTML section here..."
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 font-mono text-xs focus:outline-none focus:border-neutral-500 transition-colors leading-relaxed"
              />

              <button
                onClick={handleParseHtml}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Parse HTML &amp; Extract Hotlinks</span>
              </button>
            </div>

            {/* Direct Image URL Form */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-neutral-400" />
                <span>Add Individual Image Hotlink URL</span>
              </span>
              <p className="text-[11px] text-neutral-400">
                Direct URL to any HTTPS image asset (JPEG, PNG, WebP, SVG).
              </p>
              <form onSubmit={handleAddSingleHotlink} className="flex gap-2">
                <input
                  type="text"
                  value={singleUrlInput}
                  onChange={(e) => setSingleUrlInput(e.target.value)}
                  placeholder="https://domain.com/screenshot.png"
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  Add Link
                </button>
              </form>
            </div>

            {/* Quick Actions Card */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-2">
              <div className="font-semibold text-white">How Zero-Broken-Image Works</div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                External images often fail due to CORS, hotlink protection, or network blips. Our engine wraps every hotlink with <code className="text-neutral-300 font-mono">referrerpolicy="no-referrer"</code> and an automated SVG fallback scrim to preserve layout stability.
              </p>
            </div>
          </div>

          {/* Right Column: Extracted Asset Cards Queue */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-semibold text-white">
                Extracted Hotlinked Assets ({extractedAssets.length})
              </span>
              <button
                onClick={() => setExtractedAssets([])}
                className="text-neutral-500 hover:text-rose-400 flex items-center gap-1 text-[11px] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Queue</span>
              </button>
            </div>

            {extractedAssets.length === 0 ? (
              <div className="p-12 text-center bg-neutral-900/30 border border-neutral-800/80 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 mx-auto flex items-center justify-center text-neutral-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-neutral-300">No hotlinked assets in queue</p>
                <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                  Paste HTML on the left or click one of the presets to automatically extract images.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extractedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      {/* Image Preview with Resilient Fallback */}
                      <div className="rounded-lg overflow-hidden border border-neutral-800/80 bg-neutral-950">
                        <ImageWithFallback
                          src={asset.url}
                          alt={asset.altText}
                          aspectRatioClass={
                            asset.aspectRatio === '1:1'
                              ? 'aspect-square'
                              : asset.aspectRatio === '4:3'
                              ? 'aspect-[4/3]'
                              : 'aspect-[16/9]'
                          }
                          fallbackTitle={asset.altText}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white truncate" title={asset.altText}>
                          {asset.altText}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono truncate" title={asset.url}>
                          {asset.url}
                        </p>
                      </div>
                    </div>

                    {/* Asset Control Toolbar */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleCopyUrl(asset.url, asset.id)}
                        className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                      >
                        {copiedId === asset.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        {onApplyHotlinkToSite && (
                          <button
                            onClick={() => onApplyHotlinkToSite(asset.url)}
                            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-medium transition-colors"
                          >
                            Apply to Hero
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveAsset(asset.id)}
                          aria-label="Remove asset from queue"
                          className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Live Rendered Canvas Tab */
        <div className="space-y-6">
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                Dynamic Screen Assembly Sandbox
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Preview how hotlinked assets synthesize into live responsive screens.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectScreen('landing')}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium"
              >
                View in Marquee Screen
              </button>
              <button
                onClick={() => onSelectScreen('showcase')}
                className="px-4 py-2 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs font-semibold"
              >
                View in Exhibition Screen
              </button>
            </div>
          </div>

          {/* Sandbox Screen Frame */}
          <div className="border border-neutral-800 rounded-3xl overflow-hidden bg-neutral-950 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
                  <span>Synthesized Screen Viewport</span>
                  <span>·</span>
                  <span className="text-emerald-400">Live Active</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Composite Architectural Workspace
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Below is an autonomous composite screen generated using your active hotlinked assets queue.
                </p>
              </div>

              {/* Grid of parsed images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {extractedAssets.slice(0, 4).map((asset, idx) => (
                  <div
                    key={asset.id}
                    className="group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 flex flex-col justify-between"
                  >
                    <ImageWithFallback
                      src={asset.url}
                      alt={asset.altText}
                      aspectRatioClass={idx === 0 ? 'aspect-video' : 'aspect-[4/3]'}
                      fallbackTitle={asset.altText}
                    />
                    <div className="p-4 bg-neutral-900/90 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-white">{asset.altText}</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Screen Slot #{idx + 1}</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Rendered Nominal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
