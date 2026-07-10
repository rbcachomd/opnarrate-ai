/**
 * Curated, evidence-based OB-GYN procedure step outlines.
 *
 * These outlines exist to GROUND the AI generation step — the model is instructed
 * to follow this sequence of steps (adapting wording to the physician's dictation
 * and case specifics), rather than free-generating a narrative with no clinical
 * anchor. Sources are indicative reference texts commonly used in Philippine
 * OB-GYN training programs; institutions should confirm alignment with their own
 * departmental protocols before clinical use.
 */

export interface ProcedureTemplate {
  id: string;
  label: string;
  referenceNote: string;
  steps: string[];
}

export const PROCEDURE_TEMPLATES: Record<string, ProcedureTemplate> = {
  cesarean_section: {
    id: "cesarean_section",
    label: "Cesarean Section (Low Transverse)",
    referenceNote:
      "Adapted from standard low-transverse cesarean section sequence (Williams Obstetrics; Te Linde's Operative Gynecology general surgical-step conventions).",
    steps: [
      "Patient positioned supine with left lateral tilt; anesthesia confirmed adequate.",
      "Skin prepped and draped in the usual sterile fashion.",
      "Pfannenstiel (or per dictation) skin incision made and carried down to the fascia.",
      "Fascia incised transversely and extended; rectus muscles separated in the midline.",
      "Peritoneum entered sharply/bluntly; bladder flap created and reflected inferiorly.",
      "Low transverse uterine incision made and extended bluntly.",
      "Fetus delivered (vertex/breech per dictation); cord clamped and cut; infant handed to pediatric team.",
      "Placenta delivered spontaneously/manually; uterine cavity explored and cleared of debris.",
      "Uterine incision repaired in two layers with appropriate suture.",
      "Hemostasis confirmed; abdomen inspected; counts (sponge, instrument, needle) verified correct.",
      "Fascia, subcutaneous tissue, and skin closed in layers per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  tahbso: {
    id: "tahbso",
    label: "Total Abdominal Hysterectomy with Bilateral Salpingo-Oophorectomy (TAHBSO)",
    referenceNote:
      "Adapted from standard TAH-BSO sequence (Te Linde's Operative Gynecology general conventions).",
    steps: [
      "Patient positioned supine; anesthesia confirmed adequate; prepped and draped.",
      "Abdomen entered via the planned incision; exploration performed and findings noted.",
      "Round ligaments identified, clamped, cut, and ligated bilaterally.",
      "Anterior and posterior leaves of the broad ligament opened; bladder flap developed.",
      "Infundibulopelvic ligaments (or utero-ovarian ligaments, per findings) identified, clamped, cut, and ligated bilaterally, with ureter identified and protected.",
      "Uterine vessels skeletonized, clamped, cut, and ligated bilaterally at the level of the internal os.",
      "Cardinal and uterosacral ligaments clamped, cut, and ligated bilaterally.",
      "Vagina entered circumferentially; uterus, tubes, and ovaries delivered en bloc and sent for histopathology.",
      "Vaginal cuff angles secured and cuff closed with appropriate suture.",
      "Hemostasis confirmed at all pedicles; abdomen irrigated; counts verified correct.",
      "Abdominal wall closed in layers per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  myomectomy: {
    id: "myomectomy",
    label: "Abdominal Myomectomy",
    referenceNote:
      "Adapted from standard abdominal myomectomy sequence (Te Linde's Operative Gynecology general conventions).",
    steps: [
      "Patient positioned supine; anesthesia confirmed adequate; prepped and draped.",
      "Abdomen entered via the planned incision; exploration performed and findings noted.",
      "Vasopressin/dilute uterotonic infiltrated at myoma pseudocapsule if per institutional protocol (per dictation).",
      "Serosal/myometrial incision made over the most prominent myoma(s).",
      "Myoma(s) enucleated from the pseudocapsule using traction and countertraction; each myoma bed inspected.",
      "Number, size, and location of myomas removed recorded.",
      "Myometrial defect(s) closed in layers to obliterate dead space and secure hemostasis.",
      "Serosa reapproximated; adhesion barrier applied if per dictation.",
      "Hemostasis confirmed; abdomen irrigated; counts verified correct.",
      "Abdominal wall closed in layers per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  d_and_c: {
    id: "d_and_c",
    label: "Dilatation and Curettage (D&C)",
    referenceNote:
      "Adapted from standard D&C sequence (Te Linde's Operative Gynecology general conventions).",
    steps: [
      "Patient positioned in dorsal lithotomy; anesthesia/analgesia confirmed adequate.",
      "Perineum and vagina prepped; bladder emptied.",
      "Bimanual examination performed to confirm uterine size and position.",
      "Weighted speculum inserted; anterior lip of cervix grasped with tenaculum.",
      "Uterine sound passed to confirm depth and direction.",
      "Cervix dilated progressively to the required diameter.",
      "Sharp and/or suction curettage performed systematically around the uterine cavity.",
      "Tissue obtained sent for histopathologic examination.",
      "Hemostasis confirmed; instruments removed.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  other: {
    id: "other",
    label: "Other / Custom Procedure",
    referenceNote:
      "No curated template available — generation will rely primarily on the physician's dictated summary. Use with additional care and review.",
    steps: [
      "Patient positioned and prepped per standard practice for the stated procedure.",
      "Procedure performed as described in the physician's dictation.",
      "Hemostasis confirmed; counts verified correct.",
      "Closure performed per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
};

export function getTemplate(procedureId: string): ProcedureTemplate {
  return PROCEDURE_TEMPLATES[procedureId] ?? PROCEDURE_TEMPLATES.other;
}

export const PROCEDURE_OPTIONS = Object.values(PROCEDURE_TEMPLATES).map((t) => ({
  id: t.id,
  label: t.label,
}));
