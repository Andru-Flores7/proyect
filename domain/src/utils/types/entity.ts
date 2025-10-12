// domain/types/entity.ts

// 📘 Tipo base para todas las entidades del dominio.
// Sirve como “contrato” común que todas las entidades deben cumplir.
export interface Entity {
  id: string;          // Identificador único
  createdAt?: Date;    // (opcional) Fecha de creación
  updatedAt?: Date;    // (opcional) Fecha de última actualización
}
