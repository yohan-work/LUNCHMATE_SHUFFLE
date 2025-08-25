"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ======== CONFIG ========
// TODO: 아래 GOOGLE_FORM_URL을 실제 구글 폼 '응답 링크'로 바꾸세요.
// (선호하면 ?usp=pp_url&entry.123456= 값을 프리필로 추가)
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1AZxfhvd3wUiTqct-GqCgWCI6Z472Az7d0yY3Mwd-SS0/edit";

export default function Home() {
  const [formUrl, setFormUrl] = useState("");
  const [slotHint, setSlotHint] = useState("오늘 11:30 슬롯 인기");

  // CTA에 폼 링크 세팅 (utm/ref를 그대로 붙여 전달)
  const composeFormUrl = () => {
    if (typeof window === "undefined") return GOOGLE_FORM_URL;

    const qs = new URLSearchParams(window.location.search);
    // 예: 랜딩의 utm_source, ref 등을 폼으로 넘기려면, 구글폼의 '사전 입력' entry.* 파라미터에 매핑하세요.
    // 여기서는 일단 ref 파라미터만 그대로 전달합니다. (폼에 '유입경로' 문항을 만들고 수동 처리 권장)
    const ref = qs.get("ref") || qs.get("utm_source") || "";
    const url = new URL(GOOGLE_FORM_URL);
    if (ref) url.searchParams.set("ref", ref); // 폼에서 ref 수집 가능하도록 단답형 문항 추가 권장
    return url.toString();
  };

  // FOMO: 오늘 요일/시간에 따라 힌트 텍스트
  const updateSlotHint = () => {
    const now = new Date();
    const h = now.getHours();
    const hint =
      h < 11
        ? "오늘 11:30 슬롯 인기"
        : h < 12
        ? "오늘 12:00 슬롯 인기"
        : "내일 11:30 슬롯 오픈";
    setSlotHint(hint);
  };

  useEffect(() => {
    setFormUrl(composeFormUrl());
    updateSlotHint();
  }, []);

  return (
    <>
      <header className="sticky top-0 bg-[#0b1020]/60 backdrop-blur-md border-b border-[#141c33] z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3.5">
            <div className="flex gap-2.5 items-center font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6ee7b7] shadow-[0_0_20px_2px_rgba(110,231,183,0.55)]"></span>
              Lunchmate Shuffle — 신용산
            </div>
            <Badge
              variant="outline"
              className="border-[#243048] bg-[#0e1631] text-[#cbd5e1]"
            >
              {slotHint}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-[980px]">
        <section className="py-14">
          <span className="text-[#9aa3b2] font-bold tracking-wider uppercase text-xs mb-2 block">
            파일럿 / 가벼운 점심 동행
          </span>
          <h1 className="text-[clamp(24px,4.6vw,40px)] leading-tight mb-3 font-bold">
            점심 30–40분,{" "}
            <span className="text-[#6ee7b7] font-normal">가볍게 같이</span>{" "}
            하실래요?
          </h1>
          <p className="text-[#9aa3b2] my-1.5 mb-4.5 text-[15px]">
            사내 전용/외부 포함 · 4인 랜덤 ·{" "}
            <strong>스몰토크 / 조용히 / 주제 / 산책</strong> 모드 중 선택.
            데이팅 아님 🙅‍♂️ — 점심 동행/대화 커뮤니티입니다.
          </p>
          <div className="flex gap-2.5 flex-wrap">
            <Button
              asChild
              className="bg-[#22c55e] text-[#071019] shadow-[0_10px_24px_rgba(34,197,94,0.25)] hover:bg-[#22c55e]/90"
            >
              <a href={formUrl} target="_blank" rel="noopener">
                사전 신청하기
              </a>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="bg-[#1f2937] text-[#d1d5db] border-[#334155] hover:bg-[#1f2937]/80"
            >
              <a href="#how">어떻게 진행되나요?</a>
            </Button>
          </div>
        </section>

        <section className="py-7" id="how">
          <h2 className="text-xl font-extrabold mb-3">How it works — 3단계</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-[#e2e8f0] font-extrabold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">슬롯 선택</h3>
                    <p className="text-[#a7b0bf] text-sm">
                      오늘/내일 중 11:30 · 12:00에서 고르세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-[#e2e8f0] font-extrabold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">모드 선택</h3>
                    <p className="text-[#a7b0bf] text-sm">
                      스몰토크 / 조용히 / 주제 / 산책 — 편한 방식으로.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-[#e2e8f0] font-extrabold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      그룹 카드 수신
                    </h3>
                    <p className="text-[#a7b0bf] text-sm">
                      닉네임·회사 라벨만 공개된 4인 그룹으로 안내해 드립니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-7">
          <h2 className="text-xl font-extrabold mb-3">모드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">스몰토크</h3>
                <p className="text-[#a7b0bf] text-sm">
                  가벼운 대화로 리프레시. 아이스브레이커 카드 제공.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">조용히</h3>
                <p className="text-[#a7b0bf] text-sm">
                  말 최소, 옆자리만 함께. 내향형도 편안하게.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">주제</h3>
                <p className="text-[#a7b0bf] text-sm">
                  영어·러닝·개발/디자인 협업·재테크 등 관심사 기반.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">산책(워킹 런치)</h3>
                <p className="text-[#a7b0bf] text-sm">
                  사옥 주변/한강 루트 25분 걷기 전용.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-7">
          <h2 className="text-xl font-extrabold mb-3">안전 & 프라이버시</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">최소 공개</h3>
                <p className="text-[#a7b0bf] text-sm">
                  닉네임·회사 라벨만. 연락처 교환은 자율입니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">노쇼 가이드</h3>
                <p className="text-[#a7b0bf] text-sm">
                  무통보 결석 2회 → 다음 주 후순위 큐로 이동합니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">가벼운 약속</h3>
                <p className="text-[#a7b0bf] text-sm">
                  이 공간은 데이팅이 아닌 점심 동행/대화 커뮤니티입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-7" id="faq">
          <h2 className="text-xl font-extrabold mb-3">FAQ</h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-extrabold mb-1.5">데이팅인가요?</dt>
              <dd className="text-[#a7b0bf] text-sm mb-2.5">
                아니요. 네트워킹 강요도 아닙니다. 점심 30–40분 가벼운
                동행/대화입니다.
              </dd>
            </div>
            <div>
              <dt className="font-extrabold mb-1.5">비용이 드나요?</dt>
              <dd className="text-[#a7b0bf] text-sm mb-2.5">
                파일럿 기간 무료입니다. 소소한 리워드가 있을 수 있어요.
              </dd>
            </div>
            <div>
              <dt className="font-extrabold mb-1.5">어디서 만나나요?</dt>
              <dd className="text-[#a7b0bf] text-sm mb-2.5">
                그룹 카드에 근처 스팟 1–2곳을 제안해 드립니다.
              </dd>
            </div>
            <div>
              <dt className="font-extrabold mb-1.5">
                회사 사람만 만나고 싶어요.
              </dt>
              <dd className="text-[#a7b0bf] text-sm mb-2.5">
                사내 전용/외부 포함을 선택하실 수 있습니다.
              </dd>
            </div>
          </dl>
        </section>

        <section className="py-7">
          <Card className="bg-gradient-to-b from-[#0f172a] to-[#0f172a] border-[#1e293b]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 mt-0">
                첫 주 파일럿, 함께 하실래요?
              </h3>
              <p className="text-[#94a3b8] text-sm mb-4">
                사전 신청 후, 이번 주 참여 가능한 요일/슬롯을 체크해 주세요.
                우선 배정해 드립니다.
              </p>
              <Button
                asChild
                className="w-full bg-[#22c55e] text-[#071019] shadow-[0_10px_24px_rgba(34,197,94,0.25)] hover:bg-[#22c55e]/90"
              >
                <a href={formUrl} target="_blank" rel="noopener">
                  사전 신청하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="py-8 pb-12 border-t border-[#141c33] mt-7">
        <div className="container mx-auto px-4 max-w-[980px]">
          <div className="flex items-center gap-2.5">
            <Badge
              variant="outline"
              className="border-[#243048] bg-[#0e1631] text-[#cbd5e1]"
            >
              Beta
            </Badge>
            <span className="text-[#8f9ab0]">
              © Lunchmate Shuffle — Sinyongsan
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
