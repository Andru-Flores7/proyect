// src/use-cases/users/FindUser.ts
import type { UserService } from "../../services/UserService.js";
import type { User, UserRole } from "../../entities/User.js";

interface FindUserDeps {
  userService: UserService;
}

interface FindUserPayload {
  id?: string;
  email?: string;
  name?: string;
  role?: UserRole;
}

export async function FindUser(
  { userService }: FindUserDeps,
  { id, email, name, role }: FindUserPayload
): Promise<User[] | undefined> {
 
  const allUsers = await userService.findAll();

 
  const filtered = allUsers.filter((user) => {
    if (id && user.id !== id) return false;
    if (email && user.email !== email) return false;
    if (name && user.name !== name) return false;
    if (role && user.role !== role) return false;
    return true;
  });

  return filtered.length ? filtered : undefined;
}
