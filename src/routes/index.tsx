import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/mac/Desktop";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Amelia Short — Product Designer" },
      { name: "description", content: "Amelia Short's portfolio, dressed up as a 90s Mac OS desktop. Product designer working at the intersection of human experience and AI-native interaction." },
      { property: "og:title", content: "Amelia Short — Product Designer" },
      { property: "og:description", content: "A 90s Mac OS desktop portfolio: drag windows, peek in the Trash, read the work." },
    ],
  }),
});

function Index() {
  return <Desktop />;
}
