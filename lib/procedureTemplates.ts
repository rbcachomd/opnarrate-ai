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

export type ProcedureCategory = "obstetric" | "gynecologic" | "other";

export interface ProcedureTemplate {
  id: string;
  label: string;
  category: ProcedureCategory;
  referenceNote: string;
  steps: string[];
}

export const PROCEDURE_TEMPLATES: Record<string, ProcedureTemplate> = {
  cesarean_section: {
    id: "cesarean_section",
    label: "Cesarean Section (Low Transverse)",
    category: "obstetric",
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
    category: "gynecologic",
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
    category: "gynecologic",
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
    category: "gynecologic",
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
  vaginal_hysterectomy: {
    id: "vaginal_hysterectomy",
    label: "Vaginal Hysterectomy (NDVH)",
    category: "gynecologic",
    referenceNote:
      "Adapted from standard non-descensus vaginal hysterectomy sequence (Te Linde's Operative Gynecology general conventions).",
    steps: [
      "Patient positioned in dorsal lithotomy; anesthesia confirmed adequate; perineum and vagina prepped and draped.",
      "Cervix grasped with tenaculum and downward traction applied.",
      "Circumferential incision made at the cervicovaginal junction.",
      "Bladder mobilized and dissected off the anterior lower uterine segment; anterior cul-de-sac entered.",
      "Posterior cul-de-sac entered sharply.",
      "Uterosacral and cardinal ligaments clamped, cut, and ligated bilaterally.",
      "Uterine vessels clamped, cut, and ligated bilaterally.",
      "Fundus delivered through the vaginal introitus, with bisection/morcellation if needed for uterine size.",
      "Utero-ovarian/infundibulopelvic pedicles clamped, cut, and ligated bilaterally (adnexa removed if indicated per dictation).",
      "All pedicles inspected for hemostasis; vaginal cuff angles secured to the uterosacral ligaments for apical support.",
      "Vaginal cuff closed with appropriate suture.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  btl_postpartum: {
    id: "btl_postpartum",
    label: "Postpartum Bilateral Tubal Ligation (Modified Pomeroy)",
    category: "obstetric",
    referenceNote:
      "Adapted from the standard modified Pomeroy postpartum tubal ligation sequence (Williams Obstetrics general conventions), typically performed via mini-laparotomy after vaginal delivery.",
    steps: [
      "Patient positioned supine; regional or general anesthesia confirmed adequate.",
      "Infraumbilical mini-laparotomy incision made and carried down to the peritoneum, accounting for the enlarged postpartum uterine fundus.",
      "Peritoneal cavity entered; each fallopian tube identified and traced from fimbria to cornu to confirm correct structure prior to ligation.",
      "Midsegment of the right fallopian tube grasped and elevated as a loop.",
      "Loop ligated at its base with absorbable suture and the loop excised (modified Pomeroy technique).",
      "Same technique repeated on the left fallopian tube.",
      "Excised tubal segments sent for histopathologic confirmation.",
      "Hemostasis of both tubal stumps confirmed.",
      "Peritoneum, fascia, and skin closed in layers per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  ovarian_cystectomy: {
    id: "ovarian_cystectomy",
    label: "Ovarian Cystectomy",
    category: "gynecologic",
    referenceNote:
      "Adapted from standard ovarian cystectomy sequence (Te Linde's Operative Gynecology general conventions); applicable to open or laparoscopic approach per dictation.",
    steps: [
      "Patient positioned supine; anesthesia confirmed adequate; abdomen prepped and draped.",
      "Abdomen entered via the planned incision (or ports placed if laparoscopic, per dictation); exploration performed and findings noted.",
      "Affected ovary identified and delivered/exposed into the operative field.",
      "Ovarian cortex incised over the cyst wall.",
      "Cyst dissected free from surrounding normal ovarian parenchyma using blunt and sharp dissection, with care to avoid rupture.",
      "Cyst wall inspected grossly and sent for histopathologic examination; cyst contents noted per dictation (serous, mucinous, endometriotic, dermoid, etc.).",
      "Ovarian defect reapproximated with fine absorbable suture, preserving ovarian tissue and securing hemostasis.",
      "Contralateral ovary and both fallopian tubes inspected and findings noted.",
      "Hemostasis confirmed; abdomen irrigated; counts verified correct.",
      "Abdominal wall (or port sites) closed per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  salpingectomy: {
    id: "salpingectomy",
    label: "Salpingectomy (Ectopic Pregnancy)",
    category: "obstetric",
    referenceNote:
      "Adapted from standard salpingectomy sequence for tubal ectopic pregnancy (Williams Obstetrics / Te Linde's general conventions); applicable to open or laparoscopic approach per dictation.",
    steps: [
      "Patient positioned supine; anesthesia confirmed adequate; abdomen prepped and draped.",
      "Abdomen entered via the planned incision or ports placed; hemoperitoneum, if present, evacuated and quantified.",
      "Pelvic exploration performed; affected fallopian tube identified with the ectopic pregnancy visualized at the site described in the dictation (ampullary, isthmic, fimbrial, etc.).",
      "Mesosalpinx serially clamped, cut, and ligated from the fimbrial end toward the cornu.",
      "Affected tube excised in its entirety at the cornual junction.",
      "Specimen sent for histopathologic confirmation.",
      "Contralateral tube and both ovaries inspected and findings noted.",
      "Hemostasis confirmed at the cornual stump and mesosalpinx; pelvis irrigated; counts verified correct.",
      "Abdominal wall (or port sites) closed per routine.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  leep: {
    id: "leep",
    label: "LEEP (Loop Electrosurgical Excision Procedure)",
    category: "gynecologic",
    referenceNote:
      "Adapted from standard LEEP sequence for cervical intraepithelial neoplasia management (general colposcopy/cervical excision conventions).",
    steps: [
      "Patient positioned in dorsal lithotomy; local anesthesia with vasoconstrictor infiltrated into the cervix.",
      "Speculum inserted; cervix visualized and colposcopically assessed, with the transformation zone and lesion identified.",
      "Appropriately sized loop electrode selected based on lesion size and extent of the transformation zone.",
      "Single-pass excision performed encompassing the entire transformation zone and visualized lesion to adequate depth.",
      "Specimen oriented for the pathologist and sent for histopathologic examination.",
      "Base of the excision site fulgurated for hemostasis using a ball electrode.",
      "Hemostatic agent (e.g., Monsel's solution) applied as needed.",
      "Cervix inspected and confirmed hemostatic prior to removing the speculum.",
      "Patient tolerated the procedure well with minimal blood loss; discharged with post-procedure instructions.",
    ],
  },
  perineal_laceration_repair: {
    id: "perineal_laceration_repair",
    label: "Perineal Laceration Repair (2nd–4th Degree)",
    category: "obstetric",
    referenceNote:
      "Adapted from standard perineal laceration repair sequence following vaginal delivery (Williams Obstetrics general conventions).",
    steps: [
      "Patient positioned in dorsal lithotomy following vaginal delivery; adequate anesthesia/analgesia confirmed.",
      "Perineum and vaginal laceration systematically inspected and the degree of laceration determined per dictation (2nd, 3rd, or 4th degree, noting anal sphincter/rectal mucosa involvement if present).",
      "Vaginal mucosal laceration repaired first with continuous absorbable suture, restoring hymenal ring landmarks.",
      "If 3rd/4th degree: rectal mucosa, if torn, repaired in continuous fashion; internal and external anal sphincter identified, grasped, and repaired (end-to-end or overlap technique) with appropriate suture.",
      "Perineal body muscles reapproximated in layers.",
      "Subcutaneous perineal tissue closed.",
      "Skin closed with subcuticular or interrupted sutures per routine.",
      "Rectal examination performed after repair to confirm suture integrity and absence of suture material through the rectal mucosa.",
      "Hemostasis confirmed; estimated blood loss recorded; patient tolerated the procedure well.",
    ],
  },
  d_and_e: {
    id: "d_and_e",
    label: "Dilatation and Evacuation (D&E)",
    category: "obstetric",
    referenceNote:
      "Adapted from standard D&E sequence (Williams Obstetrics / Te Linde's general conventions), distinguished from D&C by gestational-age-appropriate cervical preparation and evacuation technique.",
    steps: [
      "Patient positioned in dorsal lithotomy; adequate anesthesia/analgesia confirmed; cervical preparation (osmotic dilators/misoprostol per dictation) noted if performed prior to the procedure.",
      "Perineum and vagina prepped; bladder emptied.",
      "Bimanual examination performed to confirm uterine size and position.",
      "Weighted speculum inserted; anterior lip of cervix grasped with tenaculum.",
      "Cervix dilated progressively to the diameter required for the gestational age.",
      "Evacuation performed using a combination of forceps and suction curettage under systematic technique.",
      "Uterine cavity explored to confirm completeness of evacuation.",
      "Products of conception inspected grossly for completeness and sent for pathologic examination per protocol.",
      "Hemostasis confirmed; instruments removed.",
      "Estimated blood loss recorded; patient transferred to recovery in stable condition.",
    ],
  },
  other: {
    id: "other",
    label: "Other / Custom Procedure",
    category: "other",
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

/**
 * Returns procedure options belonging to the chosen top-level category
 * (Obstetric or Gynecologic), with the "Other / Custom Procedure" template
 * always appended at the end so it remains available regardless of category.
 */
export function getProcedureOptionsByCategory(category: "obstetric" | "gynecologic") {
  return Object.values(PROCEDURE_TEMPLATES)
    .filter((t) => t.category === category || t.category === "other")
    .map((t) => ({ id: t.id, label: t.label }));
}
