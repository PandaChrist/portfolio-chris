import { nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 md:flex-row md:px-8">
        <p className="text-lg font-bold tracking-tight text-white">
          cbk<span className="text-accent">.</span>
        </p>
        <ul className="flex flex-wrap justify-center gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs">
          © {new Date().getFullYear()} Christian Bakiti Kamga — Next.js &
          Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
