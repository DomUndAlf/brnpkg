// page.tsx
import Wrapper from "@/app/components/Detailpage/Wrapper";

export default async function CompoundPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // hier Promise auflösen
  return <Wrapper id={id} />;
}
