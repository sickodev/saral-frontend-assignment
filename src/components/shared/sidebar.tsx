"use client";

import { AvatarIcon, ChatBubbleIcon, GearIcon, MoonIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ModeToggle from "./mode-toggle";

const Sidebar = () => {
  return (
    <div className="absolute text-primary top-[40%] left-0 z-10 w-16 filter drop-shadow-xl p-2 rounded-r-xl dark:bg-neutral-900 bg-neutral-200 flex flex-col items-center space-y-2">
      <div className="space-y-1">
        <Button size="icon" variant="ghost" className="drop-shadow-lg">
          <AvatarIcon className="h-8 w-8" />
        </Button>
        <hr className="border-neutral-400 dark:border-neutral-600 border"/>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <Button size="icon" variant="ghost">
          <PlusIcon className="h-6 w-6" />
        </Button>
        <Button size="icon" variant="ghost">
          <ChatBubbleIcon className="h-6 w-6" />
        </Button>
        <Button size="icon" variant="ghost">
          <GearIcon className="h-6 w-6" />
        </Button>
        <ModeToggle/>
      </div>
    </div>
  );
};

export default Sidebar;
