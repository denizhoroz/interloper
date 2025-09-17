import { shared } from "@/lib/metadata";
export const metadata = {
  title: `Sonuç | ${shared.title}`,
  description: "Değerlendirme sonuçlarınızı görüntüleyin.",
};

import EvaluationPage from "./Evaluation";

export default function LangSelectPage() {
  return <EvaluationPage />;
}