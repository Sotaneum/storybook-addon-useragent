export interface UserAgentParameter {
  name: string;
  userAgent: string;
}

export interface Link {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
}
