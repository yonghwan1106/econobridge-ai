"use client";

import { JobCard } from "@/components/results/job-card";
import { SafetyBadge } from "@/components/results/safety-badge";
import { TrainingCard } from "@/components/results/training-card";
import { CoverLetterView } from "@/components/results/cover-letter-view";
import { WageCheckCard } from "@/components/results/wage-check-card";

interface ToolOutput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function ToolResultRenderer({
  toolName,
  output,
}: {
  toolName: string;
  output: unknown;
}) {
  if (!output || typeof output !== "object") return null;
  const data = output as ToolOutput;

  switch (toolName) {
    case "search_worknet_jobs":
    case "search_disability_jobs": {
      const jobs = data.jobs;
      if (!Array.isArray(jobs) || jobs.length === 0) return null;
      return (
        <div className="mt-2 space-y-2">
          {jobs.slice(0, 5).map((job: ToolOutput, i: number) => (
            <JobCard
              key={i}
              company={job.company ?? job.company_name ?? ""}
              title={job.title ?? job.job_title ?? ""}
              salary={job.salary ?? job.wage ?? "정보없음"}
              region={job.region ?? job.location ?? ""}
              career={job.career ?? job.career_type}
              closeDate={job.close_date ?? job.deadline}
            />
          ))}
        </div>
      );
    }

    case "check_company_safety": {
      if (!data.grade) return null;
      return (
        <div className="mt-2">
          <SafetyBadge
            grade={data.grade}
            score={data.safety_score ?? 0}
            label={data.grade_label ?? ""}
            emoji={data.grade_emoji ?? ""}
          />
          {data.accident_count > 0 && (
            <div className="mt-1 text-xs text-[var(--color-text-muted)]">
              산재 {data.accident_count}건
              {data.major_accident_count > 0 &&
                ` · 중대재해 ${data.major_accident_count}건`}
              {data.death_count > 0 && ` · 사망 ${data.death_count}건`}
            </div>
          )}
        </div>
      );
    }

    case "check_wage_violations": {
      return (
        <div className="mt-2">
          <WageCheckCard
            company={data.company ?? ""}
            violationCount={data.violation_count ?? 0}
            totalAmount={data.total_amount}
            violations={data.violations}
          />
        </div>
      );
    }

    case "search_training_courses": {
      const courses = data.courses;
      if (!Array.isArray(courses) || courses.length === 0) return null;
      return (
        <div className="mt-2 space-y-2">
          {courses.slice(0, 5).map((c: ToolOutput, i: number) => (
            <TrainingCard
              key={i}
              title={c.title ?? c.course_name ?? ""}
              institution={c.institution ?? c.training_center ?? ""}
              region={c.region ?? c.location ?? ""}
              duration={c.duration ?? c.period ?? ""}
              cost={c.cost ?? c.tuition ?? ""}
              trainingType={c.training_type ?? c.type}
            />
          ))}
        </div>
      );
    }

    case "generate_cover_letter": {
      if (!data.sections) return null;
      return (
        <div className="mt-2">
          <CoverLetterView
            company={data.company ?? ""}
            jobTitle={data.job_title ?? ""}
            sections={data.sections}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
