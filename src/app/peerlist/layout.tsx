import Link from "next/link";

export default function PeerlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen relative overflow-hidden">
      <nav className="grid items-center px-2 text-sm font-medium lg:px-4 bg-foreground">
        {Array.from({ length: 10 }).map((_, index) => (
          <Link
            key={`links-${index}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-background font-semibold transition-all "
            href={`/peerlist/day-${index + 1}`}
          >
            Day {index + 1}
          </Link>
        ))}
      </nav>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
