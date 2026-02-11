export interface CountyData {
  id: string;
  name: string;
  nameSwahili: string;
  cri: number;
  population: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topTopics: {
    topic: string;
    language: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    severity: 'low' | 'medium' | 'high';
    mentions: number;
  }[];
  hashtags: string[];
  recentChange: number;
  lastUpdated: string;
}

export const kenyaCounties: CountyData[] = [
  {
    id: "mombasa", name: "Mombasa", nameSwahili: "Mombasa", cri: 35, population: 1208333,
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    topTopics: [
      { topic: "Port development", language: "English", sentiment: "positive", severity: "low", mentions: 1250 },
      { topic: "Tourism recovery", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 890 },
      { topic: "Water shortage", language: "Mijikenda", sentiment: "negative", severity: "medium", mentions: 456 }
    ],
    hashtags: ["#MombasaRising", "#CoastalPeace", "#PortCity"],
    recentChange: -5, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kwale", name: "Kwale", nameSwahili: "Kwale", cri: 38, population: 866820,
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    topTopics: [
      { topic: "Mining disputes", language: "Mijikenda", sentiment: "negative", severity: "medium", mentions: 780 },
      { topic: "Beach tourism", language: "English", sentiment: "positive", severity: "low", mentions: 650 },
      { topic: "Land ownership", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 520 }
    ],
    hashtags: ["#Kwale", "#DianiBeach", "#CoastalDevelopment"],
    recentChange: 2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kilifi", name: "Kilifi", nameSwahili: "Kilifi", cri: 40, population: 1453787,
    sentiment: { positive: 42, neutral: 33, negative: 25 },
    topTopics: [
      { topic: "Tourism recovery", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 1400 },
      { topic: "Squatter issues", language: "Mijikenda", sentiment: "negative", severity: "medium", mentions: 1100 },
      { topic: "Fishing industry", language: "English", sentiment: "neutral", severity: "low", mentions: 750 }
    ],
    hashtags: ["#Kilifi", "#CoastalTourism", "#Malindi"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "tana-river", name: "Tana River", nameSwahili: "Tana River", cri: 62, population: 315943,
    sentiment: { positive: 22, neutral: 30, negative: 48 },
    topTopics: [
      { topic: "Farmer-herder conflict", language: "Pokomo", sentiment: "negative", severity: "high", mentions: 1800 },
      { topic: "Flooding displacement", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 1200 },
      { topic: "Wildlife conservation", language: "English", sentiment: "positive", severity: "low", mentions: 400 }
    ],
    hashtags: ["#TanaRiver", "#FloodRelief", "#PastoralPeace"],
    recentChange: 8, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "lamu", name: "Lamu", nameSwahili: "Lamu", cri: 55, population: 143920,
    sentiment: { positive: 30, neutral: 30, negative: 40 },
    topTopics: [
      { topic: "LAPSSET project impacts", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 900 },
      { topic: "Security concerns", language: "Somali", sentiment: "negative", severity: "high", mentions: 780 },
      { topic: "Heritage tourism", language: "English", sentiment: "positive", severity: "low", mentions: 500 }
    ],
    hashtags: ["#Lamu", "#LAPSSET", "#HeritageIsland"],
    recentChange: 3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "taita-taveta", name: "Taita-Taveta", nameSwahili: "Taita-Taveta", cri: 33, population: 340671,
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    topTopics: [
      { topic: "Wildlife tourism", language: "English", sentiment: "positive", severity: "low", mentions: 950 },
      { topic: "Cross-border trade", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 600 },
      { topic: "Water access", language: "Taita", sentiment: "negative", severity: "medium", mentions: 450 }
    ],
    hashtags: ["#TaitaTaveta", "#Tsavo", "#MtKilimanjaro"],
    recentChange: -3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "garissa", name: "Garissa", nameSwahili: "Garissa", cri: 70, population: 841353,
    sentiment: { positive: 22, neutral: 28, negative: 50 },
    topTopics: [
      { topic: "University security", language: "English", sentiment: "negative", severity: "high", mentions: 2200 },
      { topic: "Refugee integration", language: "Somali", sentiment: "neutral", severity: "medium", mentions: 1800 },
      { topic: "Tana River flooding", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 1400 }
    ],
    hashtags: ["#Garissa", "#TanaRiver", "#NFD"],
    recentChange: 3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "wajir", name: "Wajir", nameSwahili: "Wajir", cri: 75, population: 781263,
    sentiment: { positive: 18, neutral: 27, negative: 55 },
    topTopics: [
      { topic: "Clan conflicts", language: "Somali", sentiment: "negative", severity: "high", mentions: 2900 },
      { topic: "Water scarcity", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 2100 },
      { topic: "Devolution benefits", language: "English", sentiment: "positive", severity: "low", mentions: 650 }
    ],
    hashtags: ["#Wajir", "#PeaceBuilding", "#NEPDevelopment"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "mandera", name: "Mandera", nameSwahili: "Mandera", cri: 85, population: 867457,
    sentiment: { positive: 10, neutral: 20, negative: 70 },
    topTopics: [
      { topic: "Cross-border security", language: "Somali", sentiment: "negative", severity: "high", mentions: 4100 },
      { topic: "Al-Shabaab threats", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 3200 },
      { topic: "Healthcare access", language: "English", sentiment: "negative", severity: "medium", mentions: 1100 }
    ],
    hashtags: ["#Mandera", "#BorderSecurity", "#NEP"],
    recentChange: 5, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "marsabit", name: "Marsabit", nameSwahili: "Marsabit", cri: 68, population: 459785,
    sentiment: { positive: 20, neutral: 28, negative: 52 },
    topTopics: [
      { topic: "Inter-ethnic clashes", language: "Borana", sentiment: "negative", severity: "high", mentions: 2400 },
      { topic: "Drought crisis", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 1900 },
      { topic: "Wind energy projects", language: "English", sentiment: "positive", severity: "low", mentions: 600 }
    ],
    hashtags: ["#Marsabit", "#PeaceCaravan", "#NorthernKenya"],
    recentChange: 7, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "isiolo", name: "Isiolo", nameSwahili: "Isiolo", cri: 58, population: 268002,
    sentiment: { positive: 28, neutral: 30, negative: 42 },
    topTopics: [
      { topic: "Resort city disputes", language: "Borana", sentiment: "negative", severity: "medium", mentions: 1500 },
      { topic: "Pastoralist conflicts", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 1200 },
      { topic: "LAPSSET corridor", language: "English", sentiment: "neutral", severity: "medium", mentions: 800 }
    ],
    hashtags: ["#Isiolo", "#ResortCity", "#NorthernCorridor"],
    recentChange: 4, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "meru", name: "Meru", nameSwahili: "Meru", cri: 38, population: 1545714,
    sentiment: { positive: 45, neutral: 32, negative: 23 },
    topTopics: [
      { topic: "Miraa trade", language: "Meru", sentiment: "neutral", severity: "low", mentions: 1600 },
      { topic: "Mt Kenya tourism", language: "English", sentiment: "positive", severity: "low", mentions: 1200 },
      { topic: "Water projects", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 650 }
    ],
    hashtags: ["#Meru", "#MtKenya", "#Miraa"],
    recentChange: -4, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "tharaka-nithi", name: "Tharaka-Nithi", nameSwahili: "Tharaka-Nithi", cri: 32, population: 393177,
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    topTopics: [
      { topic: "Tea farming", language: "Meru", sentiment: "positive", severity: "low", mentions: 800 },
      { topic: "Chuka University", language: "English", sentiment: "positive", severity: "low", mentions: 500 },
      { topic: "Road infrastructure", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 350 }
    ],
    hashtags: ["#TharakaNithi", "#Chuka", "#MtKenyaRegion"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "embu", name: "Embu", nameSwahili: "Embu", cri: 30, population: 608599,
    sentiment: { positive: 52, neutral: 30, negative: 18 },
    topTopics: [
      { topic: "Agricultural productivity", language: "Embu", sentiment: "positive", severity: "low", mentions: 750 },
      { topic: "University expansion", language: "English", sentiment: "positive", severity: "low", mentions: 500 },
      { topic: "Youth employment", language: "Kiswahili", sentiment: "neutral", severity: "medium", mentions: 400 }
    ],
    hashtags: ["#Embu", "#MtKenyaEast", "#Agriculture"],
    recentChange: -3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kitui", name: "Kitui", nameSwahili: "Kitui", cri: 42, population: 1136187,
    sentiment: { positive: 38, neutral: 35, negative: 27 },
    topTopics: [
      { topic: "Sand harvesting", language: "Kamba", sentiment: "negative", severity: "medium", mentions: 1100 },
      { topic: "Drought resilience", language: "Kiswahili", sentiment: "neutral", severity: "medium", mentions: 900 },
      { topic: "Coal mining debate", language: "English", sentiment: "negative", severity: "medium", mentions: 700 }
    ],
    hashtags: ["#Kitui", "#Ukambani", "#CoalMining"],
    recentChange: 3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "machakos", name: "Machakos", nameSwahili: "Machakos", cri: 32, population: 1421932,
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    topTopics: [
      { topic: "Industrial growth", language: "English", sentiment: "positive", severity: "low", mentions: 1400 },
      { topic: "Maendeleo ya Wanawake", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 890 },
      { topic: "Sand harvesting", language: "Kamba", sentiment: "negative", severity: "medium", mentions: 560 }
    ],
    hashtags: ["#Machakos", "#MachakosLevel", "#Ukambani"],
    recentChange: -8, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "makueni", name: "Makueni", nameSwahili: "Makueni", cri: 34, population: 987653,
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    topTopics: [
      { topic: "Fruit farming success", language: "Kamba", sentiment: "positive", severity: "low", mentions: 900 },
      { topic: "Universal healthcare", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 750 },
      { topic: "Water harvesting", language: "English", sentiment: "positive", severity: "low", mentions: 500 }
    ],
    hashtags: ["#Makueni", "#MakueniModel", "#FruitBasket"],
    recentChange: -5, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nyandarua", name: "Nyandarua", nameSwahili: "Nyandarua", cri: 28, population: 638289,
    sentiment: { positive: 55, neutral: 28, negative: 17 },
    topTopics: [
      { topic: "Dairy farming", language: "Kikuyu", sentiment: "positive", severity: "low", mentions: 800 },
      { topic: "Potato prices", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 600 },
      { topic: "Infrastructure", language: "English", sentiment: "positive", severity: "low", mentions: 400 }
    ],
    hashtags: ["#Nyandarua", "#Olkalou", "#DairyCounty"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nyeri", name: "Nyeri", nameSwahili: "Nyeri", cri: 28, population: 759164,
    sentiment: { positive: 55, neutral: 28, negative: 17 },
    topTopics: [
      { topic: "Tea farming", language: "Kikuyu", sentiment: "positive", severity: "low", mentions: 980 },
      { topic: "Tourism boost", language: "English", sentiment: "positive", severity: "low", mentions: 750 },
      { topic: "Youth programs", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 420 }
    ],
    hashtags: ["#Nyeri", "#MtKenya", "#CentralKenya"],
    recentChange: -6, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kirinyaga", name: "Kirinyaga", nameSwahili: "Kirinyaga", cri: 30, population: 610411,
    sentiment: { positive: 50, neutral: 30, negative: 20 },
    topTopics: [
      { topic: "Rice farming", language: "Kikuyu", sentiment: "positive", severity: "low", mentions: 700 },
      { topic: "Irrigation projects", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 500 },
      { topic: "Market access", language: "English", sentiment: "neutral", severity: "low", mentions: 300 }
    ],
    hashtags: ["#Kirinyaga", "#MweaRice", "#CentralKenya"],
    recentChange: -1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "muranga", name: "Murang'a", nameSwahili: "Murang'a", cri: 33, population: 1056640,
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    topTopics: [
      { topic: "Coffee reforms", language: "Kikuyu", sentiment: "positive", severity: "low", mentions: 900 },
      { topic: "Water projects", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 650 },
      { topic: "Youth empowerment", language: "English", sentiment: "neutral", severity: "low", mentions: 400 }
    ],
    hashtags: ["#Muranga", "#CoffeeReforms", "#CentralKenya"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kiambu", name: "Kiambu", nameSwahili: "Kiambu", cri: 42, population: 2417735,
    sentiment: { positive: 42, neutral: 33, negative: 25 },
    topTopics: [
      { topic: "Real estate boom", language: "English", sentiment: "positive", severity: "low", mentions: 1800 },
      { topic: "Water rationing", language: "Kikuyu", sentiment: "negative", severity: "medium", mentions: 1200 },
      { topic: "Coffee prices", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 750 }
    ],
    hashtags: ["#Kiambu", "#ThikaRoad", "#CentralKenya"],
    recentChange: 2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "turkana", name: "Turkana", nameSwahili: "Turkana", cri: 78, population: 926976,
    sentiment: { positive: 15, neutral: 25, negative: 60 },
    topTopics: [
      { topic: "Cattle rustling", language: "Turkana", sentiment: "negative", severity: "high", mentions: 3500 },
      { topic: "Drought crisis", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 2800 },
      { topic: "Oil exploration benefits", language: "English", sentiment: "negative", severity: "medium", mentions: 1600 }
    ],
    hashtags: ["#Turkana", "#PastoralCrisis", "#NorthernKenya"],
    recentChange: 15, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "west-pokot", name: "West Pokot", nameSwahili: "West Pokot", cri: 72, population: 621241,
    sentiment: { positive: 18, neutral: 25, negative: 57 },
    topTopics: [
      { topic: "Banditry attacks", language: "Pokot", sentiment: "negative", severity: "high", mentions: 2200 },
      { topic: "Landslides", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 1500 },
      { topic: "Road construction", language: "English", sentiment: "positive", severity: "low", mentions: 400 }
    ],
    hashtags: ["#WestPokot", "#Banditry", "#NorthRift"],
    recentChange: 10, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "samburu", name: "Samburu", nameSwahili: "Samburu", cri: 62, population: 310327,
    sentiment: { positive: 25, neutral: 30, negative: 45 },
    topTopics: [
      { topic: "Cattle rustling", language: "Samburu", sentiment: "negative", severity: "high", mentions: 1600 },
      { topic: "Conservancy conflicts", language: "English", sentiment: "negative", severity: "medium", mentions: 980 },
      { topic: "Tourism potential", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 450 }
    ],
    hashtags: ["#Samburu", "#NorthernCorridor", "#PastoralLivelihoods"],
    recentChange: 5, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "trans-nzoia", name: "Trans-Nzoia", nameSwahili: "Trans-Nzoia", cri: 45, population: 990341,
    sentiment: { positive: 38, neutral: 35, negative: 27 },
    topTopics: [
      { topic: "Maize farming", language: "Luhya", sentiment: "positive", severity: "low", mentions: 1200 },
      { topic: "Land disputes", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 900 },
      { topic: "Youth employment", language: "English", sentiment: "neutral", severity: "medium", mentions: 600 }
    ],
    hashtags: ["#TransNzoia", "#Kitale", "#BreadBasket"],
    recentChange: 2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "uasin-gishu", name: "Uasin Gishu", nameSwahili: "Uasin Gishu", cri: 45, population: 1163186,
    sentiment: { positive: 40, neutral: 35, negative: 25 },
    topTopics: [
      { topic: "Athletics success", language: "English", sentiment: "positive", severity: "low", mentions: 2100 },
      { topic: "Maize farming", language: "Kalenjin", sentiment: "neutral", severity: "low", mentions: 1500 },
      { topic: "Youth unemployment", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 980 }
    ],
    hashtags: ["#Eldoret", "#ChampionsCity", "#UasinGishu"],
    recentChange: -3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "elgeyo-marakwet", name: "Elgeyo-Marakwet", nameSwahili: "Elgeyo-Marakwet", cri: 40, population: 454480,
    sentiment: { positive: 42, neutral: 33, negative: 25 },
    topTopics: [
      { topic: "Athletics training", language: "Kalenjin", sentiment: "positive", severity: "low", mentions: 1100 },
      { topic: "Irrigation projects", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 700 },
      { topic: "Kerio Valley insecurity", language: "English", sentiment: "negative", severity: "medium", mentions: 600 }
    ],
    hashtags: ["#ElgeyoMarakwet", "#ItenCity", "#Athletics"],
    recentChange: -1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nandi", name: "Nandi", nameSwahili: "Nandi", cri: 38, population: 885711,
    sentiment: { positive: 44, neutral: 33, negative: 23 },
    topTopics: [
      { topic: "Tea farming", language: "Kalenjin", sentiment: "positive", severity: "low", mentions: 1000 },
      { topic: "Athletics programs", language: "English", sentiment: "positive", severity: "low", mentions: 800 },
      { topic: "Forest encroachment", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 500 }
    ],
    hashtags: ["#Nandi", "#NandiHills", "#TeaCounty"],
    recentChange: -2, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "baringo", name: "Baringo", nameSwahili: "Baringo", cri: 68, population: 666763,
    sentiment: { positive: 20, neutral: 30, negative: 50 },
    topTopics: [
      { topic: "Banditry attacks", language: "Pokot", sentiment: "negative", severity: "high", mentions: 2800 },
      { topic: "Cattle theft", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 2200 },
      { topic: "Lake Baringo flooding", language: "English", sentiment: "negative", severity: "medium", mentions: 1100 }
    ],
    hashtags: ["#Baringo", "#BanditryMenace", "#RiftValley"],
    recentChange: 10, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "laikipia", name: "Laikipia", nameSwahili: "Laikipia", cri: 55, population: 518560,
    sentiment: { positive: 30, neutral: 32, negative: 38 },
    topTopics: [
      { topic: "Land invasions", language: "English", sentiment: "negative", severity: "high", mentions: 2100 },
      { topic: "Wildlife conservation", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 1400 },
      { topic: "Rancher-pastoralist tension", language: "Samburu", sentiment: "negative", severity: "medium", mentions: 980 }
    ],
    hashtags: ["#Laikipia", "#ConservationConflict", "#LandRights"],
    recentChange: 8, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nakuru", name: "Nakuru", nameSwahili: "Nakuru", cri: 65, population: 2162202,
    sentiment: { positive: 25, neutral: 30, negative: 45 },
    topTopics: [
      { topic: "Land disputes", language: "Kikuyu", sentiment: "negative", severity: "high", mentions: 3800 },
      { topic: "IDP resettlement", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 2400 },
      { topic: "Agricultural prices", language: "Kalenjin", sentiment: "neutral", severity: "medium", mentions: 1200 }
    ],
    hashtags: ["#NakuruPeace", "#LandRights", "#RiftValley"],
    recentChange: 8, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "narok", name: "Narok", nameSwahili: "Narok", cri: 50, population: 1157873,
    sentiment: { positive: 35, neutral: 30, negative: 35 },
    topTopics: [
      { topic: "Maasai Mara revenue", language: "Maasai", sentiment: "negative", severity: "medium", mentions: 1800 },
      { topic: "Wheat farming", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 900 },
      { topic: "Wildlife corridors", language: "English", sentiment: "positive", severity: "low", mentions: 700 }
    ],
    hashtags: ["#Narok", "#MaasaiMara", "#WildlifeConservation"],
    recentChange: 4, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kajiado", name: "Kajiado", nameSwahili: "Kajiado", cri: 44, population: 1117840,
    sentiment: { positive: 38, neutral: 32, negative: 30 },
    topTopics: [
      { topic: "Urban expansion", language: "English", sentiment: "neutral", severity: "medium", mentions: 1500 },
      { topic: "Maasai land rights", language: "Maasai", sentiment: "negative", severity: "medium", mentions: 1200 },
      { topic: "Mining activities", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 800 }
    ],
    hashtags: ["#Kajiado", "#KitengalaGrowth", "#MaasaiLand"],
    recentChange: 3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kericho", name: "Kericho", nameSwahili: "Kericho", cri: 35, population: 901777,
    sentiment: { positive: 48, neutral: 32, negative: 20 },
    topTopics: [
      { topic: "Tea industry", language: "Kalenjin", sentiment: "positive", severity: "low", mentions: 1200 },
      { topic: "Land adjudication", language: "Kiswahili", sentiment: "neutral", severity: "medium", mentions: 680 },
      { topic: "Infrastructure", language: "English", sentiment: "positive", severity: "low", mentions: 450 }
    ],
    hashtags: ["#Kericho", "#TeaCounty", "#GreenGold"],
    recentChange: -3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "bomet", name: "Bomet", nameSwahili: "Bomet", cri: 36, population: 875689,
    sentiment: { positive: 45, neutral: 33, negative: 22 },
    topTopics: [
      { topic: "Tea farming", language: "Kalenjin", sentiment: "positive", severity: "low", mentions: 900 },
      { topic: "Youth sports", language: "English", sentiment: "positive", severity: "low", mentions: 600 },
      { topic: "Road networks", language: "Kiswahili", sentiment: "neutral", severity: "low", mentions: 450 }
    ],
    hashtags: ["#Bomet", "#SouthRift", "#TeaFarming"],
    recentChange: -1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kakamega", name: "Kakamega", nameSwahili: "Kakamega", cri: 48, population: 1867579,
    sentiment: { positive: 35, neutral: 35, negative: 30 },
    topTopics: [
      { topic: "Sugar industry crisis", language: "Luhya", sentiment: "negative", severity: "medium", mentions: 2100 },
      { topic: "Forest conservation", language: "English", sentiment: "positive", severity: "low", mentions: 1200 },
      { topic: "Gold mining disputes", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 950 }
    ],
    hashtags: ["#Kakamega", "#WesternKenya", "#Mulembe"],
    recentChange: 4, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "vihiga", name: "Vihiga", nameSwahili: "Vihiga", cri: 35, population: 590013,
    sentiment: { positive: 45, neutral: 33, negative: 22 },
    topTopics: [
      { topic: "Education reforms", language: "Luhya", sentiment: "positive", severity: "low", mentions: 700 },
      { topic: "Tea farming", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 500 },
      { topic: "Overpopulation", language: "English", sentiment: "negative", severity: "medium", mentions: 400 }
    ],
    hashtags: ["#Vihiga", "#WesternKenya", "#Education"],
    recentChange: 0, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "bungoma", name: "Bungoma", nameSwahili: "Bungoma", cri: 52, population: 1670570,
    sentiment: { positive: 32, neutral: 33, negative: 35 },
    topTopics: [
      { topic: "Sugar cane farmers", language: "Luhya", sentiment: "negative", severity: "medium", mentions: 1800 },
      { topic: "Political rallies", language: "Kiswahili", sentiment: "neutral", severity: "medium", mentions: 1400 },
      { topic: "Education access", language: "English", sentiment: "positive", severity: "low", mentions: 780 }
    ],
    hashtags: ["#Bungoma", "#MtElon", "#WesternRegion"],
    recentChange: 6, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "busia", name: "Busia", nameSwahili: "Busia", cri: 40, population: 893681,
    sentiment: { positive: 40, neutral: 33, negative: 27 },
    topTopics: [
      { topic: "Cross-border trade", language: "Luhya", sentiment: "positive", severity: "low", mentions: 1100 },
      { topic: "Fish trade disputes", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 800 },
      { topic: "Sugar farming", language: "English", sentiment: "neutral", severity: "low", mentions: 500 }
    ],
    hashtags: ["#Busia", "#BorderTrade", "#WesternKenya"],
    recentChange: 1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "siaya", name: "Siaya", nameSwahili: "Siaya", cri: 48, population: 993183,
    sentiment: { positive: 35, neutral: 30, negative: 35 },
    topTopics: [
      { topic: "Political activism", language: "Dholuo", sentiment: "negative", severity: "medium", mentions: 1400 },
      { topic: "Fishing rights", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 900 },
      { topic: "Healthcare access", language: "English", sentiment: "neutral", severity: "medium", mentions: 600 }
    ],
    hashtags: ["#Siaya", "#Nyanza", "#LakeVictoria"],
    recentChange: 3, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kisumu", name: "Kisumu", nameSwahili: "Kisumu", cri: 72, population: 1155574,
    sentiment: { positive: 20, neutral: 25, negative: 55 },
    topTopics: [
      { topic: "Political tensions", language: "Dholuo", sentiment: "negative", severity: "high", mentions: 4200 },
      { topic: "Fishing rights dispute", language: "Kiswahili", sentiment: "negative", severity: "high", mentions: 2800 },
      { topic: "Lake Victoria pollution", language: "English", sentiment: "negative", severity: "medium", mentions: 1500 }
    ],
    hashtags: ["#KisumuNow", "#LakeVictoria", "#Nyanza"],
    recentChange: 18, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "homa-bay", name: "Homa Bay", nameSwahili: "Homa Bay", cri: 50, population: 1131950,
    sentiment: { positive: 30, neutral: 30, negative: 40 },
    topTopics: [
      { topic: "Health challenges", language: "Dholuo", sentiment: "negative", severity: "medium", mentions: 1500 },
      { topic: "Fishing industry", language: "Kiswahili", sentiment: "neutral", severity: "medium", mentions: 1100 },
      { topic: "Tourism potential", language: "English", sentiment: "positive", severity: "low", mentions: 500 }
    ],
    hashtags: ["#HomaBay", "#LakeVictoria", "#Nyanza"],
    recentChange: 5, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "migori", name: "Migori", nameSwahili: "Migori", cri: 52, population: 1116436,
    sentiment: { positive: 28, neutral: 32, negative: 40 },
    topTopics: [
      { topic: "Gold mining conflicts", language: "Dholuo", sentiment: "negative", severity: "high", mentions: 1800 },
      { topic: "Cross-border smuggling", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 1200 },
      { topic: "Tobacco farming", language: "English", sentiment: "neutral", severity: "low", mentions: 600 }
    ],
    hashtags: ["#Migori", "#GoldMining", "#SouthNyanza"],
    recentChange: 6, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "kisii", name: "Kisii", nameSwahili: "Kisii", cri: 42, population: 1266860,
    sentiment: { positive: 38, neutral: 35, negative: 27 },
    topTopics: [
      { topic: "Tea and coffee farming", language: "Kisii", sentiment: "positive", severity: "low", mentions: 1100 },
      { topic: "Land fragmentation", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 800 },
      { topic: "Healthcare access", language: "English", sentiment: "neutral", severity: "low", mentions: 500 }
    ],
    hashtags: ["#Kisii", "#GusiiHighlands", "#Agriculture"],
    recentChange: 1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nyamira", name: "Nyamira", nameSwahili: "Nyamira", cri: 35, population: 605576,
    sentiment: { positive: 45, neutral: 33, negative: 22 },
    topTopics: [
      { topic: "Tea farming", language: "Kisii", sentiment: "positive", severity: "low", mentions: 700 },
      { topic: "Education standards", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 500 },
      { topic: "Road infrastructure", language: "English", sentiment: "neutral", severity: "low", mentions: 350 }
    ],
    hashtags: ["#Nyamira", "#GusiiRegion", "#TeaFarming"],
    recentChange: -1, lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "nairobi", name: "Nairobi", nameSwahili: "Nairobi", cri: 58, population: 4397073,
    sentiment: { positive: 30, neutral: 35, negative: 35 },
    topTopics: [
      { topic: "Cost of living protests", language: "English", sentiment: "negative", severity: "high", mentions: 5600 },
      { topic: "Traffic congestion", language: "Kiswahili", sentiment: "negative", severity: "medium", mentions: 3200 },
      { topic: "Tech hub growth", language: "English", sentiment: "positive", severity: "low", mentions: 2100 }
    ],
    hashtags: ["#NairobiMatters", "#CostOfLiving", "#CapitalCity"],
    recentChange: 12, lastUpdated: "2024-01-15T10:30:00Z"
  }
];

// Helper functions
export const getRiskLevel = (cri: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (cri < 35) return 'low';
  if (cri < 55) return 'medium';
  if (cri < 75) return 'high';
  return 'critical';
};

export const getRiskColor = (cri: number): string => {
  const level = getRiskLevel(cri);
  switch (level) {
    case 'low': return 'hsl(145, 65%, 42%)';
    case 'medium': return 'hsl(38, 92%, 50%)';
    case 'high': return 'hsl(0, 75%, 55%)';
    case 'critical': return 'hsl(0, 85%, 45%)';
  }
};

export const getCountyById = (id: string): CountyData | undefined => {
  return kenyaCounties.find(county => county.id === id);
};
