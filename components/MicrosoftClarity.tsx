import Script from "next/script";

// Microsoft Clarity — oturum kaydı ve ısı haritası.
// next/script ile afterInteractive stratejisinde yüklenir; GA'dan bağımsız,
// ayrı bir script olduğu için çakışma olmaz.
export default function MicrosoftClarity({ projectId }: { projectId: string }) {
  if (!projectId) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  );
}
