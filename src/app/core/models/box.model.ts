
export interface BoxShopResponse {
  id: number;
  name: string;
  price: number;
  type: string;
  boxesLeft: number;
  favoriteBrawlersInBox: number;
  pinned: boolean;
  popular: boolean;
}

export interface DailyBoxShopResponse {
  id: number;
  name: string;
  type: string;
  favoriteBrawlersInBox: number;
  repeatHours: number;
  claimed: boolean;
}

export interface TableBoxResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: string;
  pinned: boolean;
}
