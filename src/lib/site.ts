export const site = {
  name: 'Swiftly Built',
  legalName: 'Swiftly Built LLC',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://swiftlybuilt.com',
  plausibleDomain: 'swiftlybuilt.com',
  email: 'hello@swiftlybuilt.com',
  founder: 'Jamiel Trimble',
  location: 'Columbia, MD',
  linkedin: 'https://www.linkedin.com/in/jamiel-trimble/',
  github: 'https://github.com/jamiel-trimble',
  tagline: 'Fast. Complete. Built to last.',
  description:
    'Production-ready iOS and Android apps, delivered end to end by one engineer. Weeks, not quarters.',
} as const;

export const formspreeId = import.meta.env.FORMSPREE_ID ?? 'demo';
export const calLink = import.meta.env.CAL_LINK ?? 'jamiel-trimble/scoping-call';
