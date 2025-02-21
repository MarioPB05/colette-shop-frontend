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
  rarity_id: number;
  rarity: string;
  user_favorite: boolean;
  probability: number;
}

export interface UserBrawlerProbabilityResponse {
  id: number;
  name: string;
  image: string;
  model_image: string;
  probability: number;
  quantity: number;
  rarity_id: number;
}
