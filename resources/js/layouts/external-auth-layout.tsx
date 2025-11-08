import { type PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface ExternalAuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function ExternalAuthLayout({ children, title, description }: PropsWithChildren<ExternalAuthLayoutProps>) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent text-white p-6 md:p-10">
            {/* Background image overlay with reduced opacity */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
                    style={{ 
                        backgroundImage: "url('/assets/basketball.png')",
                        opacity: 0.35, // Aumentamos ligeramente la opacidad para mejor visibilidad
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
            </div>
            
            <div className="w-full max-w-4xl relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-16 w-16 items-center justify-center">
                                <AppLogoIcon />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl font-bold" style={{color: '#C8962A'}}>{title}</h1>
                            <p className="text-center text-sm text-white">{description}</p>
                            <div className="mx-auto h-1 w-20 rounded-full" style={{backgroundColor: '#C8962A'}}></div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-gray-800 backdrop-blur-sm p-4 sm:p-6 lg:p-8" style={{borderColor: 'rgba(200, 150, 41, 0.3)'}}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
