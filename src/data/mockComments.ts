export interface Comment {
  id: string;
  text: string;
  county: string;
  language: 'English' | 'Kiswahili' | 'Sheng' | 'Kikamba';
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
  source: string;
}

export const mockComments: Comment[] = [
  { id: '1', text: 'The new road project in our area is really helping farmers reach markets faster.', county: 'Nakuru', language: 'English', sentiment: 'positive', date: '2024-01-15', source: 'Social Media' },
  { id: '2', text: 'Maji yamekuwa shida kubwa sana huku kwetu. Hatuna maji ya kunywa.', county: 'Turkana', language: 'Kiswahili', sentiment: 'negative', date: '2024-01-15', source: 'SMS Feedback' },
  { id: '3', text: 'Mambo ni poa hapa, serikali imefanya kazi sawa sawa.', county: 'Nairobi', language: 'Sheng', sentiment: 'positive', date: '2024-01-14', source: 'Social Media' },
  { id: '4', text: 'Ni mbai muno. Mavuno ni mathuku na tũtekwona ũtethyo.', county: 'Machakos', language: 'Kikamba', sentiment: 'negative', date: '2024-01-14', source: 'Community Forum' },
  { id: '5', text: 'Security situation has deteriorated. We fear for our lives every night.', county: 'Mandera', language: 'English', sentiment: 'negative', date: '2024-01-15', source: 'SMS Feedback' },
  { id: '6', text: 'Hospitali mpya imefunguliwa na huduma ni nzuri sana.', county: 'Kisumu', language: 'Kiswahili', sentiment: 'positive', date: '2024-01-13', source: 'Social Media' },
  { id: '7', text: 'Hii maneno ya ushuru ni ngori sana, watu wanateseka.', county: 'Mombasa', language: 'Sheng', sentiment: 'negative', date: '2024-01-15', source: 'Social Media' },
  { id: '8', text: 'Ngwatanio ya athiani nĩ nzeo mũno. Tũkwenda na mbee.', county: 'Kitui', language: 'Kikamba', sentiment: 'positive', date: '2024-01-12', source: 'Community Forum' },
  { id: '9', text: 'Youth unemployment remains the biggest challenge for our county.', county: 'Kiambu', language: 'English', sentiment: 'negative', date: '2024-01-15', source: 'Survey' },
  { id: '10', text: 'Mradi wa maji umekamilika na sasa kila mtu anapata maji safi.', county: 'Makueni', language: 'Kiswahili', sentiment: 'positive', date: '2024-01-14', source: 'SMS Feedback' },
  { id: '11', text: 'Cattle raids have increased significantly this month.', county: 'West Pokot', language: 'English', sentiment: 'negative', date: '2024-01-15', source: 'Community Forum' },
  { id: '12', text: 'Shule mpya zimejengwa na watoto wanasoma vizuri.', county: 'Bungoma', language: 'Kiswahili', sentiment: 'positive', date: '2024-01-13', source: 'Social Media' },
  { id: '13', text: 'Soko ya fiti pale CBD, biashara iko sawa.', county: 'Nairobi', language: 'Sheng', sentiment: 'positive', date: '2024-01-15', source: 'Social Media' },
  { id: '14', text: 'Thina wa mũthanga nĩ mũnene. Ala maũndũ maa mathĩnĩtwe.', county: 'Makueni', language: 'Kikamba', sentiment: 'negative', date: '2024-01-14', source: 'Community Forum' },
  { id: '15', text: 'Inter-clan tensions are rising near the border areas.', county: 'Garissa', language: 'English', sentiment: 'negative', date: '2024-01-15', source: 'SMS Feedback' },
  { id: '16', text: 'Kilimo kinafanya vizuri mwaka huu. Mazao mengi ya mahindi.', county: 'Trans-Nzoia', language: 'Kiswahili', sentiment: 'positive', date: '2024-01-13', source: 'Survey' },
  { id: '17', text: 'Rada ya corruption iko juu sana hapa county.', county: 'Nairobi', language: 'Sheng', sentiment: 'negative', date: '2024-01-15', source: 'Social Media' },
  { id: '18', text: 'Drought is killing our livestock. We need urgent relief.', county: 'Marsabit', language: 'English', sentiment: 'negative', date: '2024-01-15', source: 'SMS Feedback' },
  { id: '19', text: 'Amani imerejea baada ya mazungumzo ya wazee wa jamii.', county: 'Wajir', language: 'Kiswahili', sentiment: 'positive', date: '2024-01-14', source: 'Community Forum' },
  { id: '20', text: 'Ni wega mũno! Sũkũũ ya athiani nĩ ĩũkĩtwe.', county: 'Kitui', language: 'Kikamba', sentiment: 'positive', date: '2024-01-12', source: 'Community Forum' },
];
