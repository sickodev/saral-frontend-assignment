"use client";

import { tokenAtom, userAtom } from "@/features/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom)
  const router = useRouter();

  useEffect(() => {
    function getTokenFromStorage() {
      let tokenFromStorage: string = localStorage.getItem("SARAL_TOKEN") || "";
      if (tokenFromStorage === "") {
        router.push("/auth/sign-in")
      }

      setToken(tokenFromStorage);
      setUser({
        id: localStorage.getItem("SARAL_USER_ID")!,
        username: localStorage.getItem("SARAL_USERNAME")!
      })
    }

    getTokenFromStorage()
  },[]);

  return <div>{children}</div>;
};

export default AuthProvider;
