import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("smartCampusUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "smartCampusUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("smartCampusUser");
    }
  }, [user]);

  // Login using the complete user object
  const login = (loggedUser) => {
    setUser({
      id: loggedUser.id,
      name: loggedUser.name,
      email: loggedUser.email,
      phone: loggedUser.phone,
      department: loggedUser.department,
      year: loggedUser.year,
      role: loggedUser.role,
      status: loggedUser.status,
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartCampusUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}