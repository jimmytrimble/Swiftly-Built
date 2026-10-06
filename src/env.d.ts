interface ImportMetaEnv {
  readonly FORMSPREE_ID?: string;
  readonly CAL_LINK?: string;
  readonly PUBLIC_SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module '*.woff2?url' {
  const url: string;
  export default url;
}
