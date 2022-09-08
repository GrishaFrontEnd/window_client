export interface ICategory {
  id: number;
  value: string;
}

export interface IUpdateCategory {
  oldValue: string;
  newValue: string;
}

export interface CreateCategory {
  value: string;
}
