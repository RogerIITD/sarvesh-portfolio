"use client";

export default function GradientMesh() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-40"
      style={{
        background:
          "linear-gradient(-45deg, #f0f7f4, #c6e4d5, #dff0ea, #e8f5ef, #2d8f6f20, #f59e0b10)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 8s ease infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
