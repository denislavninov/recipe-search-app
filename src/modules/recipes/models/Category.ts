export enum CategoryEnum {
  Beef = "Beef",
  Chicken = "Chicken",
  Dessert = "Dessert",
  Lamb = "Lamb",
  Miscellaneous = "Miscellaneous",
  Pasta = "Pasta",
  Pork = "Pork",
  Seafood = "Seafood",
  Side = "Side",
  Starter = "Starter",
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
  Breakfast = "Breakfast",
  Goat = "Goat",
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}
