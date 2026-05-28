import { DEFAULT_CLIENT_ID, SARAH_CLIENT_ID } from "@/lib/data/seed";

/** Public path prefix for company logo assets */
export const COMPANY_LOGOS_PATH = "/company-logos";

/** AtlasOS icon mark (nav, sidebars, small logo slots) */
export const BRAND_ICON_FILE = "atlasos-icon.svg";

export function companyLogoUrl(filename: string): string {
  return `${COMPANY_LOGOS_PATH}/${encodeURIComponent(filename)}`;
}

export const BRAND_LOGO_SRC = companyLogoUrl(BRAND_ICON_FILE);

/** Maps client IDs to logo filenames in `public/company-logos/` */
export const companyLogoFiles: Record<string, string> = {
  "client-1": "greenline.svg",
  [DEFAULT_CLIENT_ID]: "marcus-webb.svg",
  "client-5": "harbor-legal.svg",
  "client-6": "bright-path.svg",
  "client-8": "techforward.svg",
  "client-10": "summit-realty.svg",
  [SARAH_CLIENT_ID]: "sarah-mitchell.svg",
};

export function getCompanyLogoSrc(clientId: string): string | undefined {
  const file = companyLogoFiles[clientId];
  return file ? companyLogoUrl(file) : undefined;
}
