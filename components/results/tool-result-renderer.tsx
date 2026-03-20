"use client";

import { JobCard } from "./job-card";
import { TrainingCard } from "./training-card";
import { SafetyDetailCard } from "./safety-detail-card";
import { WageViolationCard } from "./wage-violation-card";
import { LawCard } from "./law-card";
import { CoverLetterView } from "./cover-letter-view";

/* eslint-disable @typescript-eslint/no-explicit-any */

function tryParse(output: unknown): any {
  if (typeof output === "string") {
    try {
      return JSON.parse(output);
    } catch {
      return null;
    }
  }
  return output;
}

export function renderToolResult(toolName: string, output: unknown) {
  const data = tryParse(output);
  if (!data) return null;

  switch (toolName) {
    case "search_worknet_jobs":
    case "search_disability_jobs": {
      const jobs: any[] = data.jobs ?? [];
      if (jobs.length === 0) return null;
      return (
        <div className="mt-2 grid gap-2">
          {jobs.slice(0, 5).map((job: any, i: number) => (
            <JobCard
              key={i}
              company={job.company}
              title={job.title}
              salary={job.salary}
              region={job.region}
              career={job.career ?? job.disability_type}
              closeDate={job.close_date}
            />
          ))}
        </div>
      );
    }

    case "search_training_courses": {
      const courses: any[] = data.courses ?? [];
      if (courses.length === 0) return null;
      return (
        <div className="mt-2 grid gap-2">
          {courses.slice(0, 5).map((c: any, i: number) => (
            <TrainingCard
              key={i}
              title={c.title}
              institution={c.institution}
              region={c.region}
              duration={c.duration}
              cost={c.cost}
              trainingType={c.training_type}
            />
          ))}
        </div>
      );
    }

    case "check_company_safety": {
      if (data.safety_score == null) return null;
      return <SafetyDetailCard data={data} />;
    }

    case "check_wage_violations": {
      return <WageViolationCard data={data} />;
    }

    case "search_safety_laws": {
      const laws: any[] = data.laws ?? [];
      if (laws.length === 0) return null;
      return <LawCard data={data} />;
    }

    case "generate_cover_letter": {
      const sections: any[] = data.sections ?? [];
      if (sections.length === 0) return null;
      return (
        <CoverLetterView
          company={data.company ?? ""}
          jobTitle={data.job_title ?? ""}
          sections={sections}
        />
      );
    }

    default:
      return null;
  }
}
