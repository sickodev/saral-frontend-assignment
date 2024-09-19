import { atom } from "jotai";

interface User {
    id: string
    username: string
}

const tokenAtom = atom("")


const userAtom = atom<User>()


export {tokenAtom, userAtom};