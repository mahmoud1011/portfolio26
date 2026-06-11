import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-container"
      style={{ background: "#0D0F14" }}
    >
      <p
        className="font-mono text-xs tracking-widest uppercase mb-4"
        style={{ color: "#00D4AA" }}
      >
        404
      </p>
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: "#E8EAF0" }}
      >
        Page not found
      </h1>
      <p
        className="text-base mb-8"
        style={{ color: "#8B90A0" }}
      >
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-sm font-medium text-sm transition-all duration-200"
        style={{
          background: "#00D4AA",
          color: "#0D0F14",
        }}
      >
        Back to portfolio
      </Link>
    </main>
  );
}
