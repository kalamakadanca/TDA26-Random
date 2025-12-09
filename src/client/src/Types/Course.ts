import type {Module} from "./Module.ts";

export interface Course {
    uuid: string;
    title: string;
    description: string | null;
    modules: Module[]; // Předpokládáme, že rozhraní Module je již definováno
}