export interface UserAgentParameter {
  name: string;
  userAgent: string;
}

export interface TooltipProps {
  onChange(userAgent: string): void;
}

export interface Link {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
}
