import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, BookOpen, X, Tag } from 'lucide-react';

import blogArticles from '../data/blogData.json';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ['All', 'Travel Guide', 'Safety First', 'Industry Insight'];

  const articles: Article[] = blogArticles;

  // Reset visibleCount when category or search query changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, selectedCategory]);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-24 bg-navy-dark border-b border-text-main/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a45f_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-3 font-semibold font-mono">
            Educational Resources
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-text-main font-light tracking-tight">
            The AMG <span className="italic font-normal text-gold-gradient">Aviation Blog</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-luxury-gold via-luxury-champagne to-luxury-gold mx-auto mt-6" />
          <p className="text-text-muted/70 text-sm mt-4 font-light">
            Stay informed on private aviation regulations, safety standards, travel guides, and luxury air charter developments.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 bg-navy-slate border border-text-main/10 p-4 rounded-xl text-left">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-luxury-gold text-navy-dark border-luxury-gold font-bold'
                    : 'bg-navy-dark text-text-main/60 border-text-main/10 hover:border-luxury-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-main/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-dark border border-text-main/15 hover:border-luxury-gold/30 rounded-lg pl-9 pr-4 py-2 text-xs text-text-main placeholder-[#E2E8F0]/30 focus:border-luxury-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.slice(0, visibleCount).map(art => (
              <div
                key={art.id}
                className="bg-navy-slate rounded-xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group text-left"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-slate via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-navy-dark/80 backdrop-blur rounded text-[9px] font-mono uppercase tracking-wider text-luxury-gold border border-luxury-gold/20 flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-luxury-gold" />
                      <span>{art.category}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-[10px] font-mono text-text-main/40">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                        <span>{art.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-text-main font-semibold group-hover:text-luxury-gold transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-text-muted/65 leading-relaxed font-light font-sans line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-text-main/10 flex items-center justify-between">
                    <button
                      onClick={() => setReadingArticle(art)}
                      className="text-xs font-mono tracking-widest uppercase font-semibold text-luxury-gold hover:text-luxury-champagne flex items-center space-x-2 cursor-pointer group/btn"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 text-luxury-gold group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center border border-dashed border-text-main/10 bg-navy-slate rounded-2xl">
              <BookOpen className="w-12 h-12 text-luxury-gold mx-auto mb-4 opacity-50" />
              <h4 className="font-serif text-lg text-text-main font-light">No articles matched your criteria</h4>
              <p className="text-text-muted/40 text-xs mt-2">Try adjusting your search terms or selecting another category.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredArticles.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-3.5 border border-luxury-gold/30 hover:border-luxury-gold text-xs font-bold font-mono tracking-widest uppercase text-luxury-gold hover:text-luxury-champagne hover:bg-luxury-gold/5 rounded transition-all cursor-pointer shadow-md hover:shadow-luxury-gold/10"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>

      {/* Article Reader Overlay Modal */}
      <AnimatePresence>
        {readingArticle && (
          <div 
            onClick={() => setReadingArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/92 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              layout
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-slate border border-luxury-gold/20 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative text-left cursor-default"
            >
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-navy-dark hover:bg-white/5 text-text-muted/60 hover:text-luxury-gold border border-text-main/10 hover:border-luxury-gold/30 transition-all cursor-pointer z-10"
                aria-label="Close article reader"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Meta details */}
                <div className="flex items-center space-x-4 text-xs font-mono text-luxury-gold">
                  <span className="px-2.5 py-1 bg-luxury-gold/10 border border-luxury-gold/20 rounded">
                    {readingArticle.category}
                  </span>
                  <span className="flex items-center space-x-1 text-text-main/40">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{readingArticle.date}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-text-main/40">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{readingArticle.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-main font-light leading-tight tracking-wide border-b border-text-main/10 pb-4">
                  {readingArticle.title}
                </h2>

                {/* Article body paragraphs */}
                <div className="space-y-4 text-sm text-text-main/80 font-light leading-relaxed font-sans">
                  {readingArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Footer action */}
                <div className="pt-6 border-t border-text-main/10 flex items-center justify-between">
                  <p className="text-xs text-text-main/40 font-mono">Aircraft Management Group, Inc.</p>
                  <button
                    onClick={() => {
                      setReadingArticle(null);
                      const el = document.getElementById('charter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded text-xs font-bold font-mono tracking-widest uppercase text-navy-dark bg-gradient-to-r from-luxury-gold to-luxury-champagne hover:opacity-95 shadow-md shadow-luxury-gold/25"
                  >
                    Request a flight
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
