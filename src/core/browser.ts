import { BROWSER_MAPPING, REGEX } from "./constants";
import type { Brand, UserAgentData } from "./types";
import {
  detectPlatform,
  detectArchitecture,
  detectModel,
  detectPlatformVersion,
  detectBitness,
  detectWow64,
} from "./detection";

export function isBrowserName(
  brand: string,
): brand is keyof typeof BROWSER_MAPPING {
  return brand in BROWSER_MAPPING;
}

export function parseBrowserBrands(userAgent: string): Brand[] {
  const brands: Brand[] = [];
  const match = userAgent.match(REGEX.BROWSER);

  if (!match) {
    return brands;
  }

  if (match[1] && match[2]) {
    const brand = match[1];
    const version = match[2];

    if (isBrowserName(brand)) {
      brands.push({ brand: BROWSER_MAPPING[brand], version });
    } else {
      brands.push({ brand: "Chromium", version });
    }
  }

  if (match[3] && match[4]) {
    brands.push({ brand: BROWSER_MAPPING.Firefox, version: match[4] });
  }

  if (match[5] && match[6]) {
    brands.push({ brand: BROWSER_MAPPING.Safari, version: match[6] });
  }

  if (match[7] && match[8]) {
    brands.push({
      brand: BROWSER_MAPPING["Internet Explorer"],
      version: match[8],
    });
  }

  return brands;
}

export async function getModernBrowserInfo(): Promise<
  { brands?: Brand[]; highEntropyValues?: Partial<UserAgentData> } | undefined
> {
  if (typeof window === "undefined" || !window.navigator.userAgentData) {
    return undefined;
  }

  const brands =
    window.navigator.userAgentData.brands ||
    window.navigator.userAgentData.fullVersionList;

  let highEntropyValues: Partial<UserAgentData> | undefined;

  if (window.navigator.userAgentData.getHighEntropyValues) {
    try {
      highEntropyValues =
        await window.navigator.userAgentData.getHighEntropyValues([
          "architecture",
          "bitness",
          "brands",
          "fullVersionList",
          "mobile",
          "model",
          "platform",
          "platformVersion",
          "wow64",
        ]);
    } catch (error) {
      console.warn("Failed to get high entropy values:", error);
    }
  }

  if (!brands && !highEntropyValues) return undefined;

  return {
    brands: brands?.map((brand) => ({
      brand: brand.brand,
      version: brand.version,
    })),
    highEntropyValues,
  };
}

export async function parseUserAgent(
  userAgent: string,
): Promise<Partial<UserAgentData>> {
  const brandList = parseBrowserBrands(userAgent);
  const isMobile = REGEX.MOBILE.test(userAgent);
  const parsedPlatform = detectPlatform(userAgent);
  const parsedArchitecture = detectArchitecture(userAgent);
  const parsedModel = detectModel(userAgent);
  const parsedPlatformVersion = detectPlatformVersion(
    userAgent,
    parsedPlatform,
  );
  const parsedBitness = detectBitness(userAgent);
  const isWow64 = detectWow64(userAgent);

  const result: Partial<UserAgentData> = {
    userAgent,
    mobile: isMobile,
    platform: parsedPlatform,
    architecture: parsedArchitecture,
    model: parsedModel,
    platformVersion: parsedPlatformVersion || "0",
    bitness: parsedBitness || "64",
    wow64: isWow64,
  };

  if (brandList && brandList.length > 0) {
    result.brands = brandList;
    result.fullVersionList = brandList;
  } else {
    result.brands = [];
    result.fullVersionList = [];
  }

  return result;
}
