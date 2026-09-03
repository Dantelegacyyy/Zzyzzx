import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, Star, Send, X, CheckCircle2, Sparkles, ThumbsUp } from 'lucide-react';
import { useToast } from './Toast';

export const UserFeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Feature Request');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitted(true);
    showToast('Feedback submitted directly to Cerebro AI team!', 'success');

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setComment('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Feedback Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 glass-button-primary px-4 py-3 rounded-2xl text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] group hover:scale-105 transition-all"
      >
        <MessageSquarePlus size={16} className="text-cyan-300 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Feedback & Ideas</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md glass-panel rounded-3xl p-6 relative overflow-hidden border border-cyan-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500/15 rounded-xl border border-cyan-500/30 text-cyan-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Share Your Feedback</h3>
                    <p className="text-xs text-slate-400">Help shape Cerebro AI features</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Thank You!</h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Your feedback was logged in Cloud SQL. The Cerebro AI engine has processed your rating.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Rating Stars */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-2">
                      Overall Experience Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            size={22}
                            className={
                              star <= (hoverRating || rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-2">
                      Feedback Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Feature Request', 'Usability Bug', 'AI Quality', 'General Praise'].map(
                        (cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`p-2 rounded-xl text-xs font-semibold text-center transition-all ${
                              category === cat
                                ? 'bg-cyan-500 text-zinc-950 shadow-md font-bold'
                                : 'glass-input text-slate-300 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Comment Area */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">
                      Your Comments / Ideas
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what you liked or what you'd love to see next in Cerebro..."
                      className="w-full glass-input rounded-2xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Action */}
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="glass-pill px-4 py-2 rounded-xl text-slate-300 hover:text-white font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="glass-button-primary px-5 py-2 rounded-xl text-white font-bold flex items-center gap-2"
                    >
                      <Send size={14} />
                      <span>Submit Feedback</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
