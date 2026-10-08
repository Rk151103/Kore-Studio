import { useState } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ScreenId, ShowcaseProject } from '../../types';
import { 
  ArrowUpRight, 
  X, 
  ExternalLink, 
  Layers, 
  Grid3X3, 
  Maximize2,
  Calendar,
  Building
} from 'lucide-react';

interface ShowcaseScreenProps {
  onSelectScreen: (screen: ScreenId) => void;
}

export function ShowcaseScreen({ onSelectScreen }: ShowcaseScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ShowcaseProject | null>(null);

  const projects: ShowcaseProject[] = [
    {
      id: 'proj-01',
      title: 'Aura Spatial Telemetry Console',
      category: 'Product',
      year: '2026',
      summary: 'A multi-screen command deck engineered for distributed compute clusters with real-time hardware telemetry and sub-50ms render loop.',
      deliverables: ['Spatial Design System', 'Component Token Matrix', 'Tabular Font Engine'],
      imageUrl: '/src/assets/images/screen_creative_showcase_1791448589246.jpg',
      client: 'Kore Aeronautics',
      metric: '48ms P99 Latency Across 14 Node Clusters',
    },
    {
      id: 'proj-02',
      title: 'Monolith Executive Workstation',
      category: 'Systems',
      year: '2026',
      summary: 'Bespoke operational design system tailored for private financial institutions with zero-slop layout geometry and dense tabular reporting.',
      deliverables: ['Core UI Architecture', 'SVG Telemetry Charts', 'Audit Trail Engine'],
      imageUrl: '/src/assets/images/hero_product_interface_1791448551489.jpg',
      client: 'Vance Capital Partners',
      metric: '$2.8B Daily Trading Flow Monitored',
    },
    {
      id: 'proj-03',
      title: 'Travertine Exhibition Monograph',
      category: 'Visual',
      year: '2025',
      summary: 'Tactile editorial catalogue and digital companion application presenting modular architectural pavilions.',
      deliverables: ['Editorial Typography', 'Micro-interactions', 'Image Scrim Layer'],
      imageUrl: '/src/assets/images/screen_creative_showcase_1791448589246.jpg',
      client: 'Munich Pavilion Archive',
      metric: 'Award of Distinction in Editorial Typography',
    },
    {
      id: 'proj-04',
      title: 'Quantum Ledger Interface',
      category: 'Architecture',
      year: '2026',
      summary: 'High-density web canvas for ledger synchronization with direct HTML hotlink ingestion and live state reflection.',
      deliverables: ['HTML Parsing Pipeline', 'Zero-Broken-Image Scrim', 'Responsive Breakpoint Matrix'],
      imageUrl: '/src/assets/images/screen_analytics_overview_1791448569866.jpg',
      client: 'Sovereign Systems Lab',
      metric: '99.99% Render Resilience Score',
    },
  ];

  const categories = ['All', 'Product', 'Systems', 'Visual', 'Architecture'];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Screen Title & Editorial Statement */}
      <div className="space-y-4 pb-8 border-b border-neutral-800">
        <div className="text-xs font-mono text-neutral-400">Curated Exhibition</div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
              Exhibition of Screen Architectures
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mt-2 leading-relaxed">
              Explore our catalogue of multi-screen applications, spatial platforms, and high-density digital environments.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exhibition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setActiveProjectModal(project)}
            className="group cursor-pointer bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between"
          >
            {/* Project Image Frame */}
            <div className="relative overflow-hidden bg-neutral-950">
              <ImageWithFallback
                src={project.imageUrl}
                alt={project.title}
                aspectRatioClass="aspect-[16/10]"
                fallbackTitle={project.title}
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-2 rounded-xl text-white">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Project Meta Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
                <span className="font-mono text-neutral-500">{project.client}</span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                {project.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                {project.summary}
              </p>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 tabular-nums">
                  {project.metric}
                </span>
                <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Inspector Modal */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Image Header */}
            <div className="relative">
              <ImageWithFallback
                src={activeProjectModal.imageUrl}
                alt={activeProjectModal.title}
                aspectRatioClass="aspect-[16/9]"
                fallbackTitle={activeProjectModal.title}
              />
              <button
                onClick={() => setActiveProjectModal(null)}
                aria-label="Close project modal"
                className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-950/80 backdrop-blur-md text-white hover:bg-neutral-800 transition-colors border border-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">{activeProjectModal.category} Architecture</span>
                  <span>·</span>
                  <span>Completed {activeProjectModal.year}</span>
                </div>
                <span className="font-mono text-neutral-400">{activeProjectModal.client}</span>
              </div>

              <div>
                <h3 id="project-modal-title" className="text-2xl font-bold text-white font-display">
                  {activeProjectModal.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  {activeProjectModal.summary}
                </p>
              </div>

              {/* Proven Metric Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Verified Outcome Metric
                </div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                  {activeProjectModal.metric}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Architectural Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeProjectModal.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300 font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    onSelectScreen('importer');
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  Hotlink to Live Importer
                </button>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
