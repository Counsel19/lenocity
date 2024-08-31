import { IUser } from "./users";

export interface INews {
  _id: string;
  author: IUser;
  title: string;
  image: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddNews {
  title: string;
  body: string;
  image: string
}
