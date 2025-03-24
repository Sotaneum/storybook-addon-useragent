/**
 * Test script for detecting platform versions from User Agent strings
 */

const fs = require("fs");
const path = require("path");

// Regular expression patterns
const PLATFORM_VERSION_REGEX = {
  WINDOWS: /Windows NT (\d+\.\d+)/i,
  MACOS: /Mac OS X (\d+[._]\d+(?:[._]\d+)?)/i,
  IOS: /iPhone OS (\d+[._]\d+(?:[._]\d+)?)/i,
  ANDROID: /Android (\d+(?:\.\d+(?:\.\d+)?)?)/i,
};

// Bitness detection patterns
const BITNESS_REGEX = {
  WIN64: /Win64|x64|WOW64/i,
  X86_64: /x86_64/i,
  ARM64: /aarch64/i,
  I686: /i686|i386/i,
  ARM32: /armv\d+[^6]/i,
};

// Platform detection function
function detectPlatform(userAgent) {
  if (/Windows/i.test(userAgent)) return "Windows";
  else if (/Macintosh/i.test(userAgent)) return "Macintosh";
  else if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent))
    return "Linux";
  else if (/Android/i.test(userAgent)) return "Android";
  else if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
  return undefined;
}

// Platform version detection function
function detectPlatformVersion(userAgent, platform) {
  if (!platform) {
    platform = detectPlatform(userAgent);
  }

  if (!platform) return undefined;

  let match;

  switch (platform) {
    case "Windows":
      match = userAgent.match(PLATFORM_VERSION_REGEX.WINDOWS);
      return match?.[1];

    case "Macintosh":
      match = userAgent.match(PLATFORM_VERSION_REGEX.MACOS);
      if (match?.[1]) {
        // Convert 10_15_7 to 10.15.7
        return match[1].replace(/_/g, ".");
      }
      return undefined;

    case "iOS":
      match = userAgent.match(PLATFORM_VERSION_REGEX.IOS);
      if (match?.[1]) {
        // Convert 15_6 to 15.6
        return match[1].replace(/_/g, ".");
      }
      return undefined;

    case "Android":
      match = userAgent.match(PLATFORM_VERSION_REGEX.ANDROID);
      return match?.[1];

    default:
      return undefined;
  }
}

// Bitness detection function
function detectBitness(userAgent) {
  // Windows or macOS with explicit 64-bit markers
  if (BITNESS_REGEX.WIN64.test(userAgent)) {
    return "64";
  }

  // Linux x86_64
  if (BITNESS_REGEX.X86_64.test(userAgent)) {
    return "64";
  }

  // ARM64/aarch64
  if (BITNESS_REGEX.ARM64.test(userAgent)) {
    return "64";
  }

  // 32-bit Intel
  if (BITNESS_REGEX.I686.test(userAgent)) {
    return "32";
  }

  // 32-bit ARM
  if (BITNESS_REGEX.ARM32.test(userAgent)) {
    return "32";
  }

  // Default for modern devices (most modern browsers and devices are 64-bit)
  const platform = detectPlatform(userAgent);
  if (platform === "Macintosh" || platform === "iOS") {
    // Modern Apple devices are all 64-bit
    return "64";
  }

  // For other platforms, we're less certain but most modern devices are 64-bit
  if (platform === "Android") {
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

/**
 * Detects if the user agent is from a WOW64 environment (32-bit app on 64-bit Windows)
 */
function detectWow64(userAgent) {
  // Only relevant for Windows systems
  const platform = detectPlatform(userAgent);
  if (platform !== "Windows") {
    return false;
  }

  // Check for WOW64 marker
  return /WOW64/i.test(userAgent);
}

// Expected results
const EXPECTED_RESULTS = {
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246":
    { platform: "Windows", version: "10.0", bitness: "64", wow64: false },
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36":
    { platform: "Macintosh", version: "10.15.7", bitness: "64", wow64: false },
  "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1":
    { platform: "iOS", version: "15.6", bitness: "64", wow64: false },
  "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36":
    { platform: "Android", version: "13", bitness: "64", wow64: false },
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36":
    { platform: "Windows", version: "10.0", bitness: "64", wow64: true },
  "Mozilla/5.0 (X11; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0": {
    platform: "Linux",
    version: undefined,
    bitness: "32",
    wow64: false,
  },
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19":
    { platform: "Android", version: "4.0.4", bitness: "32", wow64: false },
  "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1":
    { platform: "Android", version: "2.3.6", bitness: "32", wow64: false },
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko": {
    platform: "Windows",
    version: "6.1",
    bitness: undefined,
    wow64: false,
  },
  "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0": {
    platform: "Windows",
    version: "6.3",
    bitness: "64",
    wow64: true,
  },
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko": {
    platform: "Windows",
    version: "10.0",
    bitness: "64",
    wow64: true,
  },
};

// Test execution function
function runTests() {
  console.log("🧪 Starting Platform, Bitness, and WOW64 Detection Tests\n");

  // Read user agent strings
  const dataPath = path.join(__dirname, "data", "user-agents.txt");
  const userAgents = fs
    .readFileSync(dataPath, "utf8")
    .split("\n")
    .filter(Boolean);

  let passedTests = 0;
  let failedTests = 0;

  // Run tests for each user agent
  userAgents.forEach((ua, index) => {
    console.log(`Test #${index + 1}: ${ua.substring(0, 50)}...`);

    const platform = detectPlatform(ua);
    const version = detectPlatformVersion(ua, platform);
    const bitness = detectBitness(ua);
    const wow64 = detectWow64(ua);

    // Compare with expected results
    const expected = EXPECTED_RESULTS[ua];

    if (
      expected &&
      expected.platform === platform &&
      expected.version === version &&
      expected.bitness === bitness &&
      expected.wow64 === wow64
    ) {
      console.log(
        `✅ PASS: Platform = ${platform}, Version = ${version}, Bitness = ${bitness}, WOW64 = ${wow64}`,
      );
      passedTests++;
    } else {
      console.log(
        `❌ FAIL: Detected (${platform}, ${version}, ${bitness}, ${wow64}), Expected (${expected?.platform}, ${expected?.version}, ${expected?.bitness}, ${expected?.wow64})`,
      );
      failedTests++;
    }

    console.log("---");
  });

  // Test results summary
  console.log(`\n📊 Test Results Summary:`);
  console.log(`Total tests: ${userAgents.length}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);

  if (failedTests === 0) {
    console.log("\n🎉 All tests passed!");
  } else {
    console.log("\n⚠️ Some tests failed");
  }
}

// Run tests
runTests();
