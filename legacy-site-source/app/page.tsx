"use client";

import { type FormEvent, useMemo, useState } from "react";

type BloodType = "A" | "B" | "AB" | "O";
type EvidenceGrade = "B" | "C";
type Metric = { label: string; value: number; color: string };
type Candidate = {
  name: string; blood: BloodType; field: string; year: number; schoolCountry: string;
  grade: EvidenceGrade; source: string; note: string;
};
type BaselineKey = "Global" | "Japan" | "United States" | "Canada" | "South Korea";
type SubmissionState = "idle" | "sending" | "success" | "error";

const colors: Record<BloodType, string> = { A: "#ef6a62", B: "#da8b3d", AB: "#8d68bd", O: "#d93f56" };
const globalABO: Record<BloodType, number> = { A: 29.41, B: 23.13, AB: 6.24, O: 41.22 };
const bloodTypes: BloodType[] = ["A", "B", "AB", "O"];
const aboBible = "https://abobible.wixsite.com/abo-bible/nobel";
const aboFan = "https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/";

const candidates: Candidate[] = [
  { name: "Karl Landsteiner", blood: "O", field: "Medicine", year: 1930, schoolCountry: "Austria", grade: "C", source: aboFan, note: "His experiments used his blood, but reviewed histories do not map his sample to O" },
  { name: "Hideki Yukawa", blood: "O", field: "Physics", year: 1949, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Shinichiro Tomonaga", blood: "A", field: "Physics", year: 1965, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Leo Esaki", blood: "AB", field: "Physics", year: 1973, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Eisaku Satō", blood: "A", field: "Peace", year: 1974, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Kenichi Fukui", blood: "A", field: "Chemistry", year: 1981, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Susumu Tonegawa", blood: "AB", field: "Medicine", year: 1987, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Mikhail Gorbachev", blood: "O", field: "Peace", year: 1990, schoolCountry: "Russia", grade: "C", source: aboFan, note: "Repeated celebrity-list claim; no medical or first-person source found" },
  { name: "Kenzaburō Ōe", blood: "A", field: "Literature", year: 1994, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Hideki Shirakawa", blood: "B", field: "Chemistry", year: 2000, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Kim Dae-jung", blood: "A", field: "Peace", year: 2000, schoolCountry: "South Korea", grade: "B", source: "https://view.asiae.co.kr/article/2012072311474739066", note: "Explicit in multiple Korean public profiles" },
  { name: "Kōichi Tanaka", blood: "B", field: "Chemistry", year: 2002, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Jimmy Carter", blood: "A", field: "Peace", year: 2002, schoolCountry: "United States", grade: "B", source: "https://ourbloodinstitute.org/blood-matters/blood-type-us-presidents/", note: "Blood-service review linked to contemporary press reporting" },
  { name: "Daniel Kahneman", blood: "O", field: "Economics", year: 2002, schoolCountry: "Israel", grade: "C", source: aboFan, note: "Uncited compilation lead" },
  { name: "Barack Obama", blood: "AB", field: "Peace", year: 2009, schoolCountry: "United States", grade: "B", source: "http://news.bbc.co.uk/2/hi/americas/7973274.stm", note: "BBC report on emergency blood travelling with the president" },
  { name: "Shinya Yamanaka", blood: "B", field: "Medicine", year: 2012, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Uncited compilation lead" },
  { name: "Satoshi Ōmura", blood: "O", field: "Medicine", year: 2015, schoolCountry: "Japan", grade: "C", source: aboBible, note: "Compilation category corrected against the Nobel record" },
  { name: "Yoshinori Ohsumi", blood: "O", field: "Medicine", year: 2016, schoolCountry: "Japan", grade: "B", source: "https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016", note: "Named interview profile explicitly records ‘typical O’" },
  { name: "Bob Dylan", blood: "AB", field: "Literature", year: 2016, schoolCountry: "United States", grade: "C", source: aboFan, note: "Uncited compilation lead" },
];

const excluded = [
  { name: "Yasunari Kawabata", claims: "A vs O", field: "Literature" },
  { name: "Ryoji Noyori", claims: "A vs O", field: "Chemistry" },
  { name: "Masatoshi Koshiba", claims: "B vs O, later A", field: "Physics" },
];
const fields = ["All fields", "Physics", "Chemistry", "Medicine", "Literature", "Peace", "Economics"];
const fieldTotals: Record<string, number> = { Physics: 229, Chemistry: 198, Medicine: 232, Literature: 122, Peace: 112, Economics: 99 };
const highSchoolCountries: Metric[] = [
  { label: "United States", value: 155, color: "#4779d3" }, { label: "Canada", value: 12, color: "#2c9b8d" },
  { label: "Australia", value: 5, color: "#d6a038" }, { label: "South Africa", value: 3, color: "#d56767" },
  { label: "Germany", value: 2, color: "#8763b4" }, { label: "Hungary", value: 2, color: "#bf7643" },
  { label: "China", value: 2, color: "#d75862" }, { label: "Romania", value: 2, color: "#4c9eb7" },
];
const highSchoolFields: Metric[] = [
  { label: "Physics", value: 52, color: "#4779d3" }, { label: "Medicine", value: 51, color: "#2c9b8d" },
  { label: "Economics", value: 38, color: "#bf7643" }, { label: "Chemistry", value: 34, color: "#d6a038" },
  { label: "Peace", value: 9, color: "#d56767" }, { label: "Literature", value: 9, color: "#8763b4" },
];
const globalBloodTypes: Metric[] = [
  { label: "O+", value: 38.67, color: "#d93f56" }, { label: "A+", value: 27.42, color: "#ef6a62" },
  { label: "B+", value: 22.02, color: "#da8b3d" }, { label: "AB+", value: 5.88, color: "#8d68bd" },
  { label: "O−", value: 2.55, color: "#447d96" }, { label: "A−", value: 1.99, color: "#5c91a8" },
  { label: "B−", value: 1.11, color: "#78a7b9" }, { label: "AB−", value: 0.36, color: "#9bbdca" },
];
const baselines: Record<BaselineKey, { values: Record<BloodType, number>; source: string; note: string }> = {
  Global: { values: globalABO, source: "https://hemefoundation.org/what-types-of-blood-donations-are-considered-rare/", note: "Broad aggregate; weakest matching option" },
  Japan: { values: { A: 40, B: 20, AB: 10, O: 30 }, source: "https://www.bs.jrc.or.jp/kk/hyogo/donation/m2_02_01_00_bloodtype.html", note: "Japanese Red Cross population estimate" },
  "United States": { values: { A: 42, B: 10, AB: 4, O: 44 }, source: "https://stanfordbloodcenter.org/donate-blood/blood-donation-facts/blood-types/", note: "Stanford Blood Center / AABB educational estimate" },
  Canada: { values: { A: 42, B: 9, AB: 3, O: 46 }, source: "https://www.blood.ca/en/stories/blood-types-canada-how-common-or-rare-are-they", note: "Canadian Blood Services estimate" },
  "South Korea": { values: { A: 34, B: 27, AB: 12, O: 27 }, source: "https://www.statista.com/statistics/1364781/south-korea-blood-type-distribution/", note: "Rounded 2024 blood-donation distribution" },
};

const researchQueue = fields.slice(1).map((field) => {
  const claims = candidates.filter((record) => record.field === field);
  const conflicts = excluded.filter((record) => record.field === field).length;
  return {
    field,
    laureates: fieldTotals[field],
    corroborated: claims.filter((record) => record.grade === "B").length,
    leads: claims.filter((record) => record.grade === "C").length,
    conflicts,
    unknown: fieldTotals[field] - claims.length - conflicts,
  };
});

const changelog = [
  { version: "v0.3", date: "23 Aug 2026", title: "Research infrastructure", detail: "Added five population baselines, complete field-level research queue, durable source submissions, ancestry-aware matching protocol and statistical gate." },
  { version: "v0.2", date: "23 Aug 2026", title: "Evidence-grade redesign", detail: "Rebuilt the dashboard, added corroborated-only analysis, CSV export, sensitivity tests and upgraded Yoshinori Ohsumi to Grade B." },
  { version: "v0.1", date: "20 Aug 2026", title: "Initial screening atlas", detail: "Published 19 named claims, three excluded conflicts, global context and the structured high-school subset." },
];
const sourcebook = [
  { title: "Official Nobel Prize API", tag: "Primary", detail: "Prize years, categories and laureate identities.", href: "https://www.nobelprize.org/about/developer-zone-2/" },
  { title: "Ohsumi interview profile", tag: "Grade B · new", detail: "2013 interview profile explicitly lists Yoshinori Ohsumi as type O.", href: "https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016" },
  { title: "BBC: Obama security bubble", tag: "Grade B", detail: "Reports that AB blood travelled with the president for emergencies.", href: "http://news.bbc.co.uk/2/hi/americas/7973274.stm" },
  { title: "Our Blood Institute", tag: "Grade B", detail: "Reviews public evidence for Carter and Obama.", href: "https://ourbloodinstitute.org/blood-matters/blood-type-us-presidents/" },
  { title: "Asia Economy: Kim Dae-jung", tag: "Grade B", detail: "Korean report explicitly identifies type A.", href: "https://view.asiae.co.kr/article/2012072311474739066" },
  { title: "Japanese Red Cross", tag: "Baseline", detail: "Japan reference: A 40%, O 30%, B 20%, AB 10%.", href: "https://www.bs.jrc.or.jp/kk/hyogo/donation/m2_02_01_00_bloodtype.html" },
  { title: "Stanford Blood Center / AABB", tag: "Baseline", detail: "United States ABO/Rh estimates aggregated to A 42%, O 44%, B 10%, AB 4%.", href: "https://stanfordbloodcenter.org/donate-blood/blood-donation-facts/blood-types/" },
  { title: "Canadian Blood Services", tag: "Baseline", detail: "Canada ABO/Rh estimates aggregated to A 42%, O 46%, B 9%, AB 3%.", href: "https://www.blood.ca/en/stories/blood-types-canada-how-common-or-rare-are-they" },
  { title: "South Korea 2024 donor distribution", tag: "Baseline · donor", detail: "Rounded donation distribution: A 34%, O 27%, B 27%, AB 12%.", href: "https://www.statista.com/statistics/1364781/south-korea-blood-type-distribution/" },
  { title: "Heme Foundation world estimate", tag: "Baseline", detail: "Broad ABO/Rh composition used only as context.", href: "https://hemefoundation.org/what-types-of-blood-donations-are-considered-rare/" },
  { title: "Japanese Nobel compilation", tag: "Grade C", detail: "Discovery list with no person-level citations and several conflicts.", href: aboBible },
  { title: "ABO FAN compilation", tag: "Grade C", detail: "Additional international leads; not confirmation.", href: aboFan },
];

function BarChart({ data, suffix = "" }: { data: Metric[]; suffix?: string }) {
  const max = Math.max(...data.map((item) => item.value));
  return <div className="bar-chart">{data.map((item) => <div className="bar-row" key={item.label}>
    <div className="bar-meta"><span>{item.label}</span><strong>{item.value.toLocaleString()}{suffix}</strong></div>
    <div className="bar-track" role="img" aria-label={`${item.label}: ${item.value}${suffix}`}><i style={{ width: `${Math.max(item.value / max * 100, 1.2)}%`, background: item.color }} /></div>
  </div>)}</div>;
}

function ComparisonChart({ records, baseline }: { records: Candidate[]; baseline: Record<BloodType, number> }) {
  const rows = bloodTypes.map((type) => ({ type, observed: records.filter((record) => record.blood === type).length, expected: records.length * baseline[type] / 100 }));
  const max = Math.max(...rows.flatMap((row) => [row.observed, row.expected]), 1);
  return <div className="comparison-chart">{rows.map((row) => <div className="comparison-row" key={row.type}>
    <span className="type-token" style={{ background: colors[row.type] }}>{row.type}</span>
    <div className="comparison-bars"><div><span>Observed</span><i style={{ width: `${row.observed / max * 100}%`, background: colors[row.type] }} /><b>{row.observed}</b></div><div><span>Expected</span><i className="expected" style={{ width: `${row.expected / max * 100}%` }} /><b>{row.expected.toFixed(2)}</b></div></div>
  </div>)}</div>;
}

export default function Home() {
  const [field, setField] = useState("All fields");
  const [studySet, setStudySet] = useState<"all" | "corroborated">("all");
  const [evidence, setEvidence] = useState<"All" | EvidenceGrade>("All");
  const [blood, setBlood] = useState<"All" | BloodType>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"year" | "name" | "field">("year");
  const [schoolView, setSchoolView] = useState<"country" | "field">("country");
  const [populationView, setPopulationView] = useState<"rh" | "abo">("abo");
  const [baseline, setBaseline] = useState<BaselineKey>("Global");
  const [matchBasis, setMatchBasis] = useState<"country" | "ancestry">("country");
  const [queueField, setQueueField] = useState("All fields");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const baseStudy = useMemo(() => candidates.filter((record) => studySet === "all" || record.grade === "B"), [studySet]);
  const resultRecords = useMemo(() => baseStudy.filter((record) => field === "All fields" || record.field === field), [baseStudy, field]);
  const tableRecords = useMemo(() => candidates
    .filter((record) => evidence === "All" || record.grade === evidence)
    .filter((record) => blood === "All" || record.blood === blood)
    .filter((record) => `${record.name} ${record.field} ${record.schoolCountry}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "field" ? a.field.localeCompare(b.field) : b.year - a.year), [evidence, blood, query, sort]);
  const populationData = populationView === "rh" && baseline === "Global" ? globalBloodTypes : bloodTypes.map((type) => ({ label: type, value: baselines[baseline].values[type], color: colors[type] }));
  const coverage = field === "All fields" ? null : resultRecords.length / fieldTotals[field] * 100;
  const queueRows = researchQueue.filter((row) => queueField === "All fields" || row.field === queueField);
  const corroboratedCoverage = candidates.filter((record) => record.grade === "B").length / Object.values(fieldTotals).reduce((sum, value) => sum + value, 0) * 100;

  function downloadData() {
    const header = ["dataset_version", "name", "blood_type", "field", "year", "high_school_country", "ancestry_match", "evidence_grade", "source", "note"];
    const rows = candidates.map((record) => ["v0.3", record.name, record.blood, record.field, record.year, record.schoolCountry, "Unknown — do not infer", record.grade, record.source, record.note]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "nobel-blood-atlas-screening-data.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function submitEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("sending");
    setSubmissionMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/evidence-submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Submission failed");
      form.reset();
      setSubmissionState("success");
      setSubmissionMessage("Source received. It is marked pending and will not enter the analysis until independently reviewed.");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "Submission failed. Please try again.");
    }
  }

  return <main id="top">
    <a className="skip-link" href="#comparison">Skip to analysis</a>
    <nav className="nav"><div className="shell nav-inner"><a className="brand" href="#top"><span className="brand-mark">N</span><span>Nobel Blood Atlas</span></a><div className="nav-links"><a href="#comparison">Analysis</a><a href="#records">Records</a><a href="#queue">Research queue</a><a href="#contribute">Contribute</a><a href="#method">Method</a></div><button className="export-button" onClick={downloadData}>Download v0.3 CSV ↓</button></div></nav>

    <header className="dashboard-head shell">
      <div className="title-block"><p className="eyebrow">Evidence update · 23 August 2026</p><h1>Nobel laureates, blood type & evidence quality</h1><p>Person-level reports are compared with population baselines—without hiding contradictions, missingness or weak sources.</p></div>
      <div className="update-card"><span className="pulse" /><div><b>New corroboration</b><strong>Yoshinori Ohsumi · O</strong><small>A 2013 interview profile explicitly names his type, raising the corroborated set from 3 to 4.</small></div><a href="https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016" target="_blank" rel="noreferrer">View source ↗</a></div>
    </header>

    <section className="status-grid shell" aria-label="Research status"><article><span>Named claims</span><strong>19</strong><small>Screening set, not a census</small></article><article className="good"><span>Corroborated reports</span><strong>4</strong><small>21% of the screening set</small></article><article className="warn"><span>Unverified leads</span><strong>15</strong><small>Need a better source</small></article><article className="bad"><span>Conflicts excluded</span><strong>3</strong><small>Never included in charts</small></article></section>

    <section className="workspace shell" id="comparison">
      <aside className="filter-rail"><div><p className="filter-label">Study set</p><button className={studySet === "all" ? "active" : ""} onClick={() => setStudySet("all")}><span>All screening claims</span><b>19</b></button><button className={studySet === "corroborated" ? "active" : ""} onClick={() => setStudySet("corroborated")}><span>Corroborated only</span><b>4</b></button></div><div><p className="filter-label">Prize subject</p>{fields.map((item) => <button key={item} className={field === item ? "active" : ""} onClick={() => setField(item)}><span>{item}</span>{item !== "All fields" && <b>{baseStudy.filter((record) => record.field === item).length}</b>}</button>)}</div><div><p className="filter-label">Expected baseline</p>{(Object.keys(baselines) as BaselineKey[]).map((item) => <button key={item} className={baseline === item ? "active" : ""} onClick={() => { setBaseline(item); if (item !== "Global") setPopulationView("abo"); }}><span>{item}</span></button>)}</div><div className="legend"><p className="filter-label">Evidence</p><span><i className="legend-b" />B · explicit public report</span><span><i className="legend-c" />C · compilation lead</span></div></aside>
      <div className="analysis-surface"><div className="analysis-head"><div><p className="kicker">Observed vs expected</p><h2>{field}</h2></div><div className="sample-chip"><span>Current sample</span><b>n = {resultRecords.length}</b>{coverage !== null && <small>{coverage.toFixed(1)}% coverage</small>}</div></div>
        <div className="panel chart-card"><ComparisonChart records={resultRecords} baseline={baselines[baseline].values} /><aside><span className={`confidence ${studySet}`}>{studySet === "all" ? "Exploratory view" : "Higher-confidence view"}</span><h3>{resultRecords.length < 5 ? "Too few records for inference" : `${baseline} changes the expectation`}</h3><p>{studySet === "all" ? `Observed claims are compared with the ${baseline} reference. ${baselines[baseline].note}. This is a scenario—not a claim that every screened person belongs to that population.` : "The corroborated set contains only four people: A=2, AB=1, O=1 and B=0. All but Ohsumi are Peace laureates, so it cannot support a subject comparison."}</p><a className="baseline-source" href={baselines[baseline].source} target="_blank" rel="noreferrer">Baseline source ↗</a><div className="name-chips">{resultRecords.map((record) => <span key={record.name}>{record.name} · {record.blood}</span>)}</div></aside></div>
        <div className="sensitivity-grid"><article><span>Sensitivity test</span><strong>+45</strong><h3>non-AB records</h3><p>would reduce 4/19 AB to about the 6.24% global reference—without correcting any existing claim.</p></article><article><span>Japan-matched test</span><strong>+8</strong><h3>non-AB Japanese records</h3><p>would reduce 2/12 AB to Japan’s 10% reference.</p></article><article><span>Strongest finding</span><strong>79%</strong><h3>of claims are Grade C</h3><p>The documentation pattern is much stronger than any defensible blood-type pattern.</p></article></div>
        <div className="analysis-gate"><div><span>Statistical analysis gate</span><strong>Locked</strong></div><p>Current corroborated coverage is {corroboratedCoverage.toFixed(1)}%. Testing unlocks only after the predeclared requirements are met.</p><ul><li><b>4 total / 30 per field</b> Grade A/B records required</li><li><b>0.4% / 70%</b> unique-laureate coverage</li><li><b>Not met</b> expected count ≥5 in every ABO cell</li><li><b>Not met</b> conflict rate below 5%</li></ul></div>
      </div>
    </section>

    <section className="section dark-section" id="records"><div className="shell"><div className="section-heading light"><div><p className="kicker">Evidence ledger</p><h2>Audit every person behind the count</h2></div><p>Search, filter and open the exact person-level source. Grade B is a reputable explicit report; Grade C is a discovery lead, not confirmation.</p></div>
      <div className="ledger-toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, subject or country" aria-label="Search evidence ledger" /></label><div className="toolbar-group" aria-label="Evidence filter">{(["All", "B", "C"] as const).map((item) => <button key={item} className={evidence === item ? "active" : ""} onClick={() => setEvidence(item)}>{item === "All" ? "All evidence" : `Grade ${item}`}</button>)}</div><select value={blood} onChange={(event) => setBlood(event.target.value as "All" | BloodType)} aria-label="Filter by blood type"><option>All</option>{bloodTypes.map((item) => <option key={item}>{item}</option>)}</select><select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Sort records"><option value="year">Newest first</option><option value="name">Name A–Z</option><option value="field">Prize subject</option></select></div>
      <p className="result-count">Showing {tableRecords.length} of 19 records</p><div className="records-table"><div className="records-head"><span>Laureate / source note</span><span>Prize</span><span>ABO</span><span>School country</span><span>Evidence</span></div>{tableRecords.map((record) => <a className="record-row" href={record.source} target="_blank" rel="noreferrer" key={record.name}><span><strong>{record.name}</strong><small>{record.note}</small></span><span>{record.field}<small>{record.year}</small></span><span><i style={{ background: colors[record.blood] }} />{record.blood}</span><span>{record.schoolCountry}</span><span><b className={`grade grade-${record.grade.toLowerCase()}`}>{record.grade}</b>Open ↗</span></a>)}</div>{tableRecords.length === 0 && <div className="empty-state">No records match these filters.</div>}
      <div className="conflict-card"><div><p className="kicker">Excluded from calculations</p><h3>Contradictions are visible, not averaged away</h3></div>{excluded.map((item) => <div key={item.name}><strong>{item.name}</strong><small>{item.field}</small><b>{item.claims}</b></div>)}</div>
    </div></section>

    <section className="section queue-section" id="queue"><div className="shell"><div className="section-heading"><div><p className="kicker">Complete research queue</p><h2>Every laureate is represented—even when the answer is unknown</h2></div><p>The queue uses the official-prize denominator already crosswalked for this project. “Unknown” includes laureates not yet associated with any traceable public blood-type evidence.</p></div>
      <div className="queue-summary"><article><span>Laureates in denominator</span><strong>992</strong></article><article><span>Named claims tracked</span><strong>19</strong></article><article><span>Conflicts tracked</span><strong>3</strong></article><article><span>Unknown / unverified</span><strong>970</strong></article></div>
      <div className="queue-toolbar"><div className="segmented">{fields.map((item) => <button key={item} className={queueField === item ? "active" : ""} onClick={() => setQueueField(item)}>{item}</button>)}</div><span>Status definitions: corroborated · lead · conflict · unknown</span></div>
      <div className="queue-table"><div className="queue-head"><span>Prize subject</span><span>Total laureates</span><span>Grade B</span><span>Grade C</span><span>Conflicts</span><span>Unknown</span><span>Progress</span></div>{queueRows.map((row) => <div className="queue-row" key={row.field}><strong>{row.field}</strong><span>{row.laureates}</span><span className="queue-good">{row.corroborated}</span><span>{row.leads}</span><span className="queue-bad">{row.conflicts}</span><span>{row.unknown}</span><div><i style={{ width: `${(row.corroborated + row.leads + row.conflicts) / row.laureates * 100}%` }} /><small>{((row.corroborated + row.leads + row.conflicts) / row.laureates * 100).toFixed(1)}%</small></div></div>)}</div>
      <div className="queue-note"><b>Priority order</b><span>1. Resolve current conflicts</span><span>2. Upgrade Grade C leads</span><span>3. Search living laureates with ethical public-source methods</span><span>4. Record negative searches and dates</span></div>
    </div></section>

    <section className="section shell" id="schools"><div className="section-heading"><div><p className="kicker">High-school country</p><h2>A separate, incomplete education trail</h2></div><p>224 structured school records cover 193 unique laureates across 17 countries. This is a discovery dataset and is not the denominator for blood-type analysis.</p></div><div className="segmented"><button className={schoolView === "country" ? "active" : ""} onClick={() => setSchoolView("country")}>By country</button><button className={schoolView === "field" ? "active" : ""} onClick={() => setSchoolView("field")}>By subject</button></div><div className="panel split-panel"><BarChart data={schoolView === "country" ? highSchoolCountries : highSchoolFields} /><aside className="bias-card"><span>Bias warning</span><h3>U.S. dominance is probably documentation, not performance.</h3><p>High-school coverage is English-heavy and missing non-randomly. School country is also a weak proxy for ancestry, which is more relevant to ABO prevalence.</p></aside></div></section>

    <section className="section tinted" id="population"><div className="shell"><div className="section-heading"><div><p className="kicker">Population reference</p><h2>Country baselines are now selectable</h2></div><p>Global, Japan, United States, Canada and South Korea estimates are kept separate. Each baseline has a visible source and is never presented as ancestry.</p></div><div className="baseline-toolbar"><div className="segmented">{(Object.keys(baselines) as BaselineKey[]).map((item) => <button key={item} className={baseline === item ? "active" : ""} onClick={() => { setBaseline(item); if (item !== "Global") setPopulationView("abo"); }}>{item}</button>)}</div><div className="segmented"><button className={populationView === "abo" ? "active" : ""} onClick={() => setPopulationView("abo")}>ABO only</button><button disabled={baseline !== "Global"} className={populationView === "rh" ? "active" : ""} onClick={() => setPopulationView("rh")}>ABO + Rh</button></div></div><div className="panel split-panel"><BarChart data={populationData} suffix="%" /><aside className="population-card"><span>{baseline} reference</span><strong>{Math.max(...Object.values(baselines[baseline].values)).toFixed(0)}%</strong><h3>{bloodTypes.find((type) => baselines[baseline].values[type] === Math.max(...Object.values(baselines[baseline].values)))} is most common</h3><p>{baselines[baseline].note}. National averages remain imperfect because ABO frequencies vary within countries and across ancestry groups.</p><a href={baselines[baseline].source} target="_blank" rel="noreferrer">Open baseline source ↗</a></aside></div>
      <div className="matching-card"><div><p className="kicker">Matching hierarchy</p><h3>Use the most biologically relevant evidence available</h3></div><div className="matching-toggle"><button className={matchBasis === "country" ? "active" : ""} onClick={() => setMatchBasis("country")}>Country proxy</button><button className={matchBasis === "ancestry" ? "active" : ""} onClick={() => setMatchBasis("ancestry")}>Ancestry-aware</button></div><p>{matchBasis === "country" ? "Available now, but weak: high-school country is consistently recorded and does not establish ancestry. Results remain exploratory." : "Preferred but unavailable for current records: use only self-described ancestry or a citable biographical source. Never infer ancestry from a name, nationality, photograph or school."}</p><div className="matching-steps"><span><b>1</b>Self-report or medical source</span><span><b>2</b>Citable ancestry context</span><span><b>3</b>Country proxy</span><span><b>4</b>Global fallback</span></div></div>
    </div></section>

    <section className="section shell" id="method"><div className="section-heading"><div><p className="kicker">What deeper research found</p><h2>The missing data are the story</h2></div><p>The multilingual search produced one new corroboration, one unresolved donation trail and a useful negative result: many popular profiles repeat claims without showing where they came from.</p></div><div className="finding-grid"><article className="featured"><span>New Grade B</span><h3>Yoshinori Ohsumi · O</h3><p>A named 2013 interview profile lists “typical O.” This is explicit person-level evidence, although it is still not a medical record.</p><a href="https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016" target="_blank" rel="noreferrer">Open interview ↗</a></article><article><span>Unresolved</span><h3>Kailash Satyarthi donated blood</h3><p>The Times of India confirms a December 2014 donation and a donor-directory entry, but the article does not disclose his type. Donation does not justify inference.</p><a href="https://timesofindia.indiatimes.com/city/bhopal/blood-brother-of-vidisha-creates-donor-directory-of-85k-people/articleshow/54938960.cms" target="_blank" rel="noreferrer">Open report ↗</a></article><article><span>Conflict found</span><h3>Han Kang: A versus “not public”</h3><p>Two Korean profile blogs disagree, and neither provides a traceable original source. She stays out of the dataset.</p><a href="https://googlethx.tistory.com/entry/%EB%85%B8%EB%B2%A8%EB%AC%B8%ED%95%99%EC%83%81-%ED%95%9C%EA%B0%95-%EC%9E%91%EA%B0%80-%ED%94%84%EB%A1%9C%ED%95%84" target="_blank" rel="noreferrer">See “not public” profile ↗</a></article></div>
      <div className="method-card"><div><span>Matched expectation</span><strong>E<sub>f,t</sub> = Σ p<sub>countryᵢ,t</sub></strong></div><p>For each laureate in subject f, add the prevalence of blood type t in a predeclared matching population. Then report known, unknown, conflicted and unsearched counts before any statistical test.</p></div><div className="protocol-grid"><article><b>01</b><h3>Crosswalk Nobel IDs</h3><p>Verify name, year and field against official Nobel records.</p></article><article><b>02</b><h3>Search local languages</h3><p>Use name variants plus blood-type terms in the relevant country.</p></article><article><b>03</b><h3>Trace the first source</h3><p>Do not count copied celebrity lists as independent confirmation.</p></article><article><b>04</b><h3>Publish missingness</h3><p>Unknown and conflicting cases belong beside every result.</p></article></div>
    </section>

    <section className="section contribute-section" id="contribute"><div className="shell"><div className="section-heading light"><div><p className="kicker">Contribute evidence</p><h2>Submit a person-specific source</h2></div><p>Submissions are stored as pending review. They never change the dataset automatically, and a source must explicitly connect a named laureate with a blood type.</p></div>
      <div className="contribute-layout"><form className="submission-form" onSubmit={submitEvidence}><label><span>Laureate’s full name *</span><input name="laureateName" required minLength={3} maxLength={120} placeholder="e.g., Yoshinori Ohsumi" /></label><div className="form-row"><label><span>Reported ABO type *</span><select name="bloodType" required defaultValue=""><option value="" disabled>Select</option>{[...bloodTypes, "Unknown"].map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Source type *</span><select name="sourceKind" required defaultValue=""><option value="" disabled>Select</option><option>Self-report</option><option>Medical or donor record</option><option>Reputable news report</option><option>Biography or interview</option><option>Other</option></select></label></div><label><span>Person-specific HTTPS source URL *</span><input name="sourceUrl" type="url" required pattern="https://.*" placeholder="https://example.org/interview" /></label><label><span>Ancestry or population context</span><input name="ancestryContext" maxLength={300} placeholder="Only if self-described or explicitly sourced; include context in notes" /></label><label><span>Evidence notes</span><textarea name="notes" maxLength={1200} rows={4} placeholder="Where does the source state the blood type? Note any ambiguity or conflicting source." /></label><label><span>Contact email (optional)</span><input name="contactEmail" type="email" maxLength={200} placeholder="For reviewer follow-up only" /></label><label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label><button type="submit" disabled={submissionState === "sending"}>{submissionState === "sending" ? "Submitting…" : "Submit for review"}</button>{submissionMessage && <p className={`form-message ${submissionState}`} role="status">{submissionMessage}</p>}</form>
        <aside className="submission-rules"><span>Acceptance checklist</span><h3>What counts as useful evidence?</h3><ul><li>The page names the laureate unambiguously.</li><li>It states an ABO type explicitly—no personality-based inference.</li><li>The original source is preferable to copied profiles.</li><li>Conflicts are disclosed rather than resolved by majority vote.</li><li>Ancestry is never inferred from name, nationality or appearance.</li></ul><div><b>Review outcome</b><p>Accepted evidence receives a grade, reviewer note, access date and dataset version. Rejected submissions remain outside every chart.</p></div></aside></div>
    </div></section>

    <section className="section changelog-section shell" id="changelog"><div className="section-heading"><div><p className="kicker">Versioned research</p><h2>Dataset changelog</h2></div><p>Each update records what changed and why. The CSV now carries its dataset version and explicitly marks ancestry as unknown where no source exists.</p></div><div className="version-banner"><div><span>Current dataset</span><strong>v0.3</strong></div><p>Released 23 August 2026 · 19 included screening claims · 4 corroborated · 15 leads · 3 excluded conflicts</p><button onClick={downloadData}>Download v0.3 CSV ↓</button></div><div className="timeline">{changelog.map((item) => <article key={item.version}><span>{item.date}</span><b>{item.version}</b><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div></section>

    <section className="section source-section shell"><div className="section-heading"><div><p className="kicker">Sourcebook</p><h2>Open the evidence</h2></div><p>Every analytical claim should be reproducible from a named source and a visible inclusion rule.</p></div><div className="source-list">{sourcebook.map((source, index) => <a href={source.href} target="_blank" rel="noreferrer" key={source.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{source.title}</strong><small>{source.detail}</small></div><b>{source.tag}</b><i>↗</i></a>)}</div></section>

    <footer><div className="shell footer-inner"><div className="brand"><span className="brand-mark">N</span><span>Nobel Blood Atlas</span></div><p>Named observations · matched expectations · missingness visible</p><a href="#top">Back to top ↑</a></div></footer>
  </main>;
}
