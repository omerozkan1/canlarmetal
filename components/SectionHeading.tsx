export default function SectionHeading({
  label,
  title,
  desc,
  center = false,
}: {
  label?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {desc && <p className="mt-3 text-graphite-400">{desc}</p>}
    </div>
  );
}
