import industrialAccidents from "./industrial-accidents.json";
import majorAccidents from "./major-accidents.json";
import wageViolations from "./wage-violations.json";

interface IndustrialAccident {
  company_name: string;
  industry: string;
  region: string;
  accident_type: string;
  accident_date: string;
  workers_affected: number;
}

interface MajorAccident {
  company_name: string;
  industry: string;
  region: string;
  accident_type: string;
  accident_date: string;
  death_count: number;
  injury_count: number;
}

interface WageViolationRecord {
  company_name: string;
  owner_name: string;
  region: string;
  violation_date: string;
  amount: number;
  workers_affected: number;
  status: string;
  public_period: string;
}

/** 기업명으로 산재 건수 조회 */
export function countAccidents(companyName: string): number {
  return (industrialAccidents as IndustrialAccident[]).filter((r) =>
    r.company_name.includes(companyName),
  ).length;
}

/** 기업명으로 중대재해 조회 */
export function getMajorAccidents(companyName: string) {
  const matches = (majorAccidents as MajorAccident[]).filter((r) =>
    r.company_name.includes(companyName),
  );
  const count = matches.length;
  const deaths = matches.reduce((sum, r) => sum + (r.death_count || 0), 0);
  return { count, deaths };
}

/** 기업명으로 임금체불 조회 */
export function getWageViolations(companyName: string) {
  return (wageViolations as WageViolationRecord[]).filter((r) =>
    r.company_name.includes(companyName),
  );
}
