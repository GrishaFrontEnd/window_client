export interface IItem {
  id: number;
  price: number;
  title: string;
  properties: IItemProperties[];
  image: string;
  count: number;
  category_id: number;
}

export interface IProperties {
  id: number;
  property: string;
  value: string;
}

export interface IItemProperties {
  [index: string]: string;
  property: string;
  value: string;
}

export interface IServerProperties {
  id: number;
  property: string;
  value: string;
  item_id: number;
}

export interface ServerItem {
  id: number;
  price: number;
  title: string;
  properties?: IServerProperties[];
  image: string;
  count: number;
  category_id: number;
}

export interface ServerResponse {
  count: number;
  rows: ServerItem[];
}
