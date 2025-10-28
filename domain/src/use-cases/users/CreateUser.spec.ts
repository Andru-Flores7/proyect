// src/use-cases/users/CreateUser.spec.ts
import { describe, expect, test } from "vitest";
import type { UserService } from "../../services/UserService.js";
import { UserRole, type User } from "../../entities/User.js";
import { CreateUser } from "./CreateUser.js";
import { MokUserService } from "../../services/moks/MokUserService.js";

describe("CreateUser", async () => {
  const userService: UserService & { users: User[] } = new MokUserService([
    {
      id: crypto.randomUUID(),
      name: "Andres",
      email: "user@gmail.com",
      password: "user1234",
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User,
  ]);

  test("Debe crear un usuario nuevo", async () => {
    const result = await CreateUser(
      { userService },
      { name: "Andres", email: "andres@gmail.com", password: "User@1234" }
    );

    expect(result).toBeUndefined();

    
    expect(userService.users).toHaveLength(2);
    expect(userService.users[1]!).toMatchObject({
      name: "Andres",
      email: "andres@gmail.com",
      password: "User@1234",
      role: UserRole.USER,
    });
    expect(userService.users[1]!.id).toEqual(expect.any(String));
    expect(userService.users[1]!.createdAt).toEqual(expect.any(Date));
    expect(userService.users[1]!.updatedAt).toEqual(expect.any(Date));
  });

  test("Si el email ya está registrado, debe devolver un error", async () => {
    const result = await CreateUser(
      { userService },
      { name: "Andres", email: "user@gmail.com", password: "User@1234" }
    );

    expect(result).toBeInstanceOf(Error);
    if (result instanceof Error) {
      expect(result.message).toBe("Usuario ya existe");
    }
  });
});
