import { describe, it, expect } from "vitest";
import {
  getTemplate,
  getProcedureOptionsByCategory,
  PROCEDURE_OPTIONS,
  PROCEDURE_TEMPLATES,
} from "../lib/procedureTemplates";

describe("procedureTemplates", () => {
  it("returns the matching template for a known procedure id", () => {
    const t = getTemplate("cesarean_section");
    expect(t.id).toBe("cesarean_section");
    expect(t.steps.length).toBeGreaterThan(0);
  });

  it("falls back to the 'other' template for an unknown procedure id", () => {
    const t = getTemplate("some_unknown_procedure_xyz");
    expect(t.id).toBe("other");
  });

  it("exposes every template as a selectable option", () => {
    expect(PROCEDURE_OPTIONS.length).toBe(Object.keys(PROCEDURE_TEMPLATES).length);
    expect(PROCEDURE_OPTIONS.some((o) => o.id === "tahbso")).toBe(true);
  });

  it("filters options to the obstetric category plus 'other'", () => {
    const options = getProcedureOptionsByCategory("obstetric");
    expect(options.some((o) => o.id === "cesarean_section")).toBe(true);
    expect(options.some((o) => o.id === "btl_postpartum")).toBe(true);
    expect(options.some((o) => o.id === "other")).toBe(true);
    expect(options.some((o) => o.id === "tahbso")).toBe(false);
  });

  it("filters options to the gynecologic category plus 'other'", () => {
    const options = getProcedureOptionsByCategory("gynecologic");
    expect(options.some((o) => o.id === "tahbso")).toBe(true);
    expect(options.some((o) => o.id === "leep")).toBe(true);
    expect(options.some((o) => o.id === "other")).toBe(true);
    expect(options.some((o) => o.id === "cesarean_section")).toBe(false);
  });
});
