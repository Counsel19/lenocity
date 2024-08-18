export interface IGallery {
  _id: string;
  title: string;
  path?: string;
  file?: File | null;
  created_at: string;
}
