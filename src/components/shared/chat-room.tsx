"use client"
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom, userAtom } from "@/features/atoms";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/app/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import io from "socket.io-client";
import Bubble from "../ui/bubble";
import { CameraIcon, GearIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {BotIcon} from "lucide-react"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { H3 } from "../ui/h3";
import { socket } from "./socket";


interface Message {
  id: number;
  message: string;
  username: string;
  createdAt: string;
}

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  // Send message function
  const onSubmit = async (values: MessageSchema) => {
    if (!values.message) return;

    const messageData = {
      message: values.message,
      username: user?.username || "anon",
    };

    // Emit the message to the server
    socket.emit("send_message", messageData);

    // Store the message in Strapi (if needed)
    try {
      const data = await axios.post(
        "http://localhost:1337/api/messages",
        { data: messageData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prev) => [...prev, data.data]);
    } catch (error) {
      console.error("Error storing message:", error);
    }

    form.reset();
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("send_message", (message) => {
      setMessages(message);
    });

    socket.on("receive_message", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("messages");
      socket.off("new_message");
    };
  }, []);

  // Fetch stored messages from Strapi (if needed)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<{ data: Message[] }>(
          "http://localhost:1337/api/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [token]);

  return (
    <div className="w-[75%] md:w-[60%] lg:w-[40%] space-y-0.5">
      <div className="bg-neutral-300 dark:bg-neutral-900 border-b-blue-100 dark:border-b-blue-400 border-b-2 flex justify-between items-center w-full p-2 rounded-t-xl filter drop-shadow-lg text-primary">
        <div className="flex space-x-3 items-center">
          <BotIcon className="h-8 w-8" />
          <div>
            <H3>Public Room</H3>
            <p className="opacity-40 font-light">
              {isConnected ? "connected" : "disconnected"}
            </p>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 filter drop-shadow-md"
          >
            <CameraIcon className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 filter drop-shadow-md"
          >
            <GearIcon className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <div className="h-[70vh] dark:bg-neutral-900 bg-neutral-300 shadow-lg overflow-y-scroll p-2">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Bubble
              key={message.id}
              className={
                message.username === user?.username
                  ? "justify-end"
                  : "justify-start"
              }
              username={message.username}
              message={message.message}
              createdAt={message.createdAt}
            />
          ))
        ) : (
          <p className="text-center">No messages yet.</p>
        )}
      </div>
      <div className="w-full rounded-b-xl border-t-2 bg-neutral-300 dark:bg-neutral-900 border-t-blue-700 dark:border-t-blue-900 text-primary p-6 flex space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex space-x-2 items-end"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full border-primary text-primary">
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message here..."
                      className="w-full p-2 text-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button className="group dark:bg-blue-600 dark:hover:bg-blue-800 text-primary bg-blue-500 hover:bg-blue-700 transition-all duration-200 ease-linear">
                <PaperPlaneIcon className="h-6 w-6 group-hover:rotate-0 -rotate-45 transition-all duration-200 ease-linear" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatRoom;
