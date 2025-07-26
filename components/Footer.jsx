// components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-16 py-6 px-4 text-center text-sm text-muted-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-2">
        <div>
          &copy; {new Date().getFullYear()} <strong>AI Prompts Store</strong> by{" "}
          <span className="font-medium text-primary">Santosh Patil</span>
        </div>
        <Link
          href="https://github.com/patilsp/promtmenia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          ⭐ Give a star on GitHub
        </Link>
      </div>
    </footer>
  );
}
