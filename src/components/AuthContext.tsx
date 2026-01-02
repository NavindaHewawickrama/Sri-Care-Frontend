import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, password: string) => boolean;
  logout: () => void;
  register: (data: { phoneNumber: string; name: string; email: string; password: string }) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (phoneNumber: string, password: string) => {
    // Mock authentication
    if (password.length >= 6) {
      setUser({
        id: '1',
        phoneNumber,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (data: { phoneNumber: string; name: string; email: string; password: string }) => {
    // Mock registration
    if (data.password.length >= 6) {
      setUser({
        id: '1',
        phoneNumber: data.phoneNumber,
        name: data.name,
        email: data.email,
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
