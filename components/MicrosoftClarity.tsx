import Script from "next/script";

// Microsoft Clarity — oturum kaydı ve ısı haritası.
// lazyOnload ile tarayıcı boşa çıktığında yüklenir; hydration/LCP ile yarışmaz,
// veri kaybı olmaz (oturum yine kaydedilir). GA'dan bağımsız, çakışma olmaz.
export default function MicrosoftClarity({ projectId }: { projectId: string }) {
  if (!projectId) return null;

  return (
    <Script id="ms-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  );
}
