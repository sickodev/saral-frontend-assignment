"use client";

import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "../schema";
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
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "@/features/atoms";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpSchema) {
    try {
      const data = await axios.post(
        "http://localhost:1337/api/auth/local/register",
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
    } catch (error: any) {
      setIsError(true);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {isError && (
          <p className="dark:text-red-800 text-red-600">
            Username / email already exists!!
          </p>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="babbity@boomail.com"
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
          This form signs you up to our service.
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
