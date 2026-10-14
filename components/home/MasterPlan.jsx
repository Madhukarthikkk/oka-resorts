import Image from 'next/image';

export default function MasterPlan() {
  return (
    <>
      <section className="band-dark" id="masterplan">
          <div className="wrap">
            <div className="plan-grid">
              <div className="on-dark reveal">
                <div className="eyebrow">Master plan</div>
                <h2>A grid of 222 plots, planned like a small township.</h2>
                <div className="plan-copy">
                  <p>The layout sets plots along shaded internal roads radiating from a landscaped entrance, with dedicated land for community amenities at the centre of the site.</p>
                </div>
                <ul className="plan-list">
                  <li>222 individually numbered plots</li>
                  <li>Entrance gate with avenue plantation</li>
                  <li>50&prime; and 30&prime; wide internal roads</li>
                  <li>Central amenities &amp; clubhouse zone</li>
                  <li>Modern drainage across the layout</li>
                </ul>
              </div>
              <div className="tabs reveal">
                <input type="radio" name="plan-tab" id="tab-aerial" defaultChecked />
                <input type="radio" name="plan-tab" id="tab-layout" />
                <div className="tabs-body">
                  <div className="tab-labels">
                    <label htmlFor="tab-aerial">Aerial View</label>
                    <label htmlFor="tab-layout">Plot Layout</label>
                  </div>
                  <div className="tab-panels">
                    <Image className="aerial" src="/images/aerial-view.jpg" alt="Aerial render of the Oka Resorts plotted master plan" width={1216} height={1294} sizes="(max-width: 900px) 100vw, 55vw" />
                    <Image className="layout" src="/images/layout-plan.jpg" alt="Detailed plot layout drawing of Oka Resorts, Reddipalli" width={1231} height={1277} sizes="(max-width: 900px) 100vw, 55vw" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
