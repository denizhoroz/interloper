import { shared } from "@/lib/metadata";
export const metadata = {
  title: `İletişim | ${shared.title}`,
  description: "Interloper ile iletişime geçin.",
};

import Contact from "./Contact";

export default function ContactWrapper() {
  return <Contact />;
}