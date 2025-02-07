
export interface TableUserResponse {
  id: number;
  name: string;
  username: string;
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
  dni: string;
  birthdate: string;
  enabled: boolean;
  avatar: string;
}
