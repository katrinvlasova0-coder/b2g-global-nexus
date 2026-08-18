/** Map content-plan cluster names to canonical EN blog tags */
export const CLUSTER_TAG: Record<string, { de: string; en: string }> = {
  Tenders: { de: 'Tenders', en: 'Tenders' },
  Documentation: { de: 'Documentation', en: 'Documentation' },
  Financing: { de: 'Financing', en: 'Financing' },
  Contractors: { de: 'Contractors', en: 'Contractors' },
};

export function clusterTagDe(cluster: string): string {
  return CLUSTER_TAG[cluster]?.de ?? cluster;
}

export function clusterTagEn(cluster: string): string {
  return CLUSTER_TAG[cluster]?.en ?? cluster;
}
