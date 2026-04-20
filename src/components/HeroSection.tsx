return (
  <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans">
    
    {/* HEADER */}
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-3">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {displayName}.
        </h1>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="px-5 py-2 bg-black text-white rounded-lg text-sm"
        >
          Contact
        </button>
      </div>
    </header>

    {/* MAIN CONTENT - SINGLE COLUMN */}
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* HERO */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-3xl font-bold">{displayName}</h2>
        <p className="text-blue-600 mt-1">{displayTitle}</p>

        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
          <div><b>Education:</b> {displayEducation}</div>
          <div><b>Experience:</b> {displayYears}</div>
          <div><b>Impact:</b> {displayKeyMetric}</div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePlayIntroWithAvatarCheck}
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            Watch Intro
          </button>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-5 py-2 border rounded-lg"
          >
            Contact
          </button>
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">Core Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skillGroups.flatMap(g => g.items).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-white p-6 rounded-2xl border">
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
          <p className="text-gray-400">No experience data</p>
        )}
      </section>

      {/* PROJECTS (FIXED) */}
      <section className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-6">Projects</h3>

        {(() => {
          const safeProjects = (() => {
            const val = parsedDbRow?.projects;

            if (!val) return [];

            if (typeof val === "object") return val;

            if (typeof val === "string") {
              try {
                return JSON.parse(val);
              } catch {
                return [];
              }
            }

            return [];
          })();

          if (!safeProjects.length) {
            return (
              <p className="text-gray-400">
                No projects available
              </p>
            );
          }

          return (
            <div className="space-y-6">
              {safeProjects.map((p: any, i: number) => (
                <div key={i} className="border p-4 rounded-xl">
                  
                  <h4 className="font-semibold text-lg">
                    {p.title}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {p.problem}
                  </p>

                  <p className="text-sm mt-2">
                    {p.description}
                  </p>

                  <p className="text-green-600 text-sm mt-2">
                    {p.impact}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.techStack?.map((t: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-xs rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">Certifications</h3>

        {parsed?.certifications?.length ? (
          parsed.certifications.map((c, i) => (
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
