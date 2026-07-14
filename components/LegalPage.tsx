import Breadcrumb from "@/components/Breadcrumb";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: title }]} />
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-graphite-400">{intro}</p>

      <div className="mt-10 space-y-8">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-white">{s.heading}</h2>
            <div className="mt-2 space-y-3 text-graphite-300">
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
