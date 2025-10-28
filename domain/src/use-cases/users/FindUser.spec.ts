// src/use-cases/users/FindUser.spec.ts
import { describe, expect, test } from "vitest";
import { MokUserService } from "../../services/moks/MokUserService.js";
import { UserRole, type User } from "../../entities/User.js";
import { FindUser } from "./FindUser.js";

describe("FindUser", () => {
  const userService = new MokUserService([
    {
      id: crypto.randomUUID(),
      name: "Alice",
      email: "alice@gmail.com",
      password: "alice123",
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User,
    {
      id: crypto.randomUUID(),
      name: "Bob",
      email: "bob@gmail.com",
      password: "bob123",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User,
  ]);

  test("Debe encontrar un usuario por ID", async () => {
    const user = await FindUser({ userService }, { id: userService.users[0]!.id });
    expect(user?.[0]).toMatchObject({ name: "Alice", email: "alice@gmail.com" });
  });

  test("Debe encontrar un usuario por email", async () => {
    const user = await FindUser({ userService }, { email: "bob@gmail.com" });
    expect(user?.[0]).toMatchObject({ name: "Bob", email: "bob@gmail.com" });
  });

  test("Debe encontrar un usuario por name", async () => {
    const user = await FindUser({ userService }, { name: "Alice" });
    expect(user?.[0]).toMatchObject({ name: "Alice" });
  });

  test("Debe encontrar un usuario por role", async () => {
    const admins = await FindUser({ userService }, { role: UserRole.ADMIN });
    expect(admins?.[0]).toMatchObject({ name: "Bob", role: UserRole.ADMIN });
  });

  test("Si no encuentra usuario, retorna undefined", async () => {
    const user = await FindUser({ userService }, { email: "noone@gmail.com" });
    expect(user).toBeUndefined();
  });
});
