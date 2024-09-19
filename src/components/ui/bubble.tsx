import { userAtom } from "@/features/atoms";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import React from "react";

interface BubbleProps {
  message: string;
  username: string;
  className: String;
  createdAt: string;
}

const Bubble = ({ className, message, username, createdAt }: BubbleProps) => {
  const user = useAtomValue(userAtom);
  return (
    <div className={cn("w-full flex my-2", className)}>
      <div
        className={cn(
          "max-w-[75%] border text-primary  p-2 rounded-xl filter drop-shadow-lg",
          username === user?.username
            ? "rounded-br-none bg-blue-400 dark:bg-blue-800 text-right border-none"
            : "rounded-bl-none bg-neutral-200 dark:bg-neutral-800 text-left"
        )}
      >
        {username !== user?.username && (
          <p className="text-sm font-semibold mb-2 dark:text-blue-400 text-blue-900">{username}</p>
        )}
        <div className="flex justify-between items-end space-x-5">
          <p>{message}</p>
          <p className="text-xs opacity-50">
            {new Date(createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bubble;
