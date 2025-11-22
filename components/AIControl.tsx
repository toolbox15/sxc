import React, { useState } from 'react';
import { generateMenu } from '../services/geminiService';
import { MenuItem } from '../types';
import { Sparkles, Loader2, X } from 'lucide-react';

interface AIControlProps {
  onUpdateMenu: (items: MenuItem[]) => void;
  onUpdateBg: (url: string) => void;
}

export const AIControl: React.FC<AIControlProps> = ({ onUpdateMenu, onUpdateBg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const newItems = await generateMenu(theme);
      onUpdateMenu(newItems);
      
      // Simple logic to switch backgrounds based on keywords (client-side simulation for visual variety)
      const lowerTheme = theme.toLowerCase();
      if (lowerTheme.includes('summer') || lowerTheme.includes('iced') || lowerTheme.includes('beach')) {
        onUpdateBg("https://images.unsplash.com/photo-1517959105821-eaf2591984ca?q=80&w=2673&auto=format&fit=crop"); // Iced coffee vibe
      } else if (lowerTheme.includes('winter') || lowerTheme.includes('cozy') || lowerTheme.includes('christmas')) {
        onUpdateBg("https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=2574&auto=format&fit=crop"); // Cozy light
      } else if (lowerTheme.includes('matcha') || lowerTheme.includes('tea') || lowerTheme.includes('green')) {
        onUpdateBg("https://images.unsplash.com/photo-1582794543139-8ac5e548ad12?q=80&w=2670&auto=format&fit=crop"); // Green/Tea
      } else {
        // Reset to default rustic
        onUpdateBg("https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop");
      }

      setIsOpen(false);
      setTheme('');
    } catch (err) {
      setError("Failed to generate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 shadow-lg border border-white/10"
      >
        <Sparkles className="h-4 w-4 text-amber-300 group-hover:animate-spin" />
        <span>AI Menu Chef</span>
      </button>
    );
  }

  return (
    <div className="w-80 rounded-2xl bg-black/80 p-6 shadow-2xl backdrop-blur-xl border border-white/10 animate-fade-in-up">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Generate Specials
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">THEME / VIBE</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., Pumpkin Spice, Summer Refreshers, Gothic"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}

        <button
          onClick={handleGenerate}
          disabled={isLoading || !theme.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Brewing...
            </>
          ) : (
            'Generate Menu'
          )}
        </button>
      </div>
    </div>
  );
};