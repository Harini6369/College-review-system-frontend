import type { ReactNode } from 'react';

type BannerTone = 'info' | 'danger';

interface StatusBannerProps {
  tone?: BannerTone;
  children?: ReactNode;
}

const StatusBanner = ({ tone = 'info', children }: StatusBannerProps) => {
  if (!children) {
    return null;
  }

  return <div className={`banner banner-${tone}`}>{children}</div>;
};

export default StatusBanner;
