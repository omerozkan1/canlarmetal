// JSON-LD yapılandırılmış veriyi sayfaya gömer.
// jsonLdGraph() ile üretilen hazır string'i alır; XSS riski yoktur (yalnızca
// bizim ürettiğimiz, JSON.stringify'dan geçmiş içerik basılır).
export default function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
