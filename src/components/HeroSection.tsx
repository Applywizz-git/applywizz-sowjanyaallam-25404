import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

/* ===========================
   TYPES
=========================== */
type ParsedResumeData = {
  name: string;
  title: string;
  email: string;
  location: string;
  education: string;
  yearsOfExperience: string;
  keyMetric: string;
  summary: string;
  skills: { category: string; items: string[] }[];
  experience: any[];
  projects: any[];
  certifications: any[];
};

/* ===========================
   COMPONENT
=========================== */
export default function ResumeIntroPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const emailParam = searchParams.get("email");

  const [parsed, setParsed] = useState<ParsedResumeData | null>(null);
  const [parsedDbRow, setParsedDbRow] = useState<any>(null);

  /* ===========================
     SAFE PARSE (IMPORTANT FIX)
  =========================== */
  const safeParse = (val: any, fallback: any) => {
    if (!val) return fallback;

    if (typeof val === "object") return val;

    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch {
        return fallback;
      }
    }

    return fallback;
  };

  /* ===========================
     LOAD DATA
  =========================== */
  useEffect(() => {
    const loadData = async () => {
      if (!emailParam) return;

      const { data } = await supabase
        .from("parsed_resumes")
        .select("*")
        .eq("email", emailParam)
        .single();

      if (!data) return;

      setParsedDbRow(data);

      const mapped: ParsedResumeData = {
        name: data.full_name || "Professional",
        title: data.role || "Software Engineer",
        email: data.email,
        location: data.location || "Remote",
        education: data.education || "",
        yearsOfExperience: data.experience || "",
        keyMetric: data.key_metrics || "",
        summary: data.summary || "",
        skills: safeParse(data.skills, []),
        experience: safeParse(data.experience_details, []),
        projects: safeParse(data.projects, []),
        certifications: safeParse(data.certifications, []),
      };

      setParsed(mapped);

      console.log("RAW PROJECTS:", data.projects);
      console.log("PARSED PROJECTS:", safeParse(data.projects, []));
    };

    loadData();
  }, [emailParam]);

  /* ===========================
     HELPERS
  =========================== */
  const displayName = parsed?.name || "";
  const displayTitle = parsed?.title || "";
  const displayEducation = parsed?.education || "";
  const displayYears = parsed?.yearsOfExperience || "";
  const displayKeyMetric = parsed?.keyMetric || "";

  const skillGroups = parsed?.skills || [];

  /* ===========================
     UI
  =========================== */
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans">

      {/* HEADER */}
      <header className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between">
          <h1 className="text-lg font-semibold">{displayName}.</h1>
          <button className="bg-black text-white px-4 py-1 rounded">
            Contact
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* HERO */}
        <section className="bg-white p-8 rounded-xl border">
          <h2 className="text-3xl font-bold">{displayName}</h2>
          <p className="text-blue-600">{displayTitle}</p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <div><b>Education:</b> {displayEducation}</div>
            <div><b>Experience:</b> {displayYears}</div>
            <div><b>Impact:</b> {displayKeyMetric}</div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillGroups.flatMap(g => g.items).map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Experience</h3>

          {parsed?.experience?.length ? (
            parsed.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-medium">{exp.role}</h4>
                <p className="text-sm text-gray-500">{exp.company}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No experience available</p>
          )}
        </section>

        {/* PROJECTS (FIXED) */}
        <section className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-6">Projects</h3>

          {parsed?.projects?.length ? (
            <div className="space-y-6">
              {parsed.projects.map((p: any, i: number) => (
                <div key={i} className="border p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.problem}</p>
                  <p className="text-sm mt-2">{p.description}</p>
                  <p className="text-green-600 text-sm mt-2">{p.impact}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.techStack?.map((t: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No projects found</p>
          )}
        </section>

        {/* CERTIFICATIONS */}
        <section className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Certifications</h3>

          {parsed?.certifications?.length ? (
            parsed.certifications.map((c: any, i: number) => (
              <div key={i} className="text-sm">
                {c.title} — {c.issuer}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No certifications</p>
          )}
        </section>

      </main>
    </div>
  );
}
