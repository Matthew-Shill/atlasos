# Company logos

Place client or company logo assets in this folder for use across the demo (CRM, team client list, client portal header).

## Brand assets

| File | Use |
|------|-----|
| **`atlasos-icon.svg`** | Icon in nav, sidebars, and small logo slots (`BRAND_ICON_FILE`) |
| **`Purple:orange Gradient.svg`** | Full gradient wordmark reference (CSS wordmark mimics this in `BrandWordmark`) |

## Naming

Use lowercase slugs matching `lib/company-logos.ts`, for example:

- `greenline.svg` → Greenline Co.
- `marcus-webb.svg` → Marcus Webb
- `techforward.svg` → TechForward Labs

Supported formats: `.svg`, `.png`, `.webp`, `.jpg`

## Usage

```tsx
import { CompanyLogo } from "@/components/demo/company-logo";

<CompanyLogo clientId="client-1" name="Greenline Co." size={40} />
```

Add or update entries in `lib/company-logos.ts` when you add new files.
