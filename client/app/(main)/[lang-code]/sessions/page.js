import { shared } from "@/lib/metadata";
export const metadata = {
  title: `Senaryolar | ${shared.title}`,
  description: "Çeşitli senaryolarla pratik yapın.",
};

import Sessions from "./Sessions";

export default function LangSelectPage({ params }) {
  return <Sessions params={params} />;
}