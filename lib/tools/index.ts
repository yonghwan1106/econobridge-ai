import { searchWorknetJobs } from "./worknet";
import { searchDisabilityJobs } from "./disability-jobs";
import { searchTrainingCourses } from "./hrdnet";
import { checkCompanySafety } from "./safety-check";
import { checkWageViolations } from "./wage-check";
import { searchSafetyLaws } from "./kosha-laws";
import { generateCoverLetter } from "./cover-letter";

export const allTools = {
  search_worknet_jobs: searchWorknetJobs,
  search_disability_jobs: searchDisabilityJobs,
  search_training_courses: searchTrainingCourses,
  check_company_safety: checkCompanySafety,
  check_wage_violations: checkWageViolations,
  search_safety_laws: searchSafetyLaws,
  generate_cover_letter: generateCoverLetter,
};
