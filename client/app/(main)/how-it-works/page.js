import { shared } from "@/lib/metadata";
export const metadata = {
  title: `Nasıl Çalışır | ${shared.title}`,
  description: "Senaryo tabanlı dil öğrenme platformunun nasıl çalıştığını keşfedin.",
};

import HowItWorks from "./HowItWorks";

export default function HowItWorksWrapper() {
  return <HowItWorks />;
}