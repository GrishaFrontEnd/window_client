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

export interface IServerItem {
  item: ServerItem;
  _properties: IServerProperties[];
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

export interface ISetItemImage {
  formData: FormData;
  id: number;
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

export interface IUpdateTitle {
  id: number;
  title: string;
}

export interface IUpdateCount {
  id: number;
  count: number;
}

export interface IUpdatePrice {
  id: number;
  price: number;
}

export interface IUpdateProperties {
  id: number;
  properties: {
    property: string[];
    value: string[];
  };
}
