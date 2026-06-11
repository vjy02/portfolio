// combination of pulled elos + added some points to favorites
export const WORLD_CUP_TEAM_ELOS = {
  Spain: 2329,
  Argentina: 2283,
  France: 2208,
  England: 2102,
  Brazil: 2111,
  Portugal: 2065,
  Netherlands: 2007,
  Colombia: 1982,
  Ecuador: 1938,
  Germany: 2048,
  Norway: 1914,
  Croatia: 1950,
  Turkey: 1911,
  Japan: 1906,
  Belgium: 1894,
  Uruguay: 1930,
  Switzerland: 1891,
  Mexico: 1875,
  Senegal: 1860,
  Paraguay: 1834,
  Austria: 1830,
  Morocco: 1827,
  Canada: 1788,
  Scotland: 1782,
  Australia: 1777,
  Iran: 1772,
  Algeria: 1760,
  "Korea Republic": 1758,
  "Czech Republic": 1740,
  Panama: 1730,
  "United States": 1726,
  Uzbekistan: 1714,
  Sweden: 1712,
  Egypt: 1696,
  "Ivory Coast": 1695,
  Jordan: 1680,
  "DR Congo": 1652,
  Tunisia: 1628,
  Iraq: 1618,
  "Bosnia and Herzegovina": 1595,
  "Cape Verde": 1578,
  "Saudi Arabia": 1576,
  "New Zealand": 1562,
  Haiti: 1548,
  "South Africa": 1517,
  Ghana: 1510,
  Curaçao: 1434,
  Qatar: 1421,
} as const;

export type TeamName = keyof typeof WORLD_CUP_TEAM_ELOS;

// ─── Dark Horse Config ────────────────────────────────────────────────────────
export const DARK_HORSE_TEAMS = new Set<TeamName>([
  "Australia",
  "Japan",
  "Morocco",
]);

export const DARK_HORSE_ELO_BONUS = 150;

export const DARK_HORSE_VARIANCE_BY_STAGE = {
  group: 0.30,
  round_of_32: 0.25,
  round_of_16: 0.22,
  quarterfinal: 0.18,
  semifinal: 0.12,
  third_place: 0.15,
  final: 0.10,
};