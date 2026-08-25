import { buildLeadPayload } from './leads.js';

export const AI_SOLUTIONS = [
  'AI Tender Specialist',
  'AI Head of Tenders',
  'AI Tender Department',
];

/**
 * Map /ai Deployment form fields into the shared leads sheet payload.
 * Product choice is written to `role` AND the first line of `message`
 * so the sheet always shows which AI workforce the user selected.
 */
export function buildAiDeployLeadPayload(form, meta = {}) {
  const product = AI_SOLUTIONS.includes(form.preferred_solution)
    ? form.preferred_solution
    : 'AI Tender Specialist';

  const messageParts = [
    `Product: ${product}`,
    form.company && `Company: ${form.company}`,
    form.phone && `Phone: ${form.phone}`,
    form.industry && `Industry: ${form.industry}`,
    form.tender_volume !== '' && form.tender_volume != null && `Tenders/month: ${form.tender_volume}`,
    form.team_size !== '' && form.team_size != null && `Team size: ${form.team_size}`,
    form.additional_requirements && `Notes: ${form.additional_requirements}`,
  ].filter(Boolean);

  return buildLeadPayload(
    {
      name: form.contact_person,
      email: form.email,
      country: form.country,
      role: product,
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
