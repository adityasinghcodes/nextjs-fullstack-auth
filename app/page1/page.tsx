"use client";
import { useSession } from "next-auth/react";

export default function Page1() {
  const { data: session, update } = useSession();
  return (
    <>
      <button
        onClick={() => {
          session?.user && update({ ...session.user, name: "asdasdasd singh" });
        }}
      >
        Update session
      </button>
      <h1>Can be accessed by any user.</h1>
    </>
  );
}
