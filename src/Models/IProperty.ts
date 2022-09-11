export interface IProperty {
  id: number;
  category_id: number;
  value: string;
}

export interface CategoriesProperty {
  id: number;
  category_id: number;
  property_id: number;
}

export interface IPropsCategory {
  id: number;
  title: string;
  CategoriesProperty: CategoriesProperty;
}

export interface IServerProperties {
  count: number;
  rows: {
    id: number;
    title: string;
    categories: CategoriesProperty[];
  }[];
}

export interface ICreateProperty {
  title: string;
  category_id: number;
}

export interface IUpdateProperty {
  id: number;
  titleProperty: string;
  category_id: number;
}
