
import type { Category } from "../../entities/Category.js";
import type { CategoryService } from "../CategoryService.js";


export class MockCategoryService implements CategoryService {
  private categories: Category[] = [];

  constructor() {
    this.categories = [
      { id: "1", name: "Ficción" },
      { id: "2", name: "Ciencia" },
      { id: "3", name: "Historia" },
      { id: "4", name: "Tecnología" },
    ];
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find((cat) => cat.id === id);
  }

  async findByName(name: string): Promise<Category[]> {
    const lower = name.toLowerCase();
    return this.categories.filter((cat) =>
      cat.name.toLowerCase().includes(lower)
    );
  }

  // ← corregido: respeta la interfaz Service<Category>
  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }

  // ← corregido: ahora recibe un solo objeto como en la interfaz base
  async editOne(data: Category): Promise<Category> {
    const index = this.categories.findIndex((cat) => cat.id === data.id);
    if (index === -1) {
      throw new Error(`Categoría con id ${data.id} no encontrada`);
    }

    this.categories[index] = {
      id: data.id,
      name: data.name ?? this.categories[index]!.name, // evita undefined
    };

    return this.categories[index];
  }

  async updateMany(data: Category[]): Promise<Category[]> {
    this.categories = data;
    return this.categories;
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((cat) => cat.id !== id);
  }
}



/**
 * 🧪 Bloque de pruebas — para ejecutar con npx tsx
 */
(async () => {
  const service = new MockCategoryService();

  console.log("📚 Categorías iniciales:");
  console.log(await service.findAll());

  console.log("\n🔎 Buscar por nombre 'cien':");
  console.log(await service.findByName("cien"));

  console.log("\n➕ Guardar nueva categoría:");
  await service.save({ id: "5", name: "Arte" });
  console.log(await service.findAll());

  console.log("\n✏️ Editar categoría:");
  await service.editOne({ id: "2", name: "Ciencias Naturales" });
  console.log(await service.findById("2"));

  console.log("\n🗑️ Eliminar categoría con id '1':");
  await service.delete("1");
  console.log(await service.findAll());
})();

