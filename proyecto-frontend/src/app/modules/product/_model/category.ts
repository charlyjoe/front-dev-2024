export class Category {
  category_id: number;
  category: string;
  tag: string;
  status: number;

  constructor(
    category_id: number,
    category: string,
    tag: string,
    status: number
  ) {
    this.category_id = category_id;
    this.category = category;
    this.tag = tag;
    this.status = status;
  }
}
