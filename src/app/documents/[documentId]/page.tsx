import React from "react";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const awaitedParams = await params;
  const documentId = awaitedParams.documentId;

  return <div>Document Id: {documentId}</div>;
}
