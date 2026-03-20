/** 채용공고 (워크넷) */
export interface Job {
  company: string;
  title: string;
  salary: string;
  region: string;
  career?: string;
  education?: string;
  close_date?: string;
  info_svc?: string;
  wanted_auth_no?: string;
}

/** 장애인 채용공고 */
export interface DisabilityJob {
  company: string;
  title: string;
  salary: string;
  region: string;
  disability_type?: string;
  work_environment?: string;
  close_date?: string;
}

/** 훈련과정 (HRD-Net) */
export interface TrainingCourse {
  title: string;
  institution: string;
  region: string;
  duration: string;
  start_date?: string;
  end_date?: string;
  cost: string;
  training_type?: string;
}

/** 안전점수 결과 */
export interface SafetyScore {
  source: string;
  company: string;
  accident_count: number;
  major_accident_count: number;
  death_count: number;
  wage_violation: boolean;
  safety_score: number;
  grade: "A" | "B" | "C" | "D";
  grade_emoji: string;
  grade_label: string;
  note?: string;
}

/** 임금체불 정보 */
export interface WageViolation {
  date: string;
  amount: string;
  workers_affected: string;
  status: string;
}

/** 법령 정보 */
export interface SafetyLaw {
  title: string;
  article: string;
  content: string;
  enforcement_date: string;
}

/** 자기소개서 섹션 */
export interface CoverLetterSection {
  title: string;
  guide: string;
  draft: string;
}
