/** 워크넷 지역코드 (5자리) */
export const WORKNET_REGION_CODES: Record<string, string> = {
  서울: "11000",
  부산: "26000",
  대구: "27000",
  인천: "28000",
  광주: "29000",
  대전: "30000",
  울산: "31000",
  세종: "36000",
  경기: "41000",
  강원: "42000",
  충북: "43000",
  충남: "44000",
  전북: "45000",
  전남: "46000",
  경북: "47000",
  경남: "48000",
  제주: "49000",
};

/** 장애인고용공단 / HRD-Net 지역코드 (2자리) */
export const KEAD_REGION_CODES: Record<string, string> = {
  서울: "11",
  부산: "26",
  대구: "27",
  인천: "28",
  광주: "29",
  대전: "30",
  울산: "31",
  세종: "36",
  경기: "41",
  강원: "42",
  충북: "43",
  충남: "44",
  전북: "45",
  전남: "46",
  경북: "47",
  경남: "48",
  제주: "49",
};

/** 지역명으로 코드 검색 (부분 매칭) */
export function findRegionCode(
  region: string,
  codes: Record<string, string>,
): string | null {
  for (const [key, code] of Object.entries(codes)) {
    if (region.includes(key)) return code;
  }
  return null;
}
