export declare const UserRole: {
    readonly ADMIN: "admin";
    readonly USER: "user";
};
export type UserRole = typeof UserRole[keyof typeof UserRole];
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
//# sourceMappingURL=User.d.ts.map