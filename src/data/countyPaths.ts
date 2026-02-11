// SVG path data for all 47 Kenyan counties
// ViewBox: 0 0 480 560
// Coordinate mapping: x = (longitude - 33.5) * 52, y = (5.0 - latitude) * 55

export interface CountyPathData {
  path: string;
  center: { x: number; y: number };
  label: string;
}

export const countyPaths: Record<string, CountyPathData> = {
  // ===== NORTH / NORTHEASTERN =====
  "turkana": {
    path: "M68,15 L140,10 L165,25 L170,80 L155,140 L140,175 L120,195 L95,200 L75,190 L55,160 L48,120 L50,60 Z",
    center: { x: 110, y: 100 },
    label: "Turkana"
  },
  "marsabit": {
    path: "M170,20 L260,10 L310,30 L320,80 L305,140 L275,170 L240,180 L200,175 L170,160 L165,100 L170,80 Z",
    center: { x: 240, y: 95 },
    label: "Marsabit"
  },
  "mandera": {
    path: "M370,10 L430,5 L445,40 L440,90 L420,120 L390,130 L360,115 L355,70 L360,35 Z",
    center: { x: 400, y: 68 },
    label: "Mandera"
  },
  "wajir": {
    path: "M310,30 L355,35 L360,70 L355,115 L390,130 L395,170 L380,210 L340,225 L305,215 L290,180 L290,140 L305,100 L310,60 Z",
    center: { x: 340, y: 140 },
    label: "Wajir"
  },

  // ===== NORTH RIFT =====
  "west-pokot": {
    path: "M55,160 L75,190 L95,200 L100,220 L88,240 L70,245 L52,230 L45,200 L48,175 Z",
    center: { x: 72, y: 205 },
    label: "W.Pokot"
  },
  "samburu": {
    path: "M170,160 L200,175 L220,190 L225,220 L210,245 L185,255 L160,245 L145,225 L140,200 L145,180 Z",
    center: { x: 182, y: 215 },
    label: "Samburu"
  },
  "baringo": {
    path: "M120,195 L140,200 L145,225 L150,250 L140,270 L125,280 L110,275 L100,260 L100,240 L105,220 Z",
    center: { x: 125, y: 245 },
    label: "Baringo"
  },
  "elgeyo-marakwet": {
    path: "M95,200 L105,220 L100,240 L100,260 L90,265 L78,258 L75,245 L78,225 L88,210 Z",
    center: { x: 90, y: 238 },
    label: "E.Marak"
  },
  "laikipia": {
    path: "M160,245 L185,255 L195,270 L192,290 L175,300 L155,295 L140,285 L140,270 L150,255 Z",
    center: { x: 168, y: 275 },
    label: "Laikipia"
  },

  // ===== NORTHEASTERN =====
  "isiolo": {
    path: "M225,170 L275,170 L290,180 L290,215 L280,245 L255,260 L230,255 L215,240 L215,215 L225,190 Z",
    center: { x: 252, y: 215 },
    label: "Isiolo"
  },
  "garissa": {
    path: "M290,215 L340,225 L365,260 L370,310 L355,350 L325,370 L295,355 L275,320 L270,280 L275,250 L280,230 Z",
    center: { x: 320, y: 295 },
    label: "Garissa"
  },

  // ===== WESTERN =====
  "trans-nzoia": {
    path: "M52,230 L70,245 L72,260 L62,272 L48,270 L38,258 L38,242 Z",
    center: { x: 54, y: 255 },
    label: "T.Nzoia"
  },
  "bungoma": {
    path: "M38,258 L48,270 L50,285 L42,298 L28,295 L20,282 L22,268 Z",
    center: { x: 36, y: 280 },
    label: "Bungoma"
  },
  "busia": {
    path: "M12,285 L22,282 L28,295 L30,310 L22,320 L10,318 L5,302 Z",
    center: { x: 18, y: 302 },
    label: "Busia"
  },
  "uasin-gishu": {
    path: "M70,245 L88,240 L100,255 L100,275 L92,290 L78,295 L68,288 L62,272 Z",
    center: { x: 82, y: 270 },
    label: "U.Gishu"
  },
  "nandi": {
    path: "M62,272 L78,278 L78,295 L82,310 L72,320 L58,318 L48,308 L48,290 Z",
    center: { x: 65, y: 300 },
    label: "Nandi"
  },
  "kakamega": {
    path: "M38,290 L50,285 L62,292 L62,310 L55,322 L42,325 L32,315 L30,300 Z",
    center: { x: 47, y: 308 },
    label: "Kakamega"
  },
  "vihiga": {
    path: "M32,315 L42,325 L45,338 L38,345 L28,340 L25,328 Z",
    center: { x: 35, y: 332 },
    label: "Vihiga"
  },

  // ===== NYANZA =====
  "siaya": {
    path: "M10,318 L22,320 L30,332 L28,348 L18,355 L8,350 L3,335 Z",
    center: { x: 17, y: 337 },
    label: "Siaya"
  },
  "kisumu": {
    path: "M28,332 L42,338 L52,348 L48,362 L35,368 L22,360 L18,348 Z",
    center: { x: 35, y: 350 },
    label: "Kisumu"
  },
  "homa-bay": {
    path: "M8,350 L18,355 L28,365 L30,382 L22,395 L10,392 L3,375 L3,360 Z",
    center: { x: 15, y: 375 },
    label: "H.Bay"
  },
  "migori": {
    path: "M10,392 L22,395 L30,410 L25,425 L14,428 L5,418 L3,405 Z",
    center: { x: 16, y: 412 },
    label: "Migori"
  },
  "kisii": {
    path: "M30,382 L42,378 L52,388 L50,405 L40,412 L28,408 L25,395 Z",
    center: { x: 38, y: 395 },
    label: "Kisii"
  },
  "nyamira": {
    path: "M45,362 L58,358 L68,368 L65,382 L52,388 L42,378 Z",
    center: { x: 55, y: 373 },
    label: "Nyamira"
  },

  // ===== SOUTH RIFT =====
  "kericho": {
    path: "M68,318 L82,310 L95,318 L98,338 L88,352 L72,355 L62,342 Z",
    center: { x: 80, y: 335 },
    label: "Kericho"
  },
  "bomet": {
    path: "M62,342 L72,355 L75,372 L68,385 L55,388 L45,378 L48,362 L55,350 Z",
    center: { x: 62, y: 368 },
    label: "Bomet"
  },
  "nakuru": {
    path: "M100,275 L125,280 L140,290 L148,310 L140,335 L125,345 L105,342 L95,328 L92,310 L95,290 Z",
    center: { x: 120, y: 310 },
    label: "Nakuru"
  },
  "narok": {
    path: "M75,385 L95,378 L115,385 L130,400 L135,430 L125,455 L105,465 L80,455 L65,435 L60,410 L68,395 Z",
    center: { x: 100, y: 425 },
    label: "Narok"
  },
  "kajiado": {
    path: "M135,380 L160,365 L180,370 L195,390 L200,420 L195,455 L180,470 L155,468 L135,455 L125,435 L128,410 Z",
    center: { x: 165, y: 425 },
    label: "Kajiado"
  },

  // ===== CENTRAL =====
  "nyandarua": {
    path: "M140,285 L155,295 L158,315 L150,330 L138,335 L128,325 L125,310 L130,295 Z",
    center: { x: 142, y: 312 },
    label: "Nyandarua"
  },
  "nyeri": {
    path: "M175,270 L195,275 L200,295 L192,310 L178,312 L168,302 L165,288 Z",
    center: { x: 182, y: 292 },
    label: "Nyeri"
  },
  "kirinyaga": {
    path: "M200,290 L215,285 L222,300 L218,315 L205,318 L198,308 Z",
    center: { x: 210, y: 302 },
    label: "Kirinyaga"
  },
  "muranga": {
    path: "M168,302 L178,312 L185,328 L178,342 L165,345 L155,335 L155,320 Z",
    center: { x: 170, y: 325 },
    label: "Murang'a"
  },
  "kiambu": {
    path: "M155,335 L168,340 L178,342 L182,358 L175,370 L160,372 L148,362 L145,348 Z",
    center: { x: 163, y: 355 },
    label: "Kiambu"
  },
  "nairobi": {
    path: "M175,362 L190,358 L200,368 L198,382 L185,388 L175,382 Z",
    center: { x: 187, y: 374 },
    label: "Nairobi"
  },

  // ===== EASTERN =====
  "meru": {
    path: "M210,235 L230,230 L245,242 L242,265 L228,278 L215,275 L205,260 L205,248 Z",
    center: { x: 225, y: 255 },
    label: "Meru"
  },
  "tharaka-nithi": {
    path: "M215,275 L228,278 L235,295 L228,310 L218,312 L210,300 Z",
    center: { x: 222, y: 295 },
    label: "T.Nithi"
  },
  "embu": {
    path: "M198,308 L210,300 L218,312 L222,328 L212,340 L200,335 L195,320 Z",
    center: { x: 208, y: 320 },
    label: "Embu"
  },
  "kitui": {
    path: "M222,320 L245,305 L268,310 L280,340 L278,380 L265,410 L245,415 L225,400 L215,375 L212,350 Z",
    center: { x: 248, y: 360 },
    label: "Kitui"
  },
  "machakos": {
    path: "M195,345 L212,340 L222,355 L225,380 L215,395 L200,400 L190,390 L185,370 Z",
    center: { x: 205, y: 372 },
    label: "Machakos"
  },
  "makueni": {
    path: "M200,400 L220,395 L240,410 L248,440 L240,460 L222,465 L205,455 L195,435 L192,418 Z",
    center: { x: 220, y: 432 },
    label: "Makueni"
  },

  // ===== COAST =====
  "tana-river": {
    path: "M295,340 L330,350 L345,380 L340,420 L320,445 L295,440 L275,415 L270,380 L278,355 Z",
    center: { x: 308, y: 395 },
    label: "Tana R."
  },
  "lamu": {
    path: "M345,350 L385,340 L400,360 L395,400 L375,420 L345,415 L335,390 L340,370 Z",
    center: { x: 368, y: 382 },
    label: "Lamu"
  },
  "taita-taveta": {
    path: "M245,440 L275,430 L300,440 L310,465 L305,495 L285,510 L260,505 L240,490 L235,465 Z",
    center: { x: 272, y: 475 },
    label: "T.Taveta"
  },
  "kilifi": {
    path: "M310,440 L340,435 L360,445 L365,475 L355,500 L335,510 L315,505 L305,485 Z",
    center: { x: 335, y: 475 },
    label: "Kilifi"
  },
  "kwale": {
    path: "M285,505 L310,500 L325,510 L330,535 L315,548 L295,545 L280,530 Z",
    center: { x: 305, y: 525 },
    label: "Kwale"
  },
  "mombasa": {
    path: "M330,505 L348,500 L358,510 L355,528 L342,535 L328,528 Z",
    center: { x: 342, y: 517 },
    label: "Mombasa"
  }
};

export const kenyaOutlinePath = "M3,285 L5,260 L12,240 L38,215 L45,180 L48,140 L55,80 L68,15 L170,10 L260,5 L370,5 L430,5 L445,40 L440,90 L420,120 L400,170 L395,220 L385,280 L400,340 L400,400 L395,420 L375,440 L365,475 L358,510 L355,535 L342,548 L315,548 L280,530 L260,510 L235,490 L225,465 L195,455 L155,468 L105,465 L65,435 L25,425 L5,405 L3,375 L3,335 Z";
