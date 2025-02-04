
export interface TableUserResponse {
  id: number;
  name: string;
  brawlTag: string;
  email: string;
  gems: number;
  enabled: boolean;
}

export interface ShowUserResponse {
  id: number;
  name: string;
  surname: string;
  brawlTag: string;
  username: string;
  email: string;
  gems: number;
  enabled: boolean;
  avatar: string;
}
