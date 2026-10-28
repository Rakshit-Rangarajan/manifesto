import type { Metadata } from "next";
import ArcanePreview from "@/components/arcane-preview";

export const metadata: Metadata = {
  title: "Arcane Engineer | Prototype",
  robots: { index: false, follow: false },
};

export default function ArcanePreviewPage() {
  return <ArcanePreview />;
}
