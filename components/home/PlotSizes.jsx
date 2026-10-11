export default function PlotSizes() {
  return (
    <>
      <section>
          <div className="wrap">
            <div className="eyebrow reveal">Plot sizes</div>
            <h2 className="reveal" style={{ fontSize: "clamp(28px,3.4vw,40px)", maxWidth: "620px", marginBottom: "14px" }}>A range of plot sizes, so the layout suits more than one kind of buyer.</h2>
            <p className="reveal" style={{ color: "var(--ink-soft)", maxWidth: "640px", fontFamily: "'Cormorant Garamond',serif", fontWeight: "500", fontSize: "20px", lineHeight: "1.5" }}>Based on the measurements marked on the approved layout drawing, individual plots vary in size across the 222-plot grid — giving you room to choose between a compact holding and a larger farmhouse plot.</p>
            <div className="sizes-grid reveal">
              <div className="cell"><b>~253</b><span>Sq. Yds — Smallest Plots</span></div>
              <div className="cell"><b>~589</b><span>Sq. Yds — Typical Plot</span></div>
              <div className="cell"><b>~868</b><span>Sq. Yds — Largest Plots</span></div>
            </div>
            <p className="sizes-note reveal">Exact dimensions and pricing vary by plot and phase — write in through the contact section for the current price list and plot-wise availability.</p>
          </div>
        </section>
    </>
  );
}
