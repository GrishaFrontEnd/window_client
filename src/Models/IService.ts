export interface IService {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ICreateService {
  title: string;
  description: string;
  image: string;
}

export interface ServiceState {
  services: IService[];
  error: string;
  isLoading: boolean;
  serviceSearch: string;
}
