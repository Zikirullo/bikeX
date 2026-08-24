import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { User } from "../../../lib/types/user";
import { setAuth } from "./auth.slice";

export default function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("userdata");
    if (stored) {
      try {
        const user: User = JSON.parse(stored);
        dispatch(setAuth({ user }));
      } catch (err) {
        console.log("ERROR parsing stored userdata", err);
        localStorage.removeItem("userdata");
      }
    }
  }, [dispatch]);

  return null;
}
