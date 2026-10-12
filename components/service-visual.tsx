import Image from "next/image";

type Props = {
  slug: string;
  label: string;
  kicker?: string;
  stack?: string[];
};

export default function ServiceVisual({ slug, label, kicker, stack }: Props) {
  return (
    <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full rounded-3xl overflow-hidden border border-theme-border shadow-xl bg-theme-surface group">
      <Image
        src={`/services/${slug}.jpg`}
        alt={label}
        fill
        priority
        quality={95}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/25 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {(kicker || (stack && stack.length > 0)) && (
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col gap-2.5">
          {kicker && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold drop-shadow-sm">
                {kicker}
              </span>
            </div>
          )}
          {stack && stack.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs px-3 py-1 rounded-full font-mono font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
