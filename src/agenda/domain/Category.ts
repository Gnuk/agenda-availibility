import { Name } from './Name';

export class Category extends Name {
  static toName = (category: Category): string => category.name;

  static override of(name: string): Category {
    return new Category(name);
  }

  isIn(categories: Category[]): boolean {
    return categories.map(Category.toName).includes(this.name);
  }
}
