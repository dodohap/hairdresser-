export type ServiceType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  createdById: number;
  updatedAt: Date;
  updatedById: number;
};

export type NewServiceType = {
  name: string;
  category: string;
  description: string;
  price: number;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
};

export type updateServiceType = {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
};
