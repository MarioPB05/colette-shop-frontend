
export interface ListRarityResponse {
  id: number;
  name: string;
}

export interface RarityDetailResponse {
  id: number;
  name: string;
  color: string;
  brawlers_of_rarity_unlocked: number;
  total_brawlers_of_rarity: number;
}
