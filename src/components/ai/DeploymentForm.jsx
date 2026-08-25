import React, { useState, useEffect } from "react";
import { CheckCircle2, Rocket } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";
import { AI_SOLUTIONS, buildAiDeployLeadPayload } from "@/lib/aiLeads";
import { captureAttribution, detectDevice, submitLead } from "@/lib/leads";
import { trackLead } from "@/lib/metaPixel";
import { useLanguage } from "@/pages/ai/i18n/LanguageContext";

const INDUSTRIES = ["Construction", "Engineering", "Manufacturing", "Equipment Supply", "IT", "Logistics", "Healthcare", "Infrastructure", "Professional Services", "Other"];
const PRODUCT_KEY = "b2g_ai_product";

function readPreselectedProduct() {
  try {
    const fromStorage = sessionStorage.getItem(PRODUCT_KEY);
    if (AI_SOLUTIONS.includes(fromStorage)) return fromStorage;
  } catch {
    /* ignore */
  }
  try {
    const q = new URLSearchParams(window.location.search).get("product");
    if (AI_SOLUTIONS.includes(q)) return q;
  } catch {
    /* ignore */
  }
  return "AI Tender Specialist";
}

function inputCls() {
  return "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-navy-200 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none";
}

export default function DeploymentForm() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({
    company: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    tender_volume: "",
    team_size: "",
    preferred_solution: "AI Tender Specialist",
    additional_requirements: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const product = readPreselectedProduct();
    setForm((f) => ({ ...f, preferred_solution: product }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.company || !form.contact_person || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the contact consent to continue.");
      return;
    }
    setLoading(true);
    try {
      const attribution = captureAttribution(window.location.search, window.sessionStorage);
      const payload = buildAiDeployLeadPayload(form, {
        language: lang,
        page: window.location.href,
        site: window.location.hostname,
        device: detectDevice(navigator.userAgent, window.innerWidth),
        ...attribution,
      });
      await submitLead(payload);
      trackLead({ source: "ai-landing", form: "ai-deploy", product: form.preferred_solution, ...attribution });
      try {
        sessionStorage.removeItem(PRODUCT_KEY);
      } catch {
        /* ignore */
      }
      setDone(true);
    } catch (err) {
      console.error("AI deploy lead failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="deploy" dark className="bg-navy-900">
      <SectionHeading
        light
        eyebrow="DEPLOYMENT"
        title={<>DEPLOY YOUR FIRST<br />AI TENDER SPECIALIST</>}
        subtitle="Choose the AI workforce level. We tag your choice in the lead so the team knows exactly what to deploy."
      />
      <Reveal>
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-navy-800/60 p-5 sm:p-6 md:p-8">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 size={56} className="mx-auto text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white">Application received.</h3>
              <p className="mt-2 text-navy-100">
                Requested: <span className="text-cyan-light font-semibold">{form.preferred_solution}</span>. Our team will contact you with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy-200 mb-2">What do you want to deploy? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {AI_SOLUTIONS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, preferred_solution: s }))}
                      className={`px-3 py-3 rounded-lg text-xs font-semibold border transition-all text-left sm:text-center ${form.preferred_solution === s ? "border-cyan bg-cyan/15 text-cyan-light" : "border-white/10 text-navy-100 hover:border-white/20"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-navy-300">Selected product is saved with the lead: {form.preferred_solution}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Company *" value={form.company} onChange={set("company")} dark />
                <Field label="Contact Person *" value={form.contact_person} onChange={set("contact_person")} dark />
                <Field label="Business Email *" value={form.email} onChange={set("email")} type="email" dark />
                <Field label="Phone" value={form.phone} onChange={set("phone")} dark />
                <Field label="Country" value={form.country} onChange={set("country")} dark />
                <div>
                  <label className="block text-xs font-medium text-navy-200 mb-1.5">Industry</label>
                  <select value={form.industry} onChange={set("industry")} className={inputCls()}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i} className="text-navy-900">{i}</option>
                    ))}
                  </select>
                </div>
                <Field label="Tender Volume per Month" value={form.tender_volume} onChange={set("tender_volume")} type="number" dark />
                <Field label="Current Tender Team Size" value={form.team_size} onChange={set("team_size")} type="number" dark />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy-200 mb-1.5">Additional Requirements</label>
                <textarea
                  value={form.additional_requirements}
                  onChange={set("additional_requirements")}
                  rows={3}
                  className={inputCls()}
                  placeholder="Describe your tender operation and goals..."
                />
              </div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-navy-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#00E5FF]"
                />
                <span>By submitting, you agree to be contacted by B2G Global Services Corp.</span>
              </label>
              {error && <p className="text-sm text-rose-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-cyan text-navy-900 text-sm font-bold hover:bg-cyan-light disabled:opacity-50 transition-colors min-h-[48px]"
              >
                <Rocket size={16} /> {loading ? "SUBMITTING..." : `APPLY — ${form.preferred_solution.toUpperCase()}`}
              </button>
              <p className="text-center text-xs text-navy-300">No payment is processed. Pricing is defined per implementation.</p>
            </form>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

function Field({ label, value, onChange, type = "text", dark }) {
  return (
    <div>
      <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-navy-200" : "text-muted-foreground"}`}>{label}</label>
      <input type={type} value={value} onChange={onChange} className={inputCls()} />
    </div>
  );
}
