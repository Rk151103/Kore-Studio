import { useState } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ScreenId } from '../../types';
import { 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  SlidersHorizontal
} from 'lucide-react';

interface AnalyticsScreenProps {
  onSelectScreen: (screen: ScreenId) => void;
}

interface TelemetryRow {
  id: string;
  endpoint: string;
  targetScreen: string;
  latencyMs: number;
  status: 'Nominal' | 'Degraded' | 'Cached';
  requestsPerSec: number;
  lastUpdated: string;
}

export function AnalyticsScreen({ onSelectScreen }: AnalyticsScreenProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'nominal' | 'cached' | 'degraded'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const initialRows: TelemetryRow[] = [
    {
      id: 'TEL-8401',
      endpoint: '/api/v2/screens/overview',
      targetScreen: 'Marquee Landing',
      latencyMs: 38,
      status: 'Cached',
      requestsPerSec: 1420,
      lastUpdated: '01:24:19',
    },
    {
      id: 'TEL-8402',
      endpoint: '/api/v2/screens/analytics',
      targetScreen: 'Telemetry Intelligence',
      latencyMs: 64,
      status: 'Nominal',
      requestsPerSec: 890,
      lastUpdated: '01:25:02',
    },
    {
      id: 'TEL-8403',
      endpoint: '/api/v2/screens/exhibition',
      targetScreen: 'Editorial Showcase',
      latencyMs: 51,
      status: 'Nominal',
      requestsPerSec: 620,
      lastUpdated: '01:25:40',
    },
    {
      id: 'TEL-8404',
      endpoint: '/api/v2/screens/hotlink-proxy',
      targetScreen: 'HTML Importer',
      latencyMs: 82,
      status: 'Cached',
      requestsPerSec: 1140,
      lastUpdated: '01:26:11',
    },
    {
      id: 'TEL-8405',
      endpoint: '/api/v2/screens/editions',
      targetScreen: 'Deployment Editions',
      latencyMs: 44,
      status: 'Nominal',
      requestsPerSec: 410,
      lastUpdated: '01:26:45',
    },
    {
      id: 'TEL-8406',
      endpoint: '/api/v2/media/image-scrim',
      targetScreen: 'Media Fallback Scrim',
      latencyMs: 122,
      status: 'Degraded',
      requestsPerSec: 230,
      lastUpdated: '01:27:01',
    },
  ];

  const filteredRows = initialRows.filter((row) => {
    const matchesSearch =
      row.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.targetScreen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || row.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice('Telemetry audit log exported to CSV successfully.');
      setTimeout(() => setExportNotice(null), 4000);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header & Breadcrumb Contract */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
            <span>Systems</span>
            <span>/</span>
            <span>Kore Production Cluster</span>
            <span>/</span>
            <span className="text-neutral-200">Screen Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Operational Intelligence &amp; Screen Analytics
          </h1>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3">
          {/* Segmented Time Range Buttons */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-xl transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export Audit Log'}</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-neutral-900 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Marquee Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Average Interaction Latency</span>
            <span className="font-mono text-emerald-400 flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5" /> -14.2%
            </span>
          </div>
          <div className="text-3xl font-bold text-white font-mono tabular-nums">
            48.2 ms
          </div>
          <div className="text-[11px] text-neutral-400">
            Across 18,420 simulated viewport mounts
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Screen Transition P99</span>
            <span className="font-mono text-emerald-400 flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5" /> -22.5%
            </span>
          </div>
          <div className="text-3xl font-bold text-white font-mono tabular-nums">
            71.0 ms
          </div>
          <div className="text-[11px] text-neutral-400">
            Zero dropped frames on 120Hz displays
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Hotlinked Image Cache Hit</span>
            <span className="font-mono text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4.8%
            </span>
          </div>
          <div className="text-3xl font-bold text-white font-mono tabular-nums">
            98.6%
          </div>
          <div className="text-[11px] text-neutral-400">
            Fallback scrim engaged on 1.4% invalid URLs
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Throughput Concurrency</span>
            <span className="font-mono text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +38.1%
            </span>
          </div>
          <div className="text-3xl font-bold text-white font-mono tabular-nums">
            4,710 req/s
          </div>
          <div className="text-[11px] text-neutral-400">
            Multi-screen state synchronizations
          </div>
        </div>
      </div>

      {/* Visual Analytics Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 sm:p-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-neutral-400">Display Studio Environment</div>
          <h2 className="text-2xl font-bold text-white font-display">
            Automated Visual Regression &amp; Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Every screen rendered through Kore Studio undergoes automated contrast verification, font cache checks, and media fallback verification before live staging.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectScreen('importer')}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors"
            >
              Test Custom HTML
            </button>
            <button
              onClick={() => onSelectScreen('showcase')}
              className="px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl text-xs font-medium transition-colors"
            >
              Inspect Exhibition Screen
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
            <ImageWithFallback
              src="/src/assets/images/screen_analytics_overview_1791448569866.jpg"
              alt="Telemetry Display Environment"
              aspectRatioClass="aspect-[16/9]"
              fallbackTitle="Operational Intelligence Matrix"
            />
          </div>
        </div>
      </div>

      {/* Telemetry Stream Data Table */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Active Screen Endpoints</span>
            <span className="text-xs text-neutral-400 font-mono">({filteredRows.length} active)</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter endpoints or screens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 w-full sm:w-60"
              />
            </div>

            {/* Status Segmented Buttons */}
            <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
              {(['all', 'nominal', 'cached', 'degraded'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/60 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-6 font-semibold">Identifier</th>
                <th className="py-3 px-6 font-semibold">Target Screen</th>
                <th className="py-3 px-6 font-semibold">Endpoint</th>
                <th className="py-3 px-6 font-semibold text-right">Latency</th>
                <th className="py-3 px-6 font-semibold text-right">Concurrency</th>
                <th className="py-3 px-6 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No active telemetry matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-neutral-400">{row.id}</td>
                    <td className="py-3.5 px-6 font-medium text-white">{row.targetScreen}</td>
                    <td className="py-3.5 px-6 font-mono text-neutral-400">{row.endpoint}</td>
                    <td className="py-3.5 px-6 font-mono tabular-nums text-right font-medium">
                      {row.latencyMs} ms
                    </td>
                    <td className="py-3.5 px-6 font-mono tabular-nums text-right text-neutral-400">
                      {row.requestsPerSec.toLocaleString()} rps
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                          row.status === 'Nominal'
                            ? 'text-emerald-400 bg-emerald-950/50'
                            : row.status === 'Cached'
                            ? 'text-cyan-400 bg-cyan-950/50'
                            : 'text-amber-400 bg-amber-950/50'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.status === 'Nominal'
                              ? 'bg-emerald-400'
                              : row.status === 'Cached'
                              ? 'bg-cyan-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <span>{row.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
