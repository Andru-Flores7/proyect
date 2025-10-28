import { UserRole } from "../../entities/User.js";
import type { UserService } from "../../services/UserService.js";


interface RegisterUserDeps {
  userService: UserService;
}

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export async function CreateUser(
  { userService }: RegisterUserDeps,
  { name, email, password }: RegisterUserPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (foundUser) return new Error("Usuario ya existe");

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: UserRole.USER,  // ← corregido a 'role'
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await userService.save(newUser);


}
