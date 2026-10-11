import Image from 'next/image';

// The correct Oka Resorts pin on Google Maps. The button below the map opens this exact link.
const MAP_LINK = 'https://maps.app.goo.gl/zgEHUfJmeBgSyMdM9';

// Map shown on the page. If the pin ever looks off, open the place in Google Maps -> Share -> "Embed a map",
// copy the address inside src="..." of the code it gives you, and paste it here.
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Oka+resorts,+Amitha+developers,+Reddipalle,+Agraharam,+Andhra+Pradesh+531219&output=embed';

export default function Location() {
  return (
    <>
      <section id="location">
          <div className="wrap">
            <div className="eyebrow reveal">A strategic location</div>
            <div className="loc-header reveal">
              <h2 style={{ fontSize: "clamp(28px,3.4vw,40px)", maxWidth: "560px" }}>Smart, effortless connectivity across Vizag, Vizianagaram and Srikakulam.</h2>
              <div className="compass" aria-hidden="true" style={{ color: "var(--ink)" }}></div>
            </div>
            <div className="loc-grid">
              <div className="reveal">
                <div className="map-card">
                  <Image src="/images/location-map.jpg" alt="Location map showing Oka Resorts and surrounding landmarks near Padmanabham, Visakhapatnam" width={1370} height={1148} sizes="(max-width: 900px) 100vw, 46vw" />
                </div>
                <div className="map-embed">
                  <iframe src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map showing the Oka Resorts location"></iframe>
                </div>
                <a className="btn" style={{ marginTop: 16 }} href={MAP_LINK} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
              </div>
              <div className="loc-cats reveal">
                <div className="loc-cat">
                  <h3>Connectivity &amp; Transit</h3>
                  <ul>
                    <li>National Highway (NH-16) frontage <em>Adjacent</em></li>
                    <li>Bhogapuram International Airport <em>15 min</em></li>
                    <li>Vizianagaram Railway Station <em>20 min</em></li>
                    <li>Proposed metro line, minutes from stations <em>Nearby</em></li>
                  </ul>
                </div>
                <div className="loc-cat">
                  <h3>Education</h3>
                  <ul>
                    <li>Raghu Engineering College <em>10 min</em></li>
                    <li>Oakridge, Ameya &amp; Delhi Public School <em>10 min</em></li>
                    <li>Lendi &amp; Avanthi institutions <em>10 min</em></li>
                    <li>IIM Visakhapatnam <em>15 min</em></li>
                  </ul>
                </div>
                <div className="loc-cat">
                  <h3>Work &amp; Technology</h3>
                  <ul>
                    <li>IT SEZ, Gambhiram <em>15 min</em></li>
                    <li>Google Data Centre <em>10 min</em></li>
                    <li>Miracle Software Park <em>20 min</em></li>
                  </ul>
                </div>
                <div className="loc-cat">
                  <h3>Nature, Faith &amp; Leisure</h3>
                  <ul>
                    <li>Anantha Padmanabha Swamy Temple <em>5 min</em></li>
                    <li>Bheemili Beach <em>10 min</em></li>
                    <li>International Cricket Stadium, Madhurawada <em>25 min</em></li>
                    <li>Simhachalam Temple <em>35 min</em></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
