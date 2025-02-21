
export interface ListRarityResponse {
  id: number;
  name: string;
}

export interface RarityDetailResponse {
  id: number;
  name: string;
  color: string;
  brawlersOfRarityUnlocked: number;
  totalBrawlersOfRarity: number;
}
