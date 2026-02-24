import { ImageResponse } from "next/og";
import { personalInfo } from "@/data/personal-details";

export const runtime = "edge";

export const alt = "About Rakshit Rangarajan";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: "bold", marginBottom: 10 }}>
        {personalInfo.meta_title}
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        {personalInfo.skills.slice(0, 4).map((skill) => (
          <div
            key={skill}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: 20,
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
