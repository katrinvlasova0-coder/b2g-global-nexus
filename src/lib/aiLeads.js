import { buildLeadPayload } from './leads.js';

/**
 * Map /ai Deployment form fields into the shared leads sheet payload.
 */
export function buildAiDeployLeadPayload(form, meta = {}) {
  const messageParts = [
    form.company && `Company: ${form.company}`,
    form.phone && `Phone: ${form.phone}`,
    form.industry && `Industry: ${form.industry}`,
    form.tender_volume !== '' && form.tender_volume != null && `Tenders/month: ${form.tender_volume}`,
    form.team_size !== '' && form.team_size != null && `Team size: ${form.team_size}`,
    form.preferred_solution && `Solution: ${form.preferred_solution}`,
    form.additional_requirements && `Notes: ${form.additional_requirements}`,
  ].filter(Boolean);

  return buildLeadPayload(
    {
      name: form.contact_person,
      email: form.email,
      country: form.country,
      role: form.preferred_solution || 'AI Tender Specialist',
      message: messageParts.join('\n'),
      consent: form.consent,
    },
    {
      source: 'ai-landing',
      form: 'ai-deploy',
      ...meta,
    },
  );
}
