
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
  brawlerAvatar: UserBrawler;
}

export interface UserBrawler {
  id: number;
  image: string;
  pinImage: string;
  modelImage: string;
  portraitImage: string;
  name: string;
}

export interface BrawlerUserDetailsResponse {
  brawlerId: number;
  name: string;
  image: string;
  modelImage: string;
}

export interface UserChangeRequest {
  name: string;
  surname: string;
  birthDate: string;
  dni: string;
  email: string;
}
