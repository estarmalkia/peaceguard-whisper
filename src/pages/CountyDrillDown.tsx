import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { kenyaCounties } from '@/data/kenyaCounties';
import { mockComments, Comment } from '@/data/mockComments';

const languageColors: Record<string, string> = {
  English: 'bg-info/20 text-info',
  Kiswahili: 'bg-risk-low/20 text-risk-low',
  Sheng: 'bg-[hsl(280,60%,55%)]/20 text-[hsl(280,60%,55%)]',
  Kikamba: 'bg-risk-medium/20 text-risk-medium',
};

const sentimentColors: Record<string, string> = {
  positive: 'bg-sentiment-positive/20 text-sentiment-positive',
  neutral: 'bg-sentiment-neutral/20 text-sentiment-neutral',
  negative: 'bg-sentiment-negative/20 text-sentiment-negative',
};

const CountyDrillDown = () => {
  const [countyFilter, setCountyFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return mockComments.filter(c => {
      if (countyFilter !== 'all' && c.county !== countyFilter) return false;
      if (sentimentFilter !== 'all' && c.sentiment !== sentimentFilter) return false;
      if (languageFilter !== 'all' && c.language !== languageFilter) return false;
      if (searchQuery && !c.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [countyFilter, sentimentFilter, languageFilter, searchQuery]);

  const uniqueCounties = [...new Set(mockComments.map(c => c.county))].sort();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground text-sm">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary/50 border-border"
            />
          </div>
          <select
            value={countyFilter}
            onChange={e => setCountyFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-secondary/50 border border-border text-foreground text-sm"
          >
            <option value="all">All Counties</option>
            {uniqueCounties.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={sentimentFilter}
            onChange={e => setSentimentFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-secondary/50 border border-border text-foreground text-sm"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <select
            value={languageFilter}
            onChange={e => setLanguageFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-secondary/50 border border-border text-foreground text-sm"
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Kiswahili">Kiswahili</option>
            <option value="Sheng">Sheng</option>
            <option value="Kikamba">Kikamba</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageSquare className="w-4 h-4" />
        <span>{filtered.length} anonymized comments found</span>
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {filtered.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-4"
          >
            <p className="text-sm text-foreground mb-3">{comment.text}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{comment.county}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${languageColors[comment.language] || ''}`}>{comment.language}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${sentimentColors[comment.sentiment]}`}>
                {comment.sentiment === 'positive' ? '🙂' : comment.sentiment === 'negative' ? '😡' : '😐'} {comment.sentiment}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">{comment.date}</span>
              <span className="text-xs text-muted-foreground">• {comment.source}</span>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No comments match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountyDrillDown;
