import type { Metadata } from "next";
import { SubsidiariesPage } from "@/components/subsidiaries/Subsidiaries";

export const metadata: Metadata = {
  title: "Our Subsidiaries | Manifold Holdings",
  description:
    "Explore Manifold Computers Limited and Manifold Enterprise Solutions: specialist companies connecting enterprise infrastructure and digital transformation.",
};

export default function Page() {
  return <SubsidiariesPage />;
}
