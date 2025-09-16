import ChatSession from "./ChatSession";
import { shared } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const { id } = resolvedParams;
  return {
    title: `Senaryo ${id} | ${shared.title}`,
    description: `Senaryo ${id}'de pratik yapın.`,
  };
}

export default function SessionDetailWrapper({ params }) {
  return <ChatSession params={params} />;
}