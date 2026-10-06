export const site = {
  name: 'Swiftly Built',
  legalName: 'Swiftly Built LLC',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://swiftlybuilt.com',
  plausibleDomain: 'swiftlybuilt.com',
  email: 'hello@swiftlybuilt.com',
  founder: 'JJ Trimble',
  location: 'Washington, D.C. area',
  // [BRACKETED] fill these in
  linkedin: '[LINKEDIN URL]',
  github: '[GITHUB URL]',
  tagline: 'Fast. Complete. Built to last.',
  description:
    'Production-ready iOS and Android apps, delivered end to end by one engineer. Weeks, not quarters.',
} as const;

export const formspreeId = import.meta.env.FORMSPREE_ID ?? '';
export const calLink = import.meta.env.CAL_LINK ?? 'jj/scoping-call';
