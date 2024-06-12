export interface BlogCardAttributes {
  id: string | number;
  image: string;
  title: string;
  href: string;
}
export type NewBlogCardInput = {
  image: string;
  title: string;
  href: string;
};
