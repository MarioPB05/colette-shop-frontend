import {CartItemRequest} from '@models/box.model';

export interface TableOrderResponse {
  id: number;
  invoice_number: string;
  purchase_date: string;
  state: string;
  username: string;
  user_image: string;
  discount: number;
  total_price: number;
  total_with_discount: number;
}

export interface InventoryOrderDetailsResponse {
  id: number;
  price: number;
  collectDate: string;
  boxName: string;
  boxType: string;
  quantity: number;
  totalPrice: number;
}

export interface OrderParticipantResponse {
  id: number;
  username: string;
  name: string;
  surname: string;
  dni: string;
}

export interface OrderDetailsResponse {
  from: OrderParticipantResponse;
  to: OrderParticipantResponse;
  subTotal: number;
  total: number;
  discount: number;
  gems: number;
  invoiceNumber: string;
  purchaseDate: string;
  state: string;
  inventory: InventoryOrderDetailsResponse[];
}

export interface OrderUserDetailsResponse {
  id: number;
  invoiceNumber: string;
  purchaseDate: string;
  username: string;
  totalItems: number;
  discount: number;
  totalPrice: number;
  totalWithDiscount: number;
  giftUsername?: string;
}

export interface CreateOrderRequest {
  items: CartItemRequest[];
  useGems: boolean;
  isGift: boolean;
  giftUsername?: string;
}
