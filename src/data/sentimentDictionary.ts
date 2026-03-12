export interface DictionaryEntry {
  word: string;
  language: 'sheng' | 'kikamba' | 'kiswahili' | 'english';
  sentiment: 'positive' | 'neutral' | 'negative';
  contextNote?: string;
}

export const sentimentDictionary: DictionaryEntry[] = [
  // Sheng expressions
  { word: 'poa', language: 'sheng', sentiment: 'positive', contextNote: 'Cool, fine, good' },
  { word: 'fiti', language: 'sheng', sentiment: 'positive', contextNote: 'Great, excellent' },
  { word: 'sawa', language: 'sheng', sentiment: 'neutral', contextNote: 'Okay, alright' },
  { word: 'noma', language: 'sheng', sentiment: 'negative', contextNote: 'Context dependent - can mean amazing or terrible' },
  { word: 'mbaya sana', language: 'sheng', sentiment: 'negative', contextNote: 'Very bad' },
  { word: 'moto', language: 'sheng', sentiment: 'positive', contextNote: 'Hot, exciting, trending' },
  { word: 'ngori', language: 'sheng', sentiment: 'negative', contextNote: 'Difficult, hard situation' },
  { word: 'mambo', language: 'sheng', sentiment: 'neutral', contextNote: 'Things, what\'s up' },
  { word: 'shida', language: 'sheng', sentiment: 'negative', contextNote: 'Problem, trouble' },
  { word: 'buda', language: 'sheng', sentiment: 'neutral', contextNote: 'Father, old man' },
  { word: 'dem', language: 'sheng', sentiment: 'neutral', contextNote: 'Girl, woman' },
  { word: 'mbogi', language: 'sheng', sentiment: 'neutral', contextNote: 'Group, squad' },
  { word: 'rada', language: 'sheng', sentiment: 'negative', contextNote: 'Suspect, on the radar' },
  { word: 'maze', language: 'sheng', sentiment: 'neutral', contextNote: 'Exclamation, wow' },
  { word: 'beshte', language: 'sheng', sentiment: 'positive', contextNote: 'Best friend' },

  // Kikamba expressions
  { word: 'ni wega', language: 'kikamba', sentiment: 'positive', contextNote: 'It is good' },
  { word: 'ni mbai', language: 'kikamba', sentiment: 'negative', contextNote: 'It is bad' },
  { word: 'ndasya', language: 'kikamba', sentiment: 'negative', contextNote: 'Annoyed, frustrated' },
  { word: 'ni sawa', language: 'kikamba', sentiment: 'neutral', contextNote: 'It is okay' },
  { word: 'mwanya', language: 'kikamba', sentiment: 'positive', contextNote: 'Beautiful, wonderful' },
  { word: 'ngwatanio', language: 'kikamba', sentiment: 'positive', contextNote: 'Unity, togetherness' },
  { word: 'thina', language: 'kikamba', sentiment: 'negative', contextNote: 'Suffering, hardship' },
  { word: 'wiathi', language: 'kikamba', sentiment: 'positive', contextNote: 'Freedom, independence' },

  // Kiswahili expressions
  { word: 'hatari', language: 'kiswahili', sentiment: 'negative', contextNote: 'Danger' },
  { word: 'amani', language: 'kiswahili', sentiment: 'positive', contextNote: 'Peace' },
  { word: 'maendeleo', language: 'kiswahili', sentiment: 'positive', contextNote: 'Development, progress' },
  { word: 'ufisadi', language: 'kiswahili', sentiment: 'negative', contextNote: 'Corruption' },
  { word: 'ghasia', language: 'kiswahili', sentiment: 'negative', contextNote: 'Violence, unrest' },
  { word: 'umoja', language: 'kiswahili', sentiment: 'positive', contextNote: 'Unity' },
  { word: 'haki', language: 'kiswahili', sentiment: 'positive', contextNote: 'Justice, rights' },
  { word: 'ukosefu', language: 'kiswahili', sentiment: 'negative', contextNote: 'Lack, shortage' },
  { word: 'furaha', language: 'kiswahili', sentiment: 'positive', contextNote: 'Happiness, joy' },
  { word: 'matatizo', language: 'kiswahili', sentiment: 'negative', contextNote: 'Problems, issues' },
  { word: 'tumaini', language: 'kiswahili', sentiment: 'positive', contextNote: 'Hope' },
  { word: 'dharau', language: 'kiswahili', sentiment: 'negative', contextNote: 'Contempt, disrespect' },
];

export const getLanguageColor = (lang: string): string => {
  switch (lang.toLowerCase()) {
    case 'english': return 'hsl(200, 80%, 55%)';
    case 'kiswahili': return 'hsl(145, 65%, 42%)';
    case 'sheng': return 'hsl(280, 60%, 55%)';
    case 'kikamba': return 'hsl(38, 92%, 50%)';
    default: return 'hsl(215, 15%, 55%)';
  }
};
