import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Initially no users
  const [users, setUsers] = useState([]);

  // Register a new user
  const addUser = (newUser) => {
    // Check if email already exists
    const exists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        newUser.email.toLowerCase()
    );

    if (exists) {
      return false;
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      department: newUser.department,
      year: newUser.year,
      password: newUser.password,
      role: newUser.role || "student",
      status: "Active",
    };

    setUsers((prevUsers) => [...prevUsers, user]);

    return true;
  };

  // Login validation
  const validateUser = (email, password, role) => {
    return users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password &&
        user.role === role &&
        user.status === "Active"
    );
  };

  // Block / Unblock user
  const toggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        validateUser,
        toggleStatus,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}