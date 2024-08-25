"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>You need to sign in</p>;

  if (!session) {
    throw Error("session error");
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}</h1>
      <p>User ID: {session.user?.id}</p>
    </div>
  );
}
