interface Brand {
  brand: string;
  version: string;
}

interface UserAgentData {
  userAgent: string;
  brands?: Brand[];
  mobile?: boolean;
  platform?: string;
  architecture?: string;
  model?: string;
  fullVersionList?: Brand[];
  platformVersion?: string;
  bitness?: string;
  wow64?: boolean;
  getHighEntropyValues?: (hints: string[]) => Promise<{
    architecture?: string;
    bitness?: string;
    brands?: Brand[];
    fullVersionList?: Brand[];
    mobile?: boolean;
    model?: string;
    platform?: string;
    platformVersion?: string;
    wow64?: boolean;
  }>;
}

declare global {
  interface Navigator {
    userAgentData?: UserAgentData;
  }
}

interface UserAgentArgs {
  useragent?: string;
  [key: string]: string | undefined;
}

namespace UserAgent {
  export const PLATFORMS = {
    WINDOWS: "Windows",
    MACINTOSH: "Macintosh",
    LINUX: "Linux",
    ANDROID: "Android",
    IOS: "iOS",
  } as const;

  export type Platform = (typeof PLATFORMS)[keyof typeof PLATFORMS];

  export const ARCHITECTURES = {
    X64: "x64",
    X86: "x86",
    ARM64: "arm64",
    ARM: "arm",
  } as const;

  export type Architecture = (typeof ARCHITECTURES)[keyof typeof ARCHITECTURES];

  export const BROWSER_MAPPING = {
    Chrome: "Chrome",
    Chromium: "Chromium",
    Edge: "Edge",
    Brave: "Brave",
    Opera: "Opera",
    Firefox: "Firefox",
    Safari: "Safari",
    "Internet Explorer": "Internet Explorer",
  } as const;

  export type Browser = (typeof BROWSER_MAPPING)[keyof typeof BROWSER_MAPPING];

  const REGEX = {
    MOBILE: /Mobile|Android|iPhone|iPad|iPod/i,
    PLATFORM: /Windows|Macintosh|Linux|Android|iPhone|iPad|iPod/i,
    ARCH_INFO: /\((.*?)\)/,
    DEVICE_MODEL: {
      APPLE: /iPhone|iPad|iPod|MacBook|MacBook Pro|MacBook Air|iMac|Mac Pro/i,
      MOBILE: /Android|Windows Phone|BlackBerry|Nexus|Pixel|Galaxy/i,
      PHONE_BRANDS: /Xiaomi|Huawei|Sony|LG|OnePlus|OPPO|vivo|Realme|Motorola/i,
      PC_BRANDS: /Lenovo|Asus|Acer|Dell|HP|Surface/i,
    },
    BROWSER:
      /(Chrome|Chromium|Edge|Brave|Opera)\/(\d+\.\d+)|(Firefox)\/(\d+\.\d+)|(Version)\/(\d+\.\d+).*Safari|(MSIE|Trident)\/(\d+\.\d+)/i,
  };

  let currentUserAgent =
    typeof window !== "undefined" ? window.navigator.userAgent : "";

  const beforeAgent =
    typeof window !== "undefined" ? window.navigator.userAgent : "";
  const beforeUserAgentData =
    typeof window !== "undefined" ? window.navigator.userAgentData : undefined;

  if (typeof window !== "undefined") {
    (async () => {
      try {
        const initialParsedData = await parseUserAgent(beforeAgent);
        
        if (window.navigator.userAgentData) {
          Object.defineProperty(window.navigator, "userAgentData", {
            get: () => ({ 
              ...initialParsedData,
              getHighEntropyValues: async () => initialParsedData
            }),
            configurable: true,
          });
        }
      } catch (error) {
        console.warn("Failed to initialize consistent userAgentData:", error);
      }
    })();
  }

  function detectPlatform(userAgent: string): Platform | undefined {
    const platformMatch = userAgent.match(REGEX.PLATFORM);
    if (!platformMatch) {
      return undefined;
    }

    const match = platformMatch[0];
    
    if (/Windows/i.test(match)) return PLATFORMS.WINDOWS;
    else if (/Macintosh/i.test(match)) return PLATFORMS.MACINTOSH;
    else if (/Linux/i.test(match)) return PLATFORMS.LINUX;
    else if (/Android/i.test(match)) return PLATFORMS.ANDROID;
    else if (/iPhone|iPad|iPod/i.test(match)) return PLATFORMS.IOS;

    return undefined;
  }

