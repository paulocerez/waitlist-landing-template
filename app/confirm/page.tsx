"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function ConfirmContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const confirmSubscription = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setMessage("Missing confirmation token");
        return;
      }

      try {
        const response = await fetch(`/api/confirm?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during the confirmation process.");
      }
    };
    confirmSubscription();
  }, [searchParams]);

  if (status === "loading") {
    return <div>Confirming your subscription...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center py-16 px-12 md:px-24">
      <h1 className="text-xl md:text-3xl font-bold mb-8">
        Subscription{" "}
        <span
          className={`underline ${
            status === "success" ? "text-blue-500" : "text-red-500"
          }`}
        >
          {status === "success" ? "confirmed" : "error"}
        </span>
        !{status === "success" ? " 😎" : " 😕"}
      </h1>
      <p className="text-lg mb-4">
        {status === "success" ? (
          <>
            Thank you for confirming your subscription to the 2docs waitlist.
            <br />
            I&apos;ll keep you updated on our progress and notify you when I
            launch 👉🏼👈🏼.
          </>
        ) : (
          message
        )}
      </p>
      <p>Best, Paulo 👋🏼</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
