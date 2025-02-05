
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
  boxesLeft: number;
  favoriteBrawlersInBox: number;
  pinned: boolean;
  repeatHours: number;
}
