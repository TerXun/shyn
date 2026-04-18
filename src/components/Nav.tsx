import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-neutral-700">
      <div className="px-10 h-16 flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold">
          Shyn.
        </Link>
        <div className="ml-auto flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="/about" className="hover:text-neutral-200 transition-colors">About</Link>
          <Link href="/projects" className="hover:text-neutral-200 transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-neutral-200 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
