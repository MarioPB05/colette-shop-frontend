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
  user_quantity: number;
  rarity_id: number;
}

export interface InventoryBrawlerResponse {
  id: number;
  name: string;
  image: string;
  user_quantity_actual: number;
  user_quantity_past: number;
}

export interface BrawlerCardResponse {
  id: number;
  name: string;
  model_image: string;

  rarity_id: number;
  rarity_color: string;

  user_quantity: number;
  user_favorite: boolean;
}
