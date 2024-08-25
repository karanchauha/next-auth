"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700">
      {/* Navbar */}
      <nav className="text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            Home
          </Link>
        </div>
      </nav>

      {/* Login Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-white mb-2 animate-pulse">
          Login
        </h1>
        <p className="text-lg text-white">
          New to BeastBeats?{" "}
          <Link href="/auth/signup" className="text-blue-300 hover:underline">
            Sign Up for an account
          </Link>
        </p>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center h-auto">
        <div className="relative bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-lg mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-white text-lg mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            {error && (
              <div className="text-red-400 text-center mt-4">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-lg rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
