import { Head } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExternalAuthLayout from '@/layouts/external-auth-layout';

export default function ExternalRegisterSuccess() {
    return (
        <ExternalAuthLayout
            title="¡Registro exitoso!"
            description="Tu cuenta ha sido creada correctamente"
        >
            <Head title="Registro Exitoso" />

            <div className="flex flex-col items-center gap-8 py-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full p-5" style={{backgroundColor: 'rgba(200, 150, 41, 0.2)'}}>
                        <CheckCircle className="h-20 w-20" style={{color: '#C8962A'}} />
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                        ¡Tu cuenta ha sido creada con éxito!
                    </h2>
                    <div className="h-0.5 w-16 rounded-full mx-auto" style={{backgroundColor: '#C8962A'}}></div>
                    <p className="mt-2 text-white">
                        Gracias por registrarte en <span style={{color: '#C8962A', fontWeight: 600}}>All Star Challenge</span>. Ya puedes acceder a todas las funciones de la plataforma.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full mt-6">
                    <span className='text-center block w-full'>Ya puedes iniciar sesión en la aplicación</span>
                </div>
            </div>
        </ExternalAuthLayout>
    );
}
