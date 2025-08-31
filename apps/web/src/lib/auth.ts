import { create } from "zustand";
import { api } from "./axios";

type Role = "client"|"freelancer"|"admin";
interface AuthState {
  user?: { id: string; email: string; role: Role };
  access?: string;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string, role: Role): Promise<void>;
  logout(): void;
}

export const useAuth = create<AuthState>((set) => ({
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    set({ user: data.user, access: data.access });
  },
  async register(email, password, role) {
    const { data } = await api.post("/auth/register", { email, password, role });
    set({ user: data.user, access: data.access });
  },
  logout() { set({ user: undefined, access: undefined }); }
}));
