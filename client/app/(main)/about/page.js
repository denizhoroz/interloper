import { shared } from "@/lib/metadata";
export const metadata = {
  title: `Hakkında | ${shared.title}`,
  description: "Interloper hakkında daha fazla bilgi edinin.",
};

import About from "./About";

export default function AboutWrapper() {
  return <About />;
}