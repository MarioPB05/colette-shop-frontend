export interface TableBrawlerResponse {
  id: number;
  name: string;
  num_people: number;
  num_favourite: number;
  pin_image: string;
  rarity: string;
}

export interface ListBrawlerResponse {
  id: number;
  name: string;
  image: string;
  rarity: string;
}

export interface BrawlerProbabilityResponse {
  id: number;
  name: string;
  image: string;
  rarityId: number;
  rarity: string;
  userFavorite: boolean;
  probability: number;
}
