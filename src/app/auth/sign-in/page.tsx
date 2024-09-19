import { H3 } from "@/components/ui/h3";
import React from "react";
import SignInForm from "./sign-in-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-[60%] p-2 filter drop-shadow-xl dark:bg-neutral-900 rounded-xl space-y-3">
      <div className="space-y-1">
        <H3> Sign In</H3>
        <p className="opacity-50">To access your account</p>
        <hr className="" />
      </div>
      <div>
        <SignInForm />
      </div>
      <div className="flex space-x-1 opacity-80">
        <p>No account?</p>
        <Link href={"/auth/sign-up"} className="font-bold text-blue-300 underline">
          Sign Up
        </Link>
        <p>here.</p>
      </div>
    </div>
  );
};

export default Page;
