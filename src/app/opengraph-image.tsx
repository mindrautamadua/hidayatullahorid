import { ImageResponse } from "next/og";

export const alt = "Hidayatullah — Membangun Peradaban Islam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a3f2c",
          color: "#eaf5ef",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "#38b47b",
              borderRadius: "50%",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "26px",
              letterSpacing: "6px",
              fontWeight: 700,
              color: "#9fe0bf",
            }}
          >
            SITUS RESMI
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "128px", fontWeight: 800, lineHeight: 1 }}>
            Hidayatullah
          </span>
          <span
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              fontWeight: 700,
              color: "#9fe0bf",
              marginTop: "18px",
            }}
          >
            MEMBANGUN PERADABAN ISLAM
          </span>
        </div>

        <span style={{ fontSize: "34px", color: "#c9ddd2", maxWidth: "900px" }}>
          Berkhidmat untuk umat dan bangsa, lintas Nusantara — sejak 1973.
        </span>
      </div>
    ),
    { ...size },
  );
}
