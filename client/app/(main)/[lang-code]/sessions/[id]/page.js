import { shared } from "@/lib/metadata";
import ChatSession from "./ChatSession";

export const metadata = {
  title: `Senaryo Detayı | ${shared.title}`,
  description: "Senaryo sohbet oturumu.",
};

export default function SessionDetailWrapper({ params }) {
  return <ChatSession params={params} />;
}