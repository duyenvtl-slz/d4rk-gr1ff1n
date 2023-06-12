import { redirect } from "react-router-dom";

function authGuard(): boolean {
  if (!localStorage.getItem("accessToken")) {
    throw redirect("/login");
  }

  return true;
}

export default authGuard;
