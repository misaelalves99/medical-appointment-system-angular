// src/types/patient.model.ts

export interface Patient {
  id?: number;             // opcional se estiver criando um novo paciente
  name: string;
  cpf: string;
  dateOfBirth: string;     // string ISO, ex: '1990-05-15'
  email: string;
  phone: string;
  address: string;
  gender?: string;         // opcional
}
