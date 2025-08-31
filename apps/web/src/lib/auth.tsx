import { create } from 'zustand';
import { api } from './axios';

type AuthState = {
  access?: string;
  user?: any;
  login: (email: string, password: string)=> Promise<void>;
  register: (email: string, password: string, role: 'client'|'freelancer')=> Promise<void>;
};
export const useAuth = create<AuthState>((set)=> ({
  access: undefined,
  user: undefined,
  async login(email, password){
    const { data } = await api.post('/auth/login', { email, password });
    set({ access: data.accessToken, user: data.user });
  },
  async register(email, password, role){
    await api.post('/auth/register', { email, password, role });
  }
}));
export const useAuthSelector = useAuth;
