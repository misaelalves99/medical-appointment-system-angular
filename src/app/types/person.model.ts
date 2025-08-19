// src/types/person.model.ts

export interface Person {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
}
