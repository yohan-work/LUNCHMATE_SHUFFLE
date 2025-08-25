import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunchmate Shuffle — 신용산",
  description:
    "신용산 근방 직장인을 위한 점심 30–40분 가벼운 동행/대화. 사내 전용 또는 외부 포함, 4인 랜덤 매칭.",
  openGraph: {
    title: "Lunchmate Shuffle — 신용산",
    description:
      "점심 30–40분, 가볍게 같이. 사내/외부 토글 · 4인 랜덤 · 스몰토크/조용히/주제/산책",
    type: "website",
    images: ["/og-image.png"],
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-b from-[#0b1020] from-30% to-[#0e1426]">
        {children}
      </body>
    </html>
  );
}
