import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Signup from "./SignupForm";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

export default function Content() {
  const [signup, setSignup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  //   resolvedTheme of useTheme hook takes user preference + system settings into account

  //   mounted state set in useEffect to ensure rendering only after being mounted on client side

  useEffect(() => {
    setMounted(true);
  }, []);

  if (signup) {
    return <Signup />;
  }

  //
  if (!mounted) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-[450px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[450px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-16 items-center text-center animate-slide-in-bottom max-w-3xl">
      {resolvedTheme === "dark" ? (
        <Image src="/waiter-dark.svg" alt="overview" width={450} height={300} />
      ) : (
        <Image
          src="/waiter-light.svg"
          alt="overview"
          width={450}
          height={300}
        />
      )}
      <div className="flex flex-col space-y-4">
        <h1 className="text-md md:text-xl">{"<2docs/>"}</h1>
        <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
          Combine two or more API docs into{" "}
          <span className="text-blue-500 underline">seamless</span> code
          workflows.{" "}
        </h2>
        <p className="text-sm md:text-lg text-gray-500">
          Best used for all API&apos;s Zapier didn&apos;t integrate yet. Or if
          you planned higher budget for domain names than automation saas
          subscriptions.
        </p>
      </div>
      <Button variant="outline" onClick={() => setSignup(true)}>
        Sign up for the Waitlist
      </Button>
    </div>
  );
}
