export interface IGallery {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  uploadedBy: string;
}
export interface IAddGallery {
  title: string;
  image: string;
}
