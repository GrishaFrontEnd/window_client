import { useMemo } from "react";
import { useAppSelector } from "./Redux";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.isAdmin);
  return useMemo(() => ({ user }), [user]);
};
