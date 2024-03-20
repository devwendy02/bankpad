import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

export function useAuth(): { token: string; authDone: boolean } {
  const { token, authDone } = useContext(AuthContext);
  return { token, authDone };
}

export function useRefId(): string {
  const { refId } = useContext(AuthContext);
  return refId;
}
