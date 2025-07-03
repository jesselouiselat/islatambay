import { useEffect } from "react";

function TikTokEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="tiktokEmbed">
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <blockquote class="tiktok-embed"
            cite="https://www.tiktok.com/@islatambay.freedi"
            data-unique-id="islatambay.freedi"
            data-embed-type="creator"
            style="max-width: 780px; min-width: 288px;">
            <section>
              <a target="_blank" href="https://www.tiktok.com/@islatambay.freedi?refer=creator_embed">
                @islatambay.freedi
              </a>
            </section>
          </blockquote>
        `,
        }}
      />
    </section>
  );
}

export default TikTokEmbed;
