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
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{
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

export type { Brand, UserAgentData, UserAgentArgs };
