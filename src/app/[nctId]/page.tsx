import SubmissionForm from "@/components/SubmissionForm";

interface SubmissionPageProps {
  params: Promise<{
    nctId: string;
  }>;
}

export default async function SubmissionPage({ params }: SubmissionPageProps) {
  const { nctId } = await params;
  return (
    <main className="container mx-auto flex flex-col justify-center items-center h-screen">
      <SubmissionForm code={nctId} />
    </main>
  );
}
