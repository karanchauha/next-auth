// "use client";
// import { getSession } from "next-auth/react";

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>You need to sign in</p>;

  if (!session) {
    throw Error("session error");
  }

  if (session.user.isAdmin == false) {
    return (
      <div>
        <h1>Welcome, {session.user?.email}</h1>
        <p>User ID: {session.user?.id}</p>
      </div>
    );
  }

  return <div>sorry you are not admin</div>;
}

// import { getSession } from "next-auth/react";

// export default function ProtectedPage() {
//   return <div>This is a protected page</div>;
// }

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }
