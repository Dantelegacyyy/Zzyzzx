import React, { useState, useEffect } from 'react';
import {
  Brain,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  ChevronRight,
} from 'lucide-react';
import { api } from '../../lib/api';

interface GraphNode {
  id: string;
  label: string;
  type: 'course' | 'module' | 'concept';
  level: number;
  color: string;
  category: string;
  mastery?: number;
  x?: number;
  y?: number;
}

interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export function KnowledgeGraphView() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true);
        const res = await api.get('/workspace/knowledge-graph');
        if (res.nodes && res.edges) {
          // Pre-compute coordinates in a spherical / radial network layout
          const positionedNodes: GraphNode[] = res.nodes.map((node: GraphNode, i: number) => {
            const angle = (i / res.nodes.length) * 2 * Math.PI;
            const radius = node.level === 1 ? 110 : node.level === 2 ? 210 : 310;
            return {
              ...node,
              x: 400 + radius * Math.cos(angle),
              y: 350 + radius * Math.sin(angle),
            };
          });
          setNodes(positionedNodes);
          setEdges(res.edges);
          setSelectedNode(positionedNodes[2] || positionedNodes[0]);
        }
      } catch (err) {
        console.error('Failed to load knowledge graph:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGraph();
  }, []);

  const categories = ['All', 'Core CS', 'Mathematics', 'Engineering', 'AI & Data', 'Systems'];

  const filteredNodes = nodes.filter((n) => {
    const matchCategory = activeCategory === 'All' || n.category === activeCategory;
    const matchQuery = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Brain size={16} />
            <span>P3-15 Academic Intelligence System</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Knowledge Graph</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Explore synaptic concept maps, course prerequisites, and mastery tracking across your academic domain.
          </p>
        </div>

        {/* Global Graph Stats */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="glass-card px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block font-mono">NODES</span>
            <span className="text-sm font-bold text-cyan-300">{nodes.length} Concepts</span>
          </div>
          <div className="glass-card px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block font-mono">EDGES</span>
            <span className="text-sm font-bold text-indigo-300">{edges.length} Synapses</span>
          </div>
          <div className="glass-card px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block font-mono">AVG MASTERY</span>
            <span className="text-sm font-bold text-emerald-300">86.8%</span>
          </div>
        </div>
      </div>

      {/* Filter Ribbon & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-1.5 flex items-center gap-1">
            <Filter size={13} /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'glass-pill text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input & Zoom Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              placeholder="Search concepts or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-9 pr-3 py-1.5 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center glass-input p-0.5 rounded-xl">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              title="Zoom Out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              title="Zoom In"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/5 ml-0.5"
              title="Reset Zoom"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspection Drawer Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Knowledge Graph Viewport */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-4 sm:p-6 min-h-[540px] relative overflow-hidden flex items-center justify-center border border-slate-800/80 bg-[#040814]">
          {/* Subtle Ambient Background Grids */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Synthesizing Neural Synapses...</p>
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-300 overflow-auto"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg className="w-[800px] h-[700px] select-none" viewBox="0 0 800 700">
                <defs>
                  <filter id="nodeGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Draw Edges */}
                {edges.map((edge, idx) => {
                  const s = nodeMap.get(edge.source);
                  const t = nodeMap.get(edge.target);
                  if (!s || !t || !s.x || !s.y || !t.x || !t.y) return null;
                  const isHighlighted =
                    selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id);

                  return (
                    <g key={`edge-${idx}`}>
                      <line
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={isHighlighted ? '#38bdf8' : 'url(#edgeGrad)'}
                        strokeWidth={isHighlighted ? 2.5 : 1.2}
                        strokeDasharray={isHighlighted ? 'none' : '4 4'}
                        opacity={isHighlighted ? 0.9 : 0.4}
                      />
                    </g>
                  );
                })}

                {/* Draw Center Core Pulse */}
                <circle cx={400} cy={350} r={40} fill="#06b6d4" opacity="0.08" className="animate-ping" />
                <circle cx={400} cy={350} r={16} fill="#0A111F" stroke="#38bdf8" strokeWidth="2" />
                <text
                  x={400}
                  y={354}
                  textAnchor="middle"
                  fill="#38bdf8"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  CORE
                </text>

                {/* Draw Nodes */}
                {filteredNodes.map((node) => {
                  if (!node.x || !node.y) return null;
                  const isSelected = selectedNode?.id === node.id;
                  const r = node.type === 'course' ? 26 : node.type === 'module' ? 20 : 16;

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer transition-all duration-200"
                    >
                      {/* Selection Aura */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 8}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          className="animate-spin"
                          style={{ animationDuration: '8s' }}
                        />
                      )}

                      {/* Main Node Body */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r}
                        fill={isSelected ? '#1e293b' : '#0a1124'}
                        stroke={node.color}
                        strokeWidth={isSelected ? 3 : 2}
                        filter={isSelected ? 'url(#nodeGlow)' : undefined}
                      />

                      {/* Inner Dot */}
                      <circle cx={node.x} cy={node.y} r={r * 0.4} fill={node.color} opacity="0.8" />

                      {/* Node Label Text */}
                      <text
                        x={node.x}
                        y={node.y + r + 13}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#cbd5e1'}
                        fontSize={node.type === 'course' ? '11' : '10'}
                        fontWeight={isSelected ? 'bold' : '500'}
                        className="pointer-events-none drop-shadow-md"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Node Inspection Drawer */}
        <div className="lg:col-span-1 space-y-4">
          {selectedNode ? (
            <div className="glass-card rounded-3xl p-6 space-y-5 border border-slate-700/60 shadow-xl bg-[#090E1F]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {selectedNode.type.toUpperCase()} NODE
                </span>
                <span className="text-xs font-medium text-slate-400">{selectedNode.category}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-1">{selectedNode.label}</h3>
                <p className="text-xs text-slate-300">
                  Synthesized from lecture slides, syllabus prerequisites, and Canvas course materials.
                </p>
              </div>

              {/* Mastery Level Gauge */}
              <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Concept Mastery</span>
                  <span className="font-bold text-cyan-400">{selectedNode.mastery || 85}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${selectedNode.mastery || 85}%` }}
                  />
                </div>
              </div>

              {/* Connected Relationships */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers size={14} className="text-indigo-400" /> Synaptic Links
                </h4>
                <div className="space-y-1.5">
                  {edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((edge, i) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = nodeMap.get(otherId);
                      if (!otherNode) return null;
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedNode(otherNode)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center gap-2 text-xs text-slate-200">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: otherNode.color }}
                            />
                            <span className="font-medium group-hover:text-cyan-300">
                              {otherNode.label}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                            {edge.relationship}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Quick Knowledge Actions */}
              <div className="space-y-2 pt-2">
                <button className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/30 transition-all">
                  <Sparkles size={14} />
                  <span>Generate AI Practice Quiz</span>
                </button>
                <button className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all">
                  <BookOpen size={14} />
                  <span>Open Related Notes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-8 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
              <Info size={32} className="text-cyan-400 mb-2 opacity-50" />
              <p className="text-sm font-medium text-slate-200">Select any node on the graph</p>
              <p className="text-xs text-slate-400 mt-1">
                Click a course, topic, or theorem to inspect its mastery and prerequisites.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
