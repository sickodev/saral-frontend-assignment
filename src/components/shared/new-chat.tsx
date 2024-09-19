"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { H3 } from "../ui/h3";
import { H4 } from "../ui/h4";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtomValue } from "jotai";
import { tokenAtom, userAtom } from "@/features/atoms";

const NewChat = () => {
    const [contacts, setContacts] = useState([])
    const user = useAtomValue(userAtom)
    const token = useAtomValue(tokenAtom)

    useEffect(()=>{
        async function getContacts(){
            try {
                let data = await axios.get(`http://localhost:1337/api/users/${user?.id}?populate=contacts`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                })

                setContacts(data.data)
            } catch (error) {
                
            }
        }
    },[])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <H3>Chats</H3>
          <hr />
        </DialogHeader>
        <div>
          <H4>Add a Chat</H4>
          <hr className="opacity-60 w-1/2" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
