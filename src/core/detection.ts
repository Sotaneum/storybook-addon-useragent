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

export function detectPlatformVersion(
  userAgent: string,
  platform?: Platform,
): string | undefined {
  if (!platform) {
    platform = detectPlatform(userAgent);
  }

  if (!platform) return undefined;

  let match;

  switch (platform) {
    case PLATFORMS.WINDOWS:
      match = userAgent.match(REGEX.PLATFORM_VERSION.WINDOWS);
      return match?.[1];

    case PLATFORMS.MACINTOSH:
      match = userAgent.match(REGEX.PLATFORM_VERSION.MACOS);
      if (match?.[1]) {
        // Convert 10_15_7 to 10.15.7
        return match[1].replace(/_/g, ".");
      }
      return undefined;

    case PLATFORMS.IOS:
      match = userAgent.match(REGEX.PLATFORM_VERSION.IOS);
      if (match?.[1]) {
        // Convert 14_0 to 14.0
        return match[1].replace(/_/g, ".");
      }
      return undefined;

    case PLATFORMS.ANDROID:
      match = userAgent.match(REGEX.PLATFORM_VERSION.ANDROID);
      return match?.[1];

    default:
      return undefined;
  }
}

export function detectBitness(userAgent: string): string | undefined {
  // Windows or macOS with explicit 64-bit markers
  if (REGEX.BITNESS.WIN64.test(userAgent)) {
    return "64";
  }

  // Linux x86_64
  if (REGEX.BITNESS.X86_64.test(userAgent)) {
    return "64";
  }

  // ARM64/aarch64
  if (REGEX.BITNESS.ARM64.test(userAgent)) {
    return "64";
  }

  // 32-bit Intel
  if (REGEX.BITNESS.I686.test(userAgent)) {
    return "32";
  }

  // 32-bit ARM
  if (REGEX.BITNESS.ARM32.test(userAgent)) {
    return "32";
  }

  // Default for modern devices (most modern browsers and devices are 64-bit)
  const platform = detectPlatform(userAgent);
  if (platform === PLATFORMS.MACINTOSH || platform === PLATFORMS.IOS) {
    // Modern Apple devices are all 64-bit
    return "64";
  }

  // For other platforms, we're less certain but most modern devices are 64-bit
  if (platform === PLATFORMS.ANDROID) {
    // Android version-based detection
    const version = detectPlatformVersion(userAgent, platform);
    if (version) {
      const majorVersion = parseInt(version.split(".")[0], 10);
      // Android 5.0 and above are typically 64-bit
      if (majorVersion >= 5) {
        return "64";
      } else {
        // Older Android versions were typically 32-bit
        return "32";
      }
    }
  }

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

/**
 * Detects if the user agent is from a WOW64 environment (32-bit app on 64-bit Windows)
 */
export function detectWow64(userAgent: string): boolean {
  // Only relevant for Windows systems
  const platform = detectPlatform(userAgent);
  if (platform !== PLATFORMS.WINDOWS) {
    return false;
  }

  // Check for WOW64 marker
  return /WOW64/i.test(userAgent);
}
