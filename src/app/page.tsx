import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Link href="/documents/123"> Go to document with ID: 123</Link>
    </div>
  );
}
