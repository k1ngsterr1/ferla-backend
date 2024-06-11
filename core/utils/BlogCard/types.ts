export interface BlogCardAttributes {
    id: string | number;
    image: string;
    title: string;
    href: string;
    createdAt: Date;
    updatedAt: Date;
}
export type NewBlogCardInput = {
    image: string;
    title: string;
    href: string;
};