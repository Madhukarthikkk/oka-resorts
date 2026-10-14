import Image from 'next/image';

export default function Amenities() {
  return (
    <>
      <section id="amenities">
          <div className="wrap">
            <div className="eyebrow reveal">Project amenities</div>
            <h2 className="reveal" style={{ fontSize: "clamp(28px,3.4vw,40px)", maxWidth: "560px", marginBottom: "50px" }}>Built around the everyday, and the occasional escape.</h2>

            <div className="amen-photos reveal">
              <div>
                <Image src="/images/entrance-gate.jpg" alt="Rendered entrance gate and boulevard at Oka Resorts" width={1593} height={987} sizes="(max-width: 760px) 100vw, 50vw" />
                <div className="amen-cap">Entrance Gate &amp; Avenue</div>
              </div>
              <div>
                <Image src="/images/guest-house.jpg" alt="Rendered guest house and villa at Oka Resorts" width={1296} height={1214} sizes="(max-width: 760px) 100vw, 50vw" />
                <div className="amen-cap">Guest House</div>
              </div>
            </div>
            <div className="amen-photos-small reveal">
              <div>
                <Image src="/images/park-aerial.jpg" alt="Aerial view of landscaped park within the layout" width={1432} height={1098} sizes="(max-width: 760px) 50vw, 25vw" />
                <div className="amen-cap">Landscaped Park</div>
              </div>
              <div>
                <Image src="/images/playground.jpg" alt="Children's play area render" width={1564} height={1006} sizes="(max-width: 760px) 50vw, 25vw" />
                <div className="amen-cap">Children's Play Area</div>
              </div>
              <div>
                <Image src="/images/walking-track.jpg" alt="Walking and jogging track beside water feature" width={725} height={423} sizes="(max-width: 760px) 50vw, 25vw" />
                <div className="amen-cap">Walking / Jogging Track</div>
              </div>
              <div>
                <Image src="/images/pool.jpg" alt="Swimming pool render at Oka Resorts" width={1537} height={1023} sizes="(max-width: 760px) 50vw, 25vw" />
                <div className="amen-cap">Swimming Pool</div>
              </div>
            </div>

            <div className="chip-list reveal">
              <span className="chip">222 Plots</span>
              <span className="chip">Entrance Gate</span>
              <span className="chip">50&prime; &amp; 30&prime; Wide Roads</span>
              <span className="chip">Children's Play Area</span>
              <span className="chip">Walking / Jogging Tracks</span>
              <span className="chip">Guest House</span>
              <span className="chip">Exclusive Clubhouse</span>
              <span className="chip">Swimming Pool</span>
              <span className="chip">Restaurant / Hotel</span>
              <span className="chip">Multi-purpose Hall</span>
              <span className="chip">Avenue Plantation</span>
              <span className="chip">Modern Drainage</span>
              <span className="chip">Street Lights</span>
              <span className="chip">24×7 Security</span>
            </div>
          </div>
        </section>
    </>
  );
}
