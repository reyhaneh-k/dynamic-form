import { ReactNode } from "react";

export interface TabsProps {
  tabs: { children: ReactNode; title: string }[];
}
