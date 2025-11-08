import { cn } from '@/lib/utils';
import type { ImgHTMLAttributes } from 'react';

type AppLogoIconProps = ImgHTMLAttributes<HTMLImageElement>;

export default function AppLogoIcon({ className, alt = 'Logo', ...props }: AppLogoIconProps) {
    return <img src="/assets/icon.png" alt={alt} className={cn('inline-block', className)} {...props} />;
}
