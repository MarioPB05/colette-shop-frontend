
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

export interface UserDetailsResponse {
  id: number;
  username: string;
  brawlTag: string;
  name: string;
  surname: string;
  birthDate: string;
  dni: string;
  email: string;
  gems: number;
  trophies: number;
  openBoxes: number;
  favouriteBrawlers: number;
  brawlers: number;
  gifts: number;
  brawlerAvatar: number;
}

export interface BrawlerUserDetailsResponse {
  brawlerId: number;
  name: string;
  image: string;
  modelImage: string;
}
