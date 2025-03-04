export interface InventoryModel {
  inventoryId: number;
  open: boolean;
  openDate?: string;
  collectDate: string;
  boxId: number;
  boxName: string;
  totalBrawlers: number;
  newBrawlersObtained: number;
  totalTrophies: number;
  giftFrom?: string;
}
