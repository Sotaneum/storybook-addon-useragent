# Tests Directory

This directory contains test scripts and test data for the storybook-addon-useragent plugin.

## Test File Structure

```
tests/
├── README.md               # Test documentation
├── data/                   # Test data directory
│   └── user-agents.txt     # Collection of user agent strings
└── platform-version.test.cjs  # Platform version, bitness, and WOW64 detection test
```

## Running Tests

You can run specific tests using the following commands:

```bash
# Run platform version, bitness, and WOW64 detection test
node tests/platform-version.test.cjs
```

## Test Features

### Platform Version Detection

Tests the ability to extract operating system version information from user agent strings:

- Windows NT version (e.g., 10.0)
- macOS version (e.g., 10.15.7)
- iOS version (e.g., 15.6)
- Android version (e.g., 13, 4.0.4)

### Bitness Detection

Tests the ability to determine if a system is 32-bit or 64-bit from user agent strings:

- Explicit 64-bit markers (Win64, x64, WOW64)
- Architecture-based detection (x86_64, i686)
- Platform-based inference (modern iOS/macOS devices are 64-bit)
- Android version-based inference (Android 5.0+ typically 64-bit)

### WOW64 Detection

Tests the ability to detect Windows-on-Windows 64-bit environments, which indicate a 32-bit application running on a 64-bit Windows OS:

- Presence of the WOW64 marker in the user agent string
- Windows platform-specific detection

## Managing Test Data

The `data` directory contains data files used for various tests.

### user-agents.txt

Contains user agent strings from various platforms:

- Windows
- macOS
- iOS
- Android
- Linux

You can add new user agent strings to expand the test coverage as needed.
