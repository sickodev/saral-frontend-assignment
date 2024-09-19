"use client";

import { useForm } from "react-hook-form";
import { signInSchema, SignInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "@/features/atoms";

const SignInForm = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchema) {
    try {
      const data = await axios.post(
        "http://localhost:1337/api/auth/local",
        values
      );
      await localStorage.setItem("SARAL_TOKEN", data.data.jwt);
      await localStorage.setItem("SARAL_USER_ID", data.data.user.id);
      await localStorage.setItem("SARAL_USERNAME", data.data.user.username);
      setToken(data.data.jwt);
      setUser({
        id: data.data.user.id!,
        username: data.data.user.username!,
      });
      router.push("/");
    } catch (error) {
      setIsError(true);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {isError && (
          <p className="dark:text-red-800 text-red-600">
            Username / password is wrong!!
          </p>
        )}
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or email address</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="babbity_boo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="my-3 opacity-30">
          This form signs you in to our backend.
        </p>
        <Button
          type="submit"
          className="w-full  dark:bg-blue-600 text-primary dark:hover:bg-blue-800"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
