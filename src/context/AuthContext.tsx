import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  status: string;
  gender: string;
  age: number;
  avatarId?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  updateAvatar: (avatarId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const parsed = JSON.parse(loggedUser);
      const savedAvatarId = localStorage.getItem(`avatarId_${parsed.id}`);
      if (savedAvatarId) parsed.avatarId = parseInt(savedAvatarId);
      setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u: any) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const updateAvatar = (avatarId: number) => {
    if (!user) return;
    const updatedUser = { ...user, avatarId };
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    localStorage.setItem(`avatarId_${user.id}`, avatarId.toString());
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], avatarId };
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
