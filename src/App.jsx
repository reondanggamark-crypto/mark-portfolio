import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import {
  Palette, Layers, Globe, Database, Plus, X, 
  ArrowUpRight, Sparkles, Layout, FileText, Monitor, CheckCircle2
} from 'lucide-react';

// Mga gawa mo base sa SMP, Pubmats, Logos, at BAO Connect system
const SAMPLE_WORKS = [
  {
    id: 1,
    title: 'BAO Connect: Online Inventory & Reservation System',
    category: 'System',
    tools: 'PHP • MySQL • Tailwind CSS',
    description: 'A full-stack web application developed for the Business Affairs Office to streamline item inventories, pre-orders, and reservations.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'CCS Student Organization Official Pubmat',
    category: 'Pubmat',
    tools: 'Adobe Photoshop • Canva Pro',
    description: 'High-impact publication material engineered with maroon and gold branding for university-wide student announcements and events.',
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Brand Identity & Custom Logo Design',
    category: 'Logo',
    tools: 'Adobe Illustrator • Vector',
    description: 'Professional visual identity and emblem systems crafted for organizational branding, campaigns, and merchandise.',
    image_url: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function App() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Pubmat',
    tools: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    fetchWorks();
  }, []);

  async function fetchWorks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setWorks(data);
    } else {
      setWorks(SAMPLE_WORKS);
    }
    setLoading(false);
  }

  async function handleAddWork(e) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('portfolio_items').insert([formData]);
    setSubmitting(false);

    if (!error) {
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Pubmat', tools: '', description: '', image_url: '' });
      fetchWorks();
    } else {
      alert('Database Error: ' + error.message);
    }
  }

  const filteredWorks = activeTab === 'All'
    ? works
    : works.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#800000] selection:text-white">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#800000] border border-white/20 flex items-center justify-center font-serif font-bold text-lg">
              M
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-neutral-400 font-mono">
                BSIT • SMP Major
              </span>
              <span className="text-sm font-bold tracking-wider uppercase">
                Mark Verso Reondangga
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono">
            <a href="#works" className="hover:text-white transition">Creative Works</a>
            <a href="#systems" className="hover:text-white transition">BAO Connect System</a>
            <a href="#about" className="hover:text-white transition">SMP Profile</a>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#800000] hover:bg-[#9e0000] text-white text-xs uppercase tracking-widest font-semibold px-4 py-2.5 transition border border-white/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Work
          </button>
        </div>
      </nav>

      {/* HERO SECTION — SMP & CREATIVE FOCUS */}
      <header className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#80000026,transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#800000] bg-[#800000]/15 text-xs uppercase tracking-[0.2em] text-neutral-200">
              <Sparkles className="w-3.5 h-3.5 text-[#800000]" />
              BSIT Major in Service Management Program (SMP)
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Digital Media Arts, Brand Identity &amp; <span className="text-[#800000] italic font-serif">Web Systems</span>.
            </h1>

            <p className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Welcome to my professional portfolio. I specialize in crafting high-impact publication materials, custom logos, marketing art assets, and functional institutional web systems like <strong className="text-white">BAO Connect</strong>.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#works"
                className="bg-white text-black hover:bg-neutral-200 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition"
              >
                View Design Gallery
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#141414] hover:border-[#800000] text-white border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition cursor-pointer"
              >
                + Upload New Pubmat / System
              </button>
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY CARD */}
          <div className="md:col-span-4">
            <div className="bg-[#111111] border border-white/15 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase tracking-widest text-[#800000] font-bold">SMP Profile</span>
                <span className="w-2 h-2 rounded-full bg-[#800000] animate-pulse" />
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 font-mono">
                <li className="flex items-center justify-between">
                  <span className="text-neutral-500">Program:</span>
                  <span>BSIT - SMP</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-500">Role:</span>
                  <span>Multimedia &amp; Web Dev</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-500">Key Project:</span>
                  <span className="text-white font-bold">BAO Connect System</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-500">Design Tools:</span>
                  <span>Photoshop, Illustrator, Canva</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION: CREATIVE & SYSTEM SHOWCASE */}
      <section id="works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-[#800000] text-xs font-bold uppercase tracking-[0.25em] mb-2 font-mono">
              SMP Portfolio Showcase
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pubmats, Logos, Art Materials &amp; Systems
            </h2>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Works' },
              { id: 'Pubmat', label: 'Pubmats' },
              { id: 'Logo', label: 'Logos & Branding' },
              { id: 'System', label: 'Web Systems (BAO)' },
              { id: 'Other', label: 'Art & Collaterals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs uppercase tracking-widest font-semibold transition border cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#800000] text-white border-[#800000]'
                    : 'bg-transparent text-neutral-400 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* GALLERY GRID */}
        {loading ? (
          <div className="py-20 text-center text-neutral-500 uppercase tracking-widest text-xs font-mono">
            Loading design portfolio from database...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedWork(item)}
                className="group cursor-pointer bg-[#111111] border border-white/10 hover:border-[#800000] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#800000] font-semibold mb-1 font-mono">
                      {item.tools}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 flex items-start justify-between gap-2">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-neutral-500 group-hover:text-white transition" />
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer id="about" className="border-t border-white/10 py-12 px-6 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Mark Verso Reondangga • BSIT-SMP</span>
          <span className="text-neutral-400 font-mono">Service Management Program Portfolio</span>
        </div>
      </footer>

      {/* LIGHTBOX PREVIEW MODAL */}
      {selectedWork && (
        <div
          onClick={() => setSelectedWork(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111111] border border-white/20 max-w-4xl w-full overflow-hidden grid md:grid-cols-12"
          >
            <div className="md:col-span-7 bg-black flex items-center justify-center">
              <img
                src={selectedWork.image_url}
                alt={selectedWork.title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>
            <div className="md:col-span-5 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#800000] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {selectedWork.category}
                  </span>
                  <button
                    onClick={() => setSelectedWork(null)}
                    className="text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-2xl font-bold leading-snug">{selectedWork.title}</h3>
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  Tools: <span className="text-white">{selectedWork.tools}</span>
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed pt-2 border-t border-white/10">
                  {selectedWork.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedWork(null)}
                className="mt-8 w-full py-3 border border-white/20 hover:bg-white hover:text-black text-xs font-bold uppercase tracking-widest transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW WORK / PUBMAT / SYSTEM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#800000] max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wider font-mono">Add Pubmat or System Work</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWork} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-mono">Project / Asset Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., BAO Connect / CCS Pubmat"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black border border-white/15 px-4 py-2.5 text-white focus:border-[#800000] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-mono">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black border border-white/15 px-4 py-2.5 text-white focus:border-[#800000] outline-none"
                  >
                    <option value="Pubmat">Pubmat</option>
                    <option value="Logo">Logo &amp; Branding</option>
                    <option value="System">Web System (BAO)</option>
                    <option value="Other">Art Material</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-mono">Tools Used</label>
                  <input
                    required
                    type="text"
                    placeholder="Photoshop, PHP, Canva"
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    className="w-full bg-black border border-white/15 px-4 py-2.5 text-white focus:border-[#800000] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-mono">Image Public URL</label>
                <input
                  required
                  type="url"
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-black border border-white/15 px-4 py-2.5 text-white focus:border-[#800000] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-mono">Description / Details</label>
                <textarea
                  rows="3"
                  placeholder="Describe your design concept or system features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black border border-white/15 px-4 py-2.5 text-white focus:border-[#800000] outline-none"
                />
              </div>

              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#9e0000] text-white font-bold uppercase tracking-widest text-xs py-3.5 transition cursor-pointer"
              >
                {submitting ? 'Saving to Database...' : 'Save to SMP Portfolio'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}