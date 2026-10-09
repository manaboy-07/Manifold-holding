import type { Metadata } from "next";
import { MESPage } from "@/components/subsidiaries/Subsidiaries";

export const metadata: Metadata = {
  title: "Manifold Enterprise Solutions | Manifold Holdings",
  description:
    "Cloud, cybersecurity, Data & AI, software development, automation and managed services.",
};

export default function Page() {
  return <MESPage />;
}
