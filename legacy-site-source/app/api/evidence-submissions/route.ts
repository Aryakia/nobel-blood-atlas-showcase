import { getDb } from "../../../db";
import { evidenceSubmissions } from "../../../db/schema";

const allowedBloodTypes = new Set(["A", "B", "AB", "O", "Unknown"]);
const allowedSourceKinds = new Set(["Self-report", "Medical or donor record", "Reputable news report", "Biography or interview", "Other"]);

function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const laureateName = String(payload.laureateName ?? "").trim();
    const bloodType = String(payload.bloodType ?? "").trim();
    const sourceUrl = String(payload.sourceUrl ?? "").trim();
    const sourceKind = String(payload.sourceKind ?? "").trim();
    const ancestryContext = String(payload.ancestryContext ?? "").trim();
    const notes = String(payload.notes ?? "").trim();
    const contactEmail = String(payload.contactEmail ?? "").trim();
    const website = String(payload.website ?? "").trim();

    if (website) return Response.json({ ok: true }, { status: 201 });
    if (laureateName.length < 3 || laureateName.length > 120) return Response.json({ error: "Enter the laureate’s full name." }, { status: 400 });
    if (!allowedBloodTypes.has(bloodType)) return Response.json({ error: "Select a valid ABO blood type." }, { status: 400 });
    if (!isHttpsUrl(sourceUrl) || sourceUrl.length > 500) return Response.json({ error: "A valid HTTPS person-specific source URL is required." }, { status: 400 });
    if (!allowedSourceKinds.has(sourceKind)) return Response.json({ error: "Select the source type." }, { status: 400 });
    if (notes.length > 1200 || ancestryContext.length > 300 || contactEmail.length > 200) return Response.json({ error: "One or more fields are too long." }, { status: 400 });

    const db = getDb();
    const [submission] = await db.insert(evidenceSubmissions).values({
      laureateName, bloodType, sourceUrl, sourceKind, ancestryContext, notes, contactEmail,
    }).returning({ id: evidenceSubmissions.id, reviewStatus: evidenceSubmissions.reviewStatus });

    return Response.json({ submission }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
