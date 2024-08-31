"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during signup");
      }

      setMessage(data.message);
      setIsError(false);
      if (data.isNewSignup) {
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setIsError(true);
      //   retrieve backend error message for appropriate response for the user
      setMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 animate-slide-in-bottom border rounded-sm shadow-md">
      <h1 className="text-xl font-medium text-center mb-6">
        We just need a few <span className="text-blue-500">details</span> 👀👉🏼👈🏼
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            value={name}
            placeholder="Your full name"
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <p className="text-gray-500 text-xs">
            For reference, look at your birth certificate 🤓.
          </p>
        </div>
        <div className="space-y-2">
          <input
            type="email"
            value={email}
            placeholder="Your email"
            className="border p-2 rounded w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-gray-500 text-xs">
            This dotcom bubble communication thingy. 💌
          </p>
        </div>
        <Button
          variant="outline"
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Signing up..." : "Sign up for the Waitlist"}
        </Button>
        {message && (
          <p
            className={`text-sm mt-4 ${
              isError ? "text-red-500" : "text-blue-500"
            } break-words`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
