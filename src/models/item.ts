
export interface Item {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  name: string;
  quantity?: number;
  purchased?: boolean;
}

export interface UpdateItemInput {
  name?: string;
  quantity?: number;
  purchased?: boolean;
}
