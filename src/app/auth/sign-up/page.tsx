import { H3 } from "@/components/ui/h3";
import React from "react";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

const Page = () => {
  return (
    <div className="w-[60%] p-2 filter drop-shadow-xl dark:bg-neutral-900 rounded-xl space-y-3">
      <div className="space-y-1">
        <H3> Sign Up</H3>
        <p className="opacity-50">To spread awesomeness.</p>
        <hr className="" />
      </div>
      <div>
        <SignUpForm/>
      </div>
      <div className="flex space-x-1 opacity-80">
        <p>Have an account already?</p>
        <Link href={"/auth/sign-in"} className="font-bold text-blue-300 underline">
          Sign In
        </Link>
        <p>here.</p>
      </div>
    </div>
  );
};

export default Page;
