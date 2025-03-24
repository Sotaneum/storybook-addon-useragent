import {
  PLATFORMS,
  ARCHITECTURES,
  REGEX,
  Platform,
  Architecture,
} from "./constants";

export function detectPlatform(userAgent: string): Platform | undefined {
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

export function detectArchitecture(
  userAgent: string,
): Architecture | undefined {
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

export function detectModel(userAgent: string): string | undefined {
  for (const category of Object.values(REGEX.DEVICE_MODEL)) {
    const match = category.exec(userAgent);
    if (match?.[0]) {
      return match[0];
    }
  }

  return undefined;
}
