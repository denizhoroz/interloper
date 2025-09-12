import { shared } from "@/lib/metadata";
export const metadata = {
  title: `Dil Seçimi | ${shared.title}`,
  description: "Öğrenmek istediğiniz dili seçin ve pratiğe başlayın.",
};

import LanguageSelection from "./LanguageSelection";

export default function LangSelectPage() {
  return <LanguageSelection />;
}