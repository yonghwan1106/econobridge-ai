"use client";

export function TrainingCard({
  title,
  institution,
  region,
  duration,
  cost,
  trainingType,
}: {
  title: string;
  institution: string;
  region: string;
  duration: string;
  cost: string;
  trainingType?: string;
}) {
  return (
    <div className="group rounded-xl border border-[var(--color-border)] bg-white p-4 transition-all hover:border-[#0891b2] hover:shadow-md">
      {trainingType && (
        <span className="mb-2 inline-block rounded-md bg-cyan-50 px-2 py-0.5 text-[11px] font-bold text-cyan-700 border border-cyan-200">
          {trainingType}
        </span>
      )}
      <h3 className="mb-3 text-[14px] font-bold leading-snug text-[var(--color-text)] group-hover:text-[#0891b2]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        <Tag icon="🏫" text={institution} />
        <Tag icon="📍" text={region} />
        <Tag icon="⏱" text={duration} />
        <Tag icon="💰" text={cost} />
      </div>
    </div>
  );
}

function Tag({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-bg-secondary)] px-2 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
      <span className="text-[12px]">{icon}</span>
      {text}
    </span>
  );
}
