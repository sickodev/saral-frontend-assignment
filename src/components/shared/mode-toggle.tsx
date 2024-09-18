import React, { useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ModeToggle = () => {
    const[isDark, setIsDark] = useState(true);
    const { setTheme } = useTheme();

    function changeTheme(){
        setIsDark(prev => !prev);
        if(isDark){
            setTheme("light")
        }else{
            setTheme("dark")
        }
    } 
  return (
    <Button size="icon" variant="ghost" onClick={changeTheme}>
      <MoonIcon className="h-6 w-6 dark:block hidden" />
      <SunIcon className="h-6 w-6 dark:hidden"/>
    </Button>
  );
};

export default ModeToggle;
