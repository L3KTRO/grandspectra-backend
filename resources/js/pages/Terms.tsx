import { Head } from '@inertiajs/react';
import ExternalAuthLayout from '@/layouts/external-auth-layout';

export default function Terms() {
    return (
        <ExternalAuthLayout 
            title="Términos y condiciones" 
            description="Términos y condiciones de uso de All Star Challenge"
        >
            <Head title="Términos y condiciones" />

            <div className="flex flex-col gap-6 text-white">
                <h1 className="text-2xl font-bold text-gold">Términos y condiciones</h1>
                
                <div className="bg-gray-800 px-6">
                    {/* Aquí iría el contenido real de los términos y condiciones */}
                    <p className="text-gray-300 mb-4">
                        Estos términos y condiciones establecen las reglas y regulaciones para el uso del sitio web All Star Challenge.
                    </p>
                    
                    <div className="space-y-4">
                        <section>
                            <h2 className="text-xl font-semibold text-gold mb-2">1. Introducción</h2>
                            <p className="text-gray-300">
                                Al utilizar esta plataforma, aceptas estos términos y condiciones en su totalidad. 
                                Si no estás de acuerdo con estos términos y condiciones, no debes utilizar este sitio.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold text-gold mb-2">2. Licencia de uso</h2>
                            <p className="text-gray-300">
                                A menos que se indique lo contrario, All Star Challenge y/o sus licenciantes poseen los 
                                derechos de propiedad intelectual de todo el material en All Star Challenge.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gold mb-2">3. Restricciones</h2>
                            <p className="text-gray-300">
                                Está específicamente prohibido utilizar este sitio para actividades ilegales o 
                                que puedan causar daño a otros.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold text-gold mb-2">4. Privacidad</h2>
                            <p className="text-gray-300">
                                Tu uso de este sitio está sujeto a nuestra política de privacidad.
                            </p>
                        </section>

                        {/* Espacio para más secciones cuando se necesite agregar contenido real */}
                    </div>
                </div>
                
                <div className="text-center text-sm text-gray-400 mt-4">
                    © {new Date().getFullYear()} All Star Challenge. Todos los derechos reservados.
                </div>
            </div>
        </ExternalAuthLayout>
    );
}
