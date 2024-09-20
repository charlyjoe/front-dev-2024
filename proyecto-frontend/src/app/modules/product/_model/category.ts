export class Category {
  categoryId: number;
  category: string;
  tag: string;
  status: string;

  constructor(
    categoryId: number,
    category: string,
    tag: string,
    status: string
  ) {
    this.categoryId = categoryId;
    this.category = category;
    this.tag = tag;
    this.status = status;
  }
}
