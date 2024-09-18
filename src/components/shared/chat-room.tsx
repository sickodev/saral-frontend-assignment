"use client";
import {
  AvatarIcon,
  CameraIcon,
  GearIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { H3 } from "../ui/h3";
import { Button } from "../ui/button";
import Bubble from "../ui/bubble";
import { Textarea } from "../ui/textarea";
import { PaperclipIcon } from "lucide-react";
import { useRef } from "react";

const ChatRoom = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-[75%] md:w-[50%] space-y-0.5">
      <div className="bg-neutral-300 dark:bg-neutral-900 border-b-blue-700 dark:border-b-blue-900 border-b-2 flex justify-between items-center w-full p-2 rounded-t-xl filter drop-shadow-lg text-primary">
        <div className="flex space-x-3 items-center">
          <AvatarIcon className="h-8 w-8" />
          <div>
            <H3>Contact</H3>
            <p className="opacity-40 font-light">online</p>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="ghost" size="icon" className="p-2 filter drop-shadow-md">
            <CameraIcon className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" className="p-2 filter drop-shadow-md">
            <GearIcon className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <div className="h-[70vh] dark:bg-neutral-900 bg-neutral-300 shadow-lg overflow-y-scroll p-2">
       
      </div>
      <div className="w-full rounded-b-xl border-t-2 bg-neutral-300 dark:bg-neutral-900 border-t-blue-700 dark:border-t-blue-900 text-primary p-6 flex space-x-2">
        <Textarea ref={inputRef} className="p-2 drop-shadow-md filter border-primary" placeholder="Enter your message here..." />
        <div className="space-y-2">
            <Button className="hover:bg-transparent group transition duration-200 ease-linear bg-transparent text-primary shadow-none">
                <PaperclipIcon className="h-5 w-5 group-hover:rotate-90 duration-200 transition ease-linear"/>
            </Button>
          <Button className="group bg-blue-200 hover:bg-blue-500 dark:bg-blue-500 text-primary dark:hover:bg-blue-800">
            <PaperPlaneIcon className="h-5 w-5 transition duration-200 ease-linear -rotate-45 group-hover:rotate-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
