import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLogin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [auth]);
  return (
    <AuthContext.Provider value={{ isLogin }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("context가 없을 경우");
  }
  return context;
};