  function detectArchitecture(userAgent: string): Architecture | undefined {
    const archMatch = REGEX.ARCH_INFO.exec(userAgent);
    if (!archMatch?.[1]) {
      return undefined;
    }

    const archInfo = archMatch[1];
    
    if (archInfo.includes(ARCHITECTURES.X64)) return ARCHITECTURES.X64;
    else if (archInfo.includes(ARCHITECTURES.X86)) return ARCHITECTURES.X86;
    else if (archInfo.includes(ARCHITECTURES.ARM64)) return ARCHITECTURES.ARM64;
    else if (archInfo.includes(ARCHITECTURES.ARM)) return ARCHITECTURES.ARM;

    return undefined;
  }

  function detectModel(userAgent: string): string | undefined {
    for (const category of Object.values(REGEX.DEVICE_MODEL)) {
      const match = category.exec(userAgent);
      if (match?.[0]) {
        return match[0];
      }
    }

    return undefined;
  }

  function isBrowserName(brand: string): brand is keyof typeof BROWSER_MAPPING {
    return brand in BROWSER_MAPPING;
  }

  function parseBrowserBrands(userAgent: string): Brand[] {
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

  async function getModernBrowserInfo(): Promise<{
    brands?: Brand[];
    highEntropyValues?: Partial<UserAgentData>;
  } | undefined> {
    if (typeof window === "undefined" || !window.navigator.userAgentData) {
      return undefined;
    }

    const brands =
      window.navigator.userAgentData.brands ||
      window.navigator.userAgentData.fullVersionList;

    let highEntropyValues: Partial<UserAgentData> | undefined;
    
    if (window.navigator.userAgentData.getHighEntropyValues) {
      try {
        highEntropyValues = await window.navigator.userAgentData.getHighEntropyValues([
          'architecture',
          'bitness',
          'brands',
          'fullVersionList',
          'mobile',
          'model',
          'platform',
          'platformVersion',
          'wow64'
        ]);
      } catch (error) {
        console.warn('Failed to get high entropy values:', error);
      }
    }

    if (!brands && !highEntropyValues) return undefined;

    return {
      brands: brands?.map((brand) => ({
        brand: brand.brand,
        version: brand.version,
      })),
      highEntropyValues
    };
  }

  async function parseUserAgent(userAgent: string): Promise<Partial<UserAgentData>> {
    const brandList = parseBrowserBrands(userAgent);
    const isMobile = REGEX.MOBILE.test(userAgent);
    const parsedPlatform = detectPlatform(userAgent);
    const parsedArchitecture = detectArchitecture(userAgent);
    const parsedModel = detectModel(userAgent);

    const result: Partial<UserAgentData> = {
      userAgent,
      mobile: isMobile,
      platform: parsedPlatform,
      architecture: parsedArchitecture,
      model: parsedModel,
      platformVersion: '0',
      bitness: '64',
      wow64: false,
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

  async function updateUserAgent(userAgent: string): Promise<void> {
    if (typeof window === "undefined") return;

    Object.defineProperty(window.navigator, "userAgent", {
      get: () => userAgent,
      configurable: true,
    });

    if (window.navigator.userAgentData) {
      const parsedData = await parseUserAgent(userAgent);
      
      Object.defineProperty(window.navigator, "userAgentData", {
        get: () => ({ 
          ...parsedData,
          getHighEntropyValues: async () => {
            return parsedData;
          } 
        }),
        configurable: true,
      });
    }
  }

  export async function set(userAgent?: string): Promise<() => Promise<void>> {
    if (typeof window === "undefined") return async () => {};

    if (!userAgent) {
      currentUserAgent = beforeAgent;
      await updateUserAgent(beforeAgent);
      
      if (window.navigator.userAgentData) {
        const originalParsedData = await parseUserAgent(beforeAgent);
        Object.defineProperty(window.navigator, "userAgentData", {
          get: () => ({
            ...originalParsedData,
            getHighEntropyValues: async () => originalParsedData
          }),
          configurable: true,
        });
      }
      
      return async () => {};
    }

    currentUserAgent = userAgent;
    await updateUserAgent(userAgent);

    return async () => {
      await updateUserAgent(currentUserAgent);
      
      if (window.navigator.userAgentData) {
        const restoredParsedData = await parseUserAgent(currentUserAgent);
        Object.defineProperty(window.navigator, "userAgentData", {
          get: () => ({
            ...restoredParsedData,
            getHighEntropyValues: async () => restoredParsedData
          }),
          configurable: true,
        });
      }
    };
  }

  export function getFromArgs(args?: UserAgentArgs): string {
    return args?.useragent || "";
  }
}

export const setUserAgent = UserAgent.set;
export const getUserAgent = UserAgent.getFromArgs;
