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

export const REGEX = {
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
