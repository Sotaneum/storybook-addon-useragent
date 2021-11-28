export interface UserAgentParameter {
  name: string;
  userAgent: string;
}

export interface TooltipProps {
  onChange(userAgent: string): void;
}

