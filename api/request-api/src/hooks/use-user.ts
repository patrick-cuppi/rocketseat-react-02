import { useCallback, useState } from "react"
import { api, fetcher } from "../helpers/api";
import type { User } from "../models/user";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "saving"
  >("idle");

  const getUser = useCallback(async (id: string) => {
    try {
      setRequestStatus("loading");

      const data = await fetcher(`/users/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao buscar o usuário");
    } finally {
      setRequestStatus("idle");
    }
  }, []);

  async function createUser(payload: User) {
    try {
      setRequestStatus("saving");

      await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao criar o usuário");
    } finally {
      setRequestStatus("idle");
    }
  }

  return {
    user,
    userRequestStatus: requestStatus,
    getUser,
    createUser,
  };
}