export interface SubTodo {
  id: number;
  content: string;
  todo: string;
  date: string;
  order: string;
  isCompleted: boolean;
  patchOrder: {
    somePatchInfo: number;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Todo {
  id: number;
  title: string;
  readOnly: boolean;
  content: string;
  categoryId: number;
  startDate?: string | null;
  endDate?: string | null;
  userId: number;
  order: string;
  isCompleted: boolean;
  children: SubTodo[];
}
