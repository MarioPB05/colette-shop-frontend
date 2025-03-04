
export interface BoxShopResponse {
  id: number;
  name: string;
  price: number;
  type: string;
  boxes_left: number;
  favorite_brawlers_in_box: number;
  pinned: boolean;
  popular: boolean;
}

export interface DailyBoxShopResponse {
  id: number;
  name: string;
  type: string;
  favorite_brawlers_in_box: number;
  repeat_every_hours: number;
  claimed: boolean;
  last_claimed: string;
}

export interface TableBoxResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: string;
  pinned: boolean;
  isDaily: boolean;
}

export interface BoxDetailResponse {
  id: number;
  name: string;
  price: number;
  type: string;
  boxes_left: number;
  brawler_quantity: number;
  is_daily: boolean;
  claimed: boolean;
}

export interface InventoryBoxResponse {
  id: number;
  box_id: number;
  type: string;
  brawler_quantity: number;
  open: boolean;
}
