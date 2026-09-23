import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminAuth = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      credentials: null,
      setupAdmin: (username, password) => {
        set({
          credentials: { username, password },
          isAuthenticated: true,
          admin: { username, name: username, role: "admin" },
        });
        return { success: true };
      },
      login: (username, password) => {
        const credentials = useAdminAuth.getState().credentials;
        if (
          credentials &&
          username === credentials.username &&
          password === credentials.password
        ) {
          const adminData = {
            username,
            name: "Admin User",
            role: "admin",
          };
          set({ isAuthenticated: true, admin: adminData });
          return { success: true };
        }
        return { success: false, error: "Invalid credentials" };
      },

      logout: () => {
        set({ isAuthenticated: false, admin: null });
      },
    }),
    {
      name: "addis-eats-admin",
      version: 2,
      partialize: (state) => ({
        credentials: state.credentials,
        isAuthenticated: state.isAuthenticated,
        admin: state.admin,
      }),
    },
  ),
);

export default useAdminAuth;
