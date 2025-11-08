/**
 * Normaliza un campo que puede venir como:
 *  - string plano ("Título")
 *  - string JSON con comillas escapadas ("\"Título\"")
 *  - string JSON de un objeto de localizaciones ("{\"es\":\"Título\",\"en\":\"Title\"}")
 *  - objeto ya parseado { es: 'Título', en: 'Title' }
 * Devuelve la mejor cadena posible para el locale indicado, con degradación.
 */
export function normalizeLocalized(value: unknown, locale: string = 'es'): string {
    if (value == null) return '';

    const tryParseJSON = (str: string): any => {
        try {
            return JSON.parse(str);
        } catch {
            return undefined;
        }
    };

    const pickFromObject = (obj: Record<string, any>): string => {
        if (!obj) return '';
        if (typeof obj[locale] === 'string' && obj[locale].trim() !== '') return obj[locale];
        // Primer valor string no vacío
        const first = Object.values(obj).find(v => typeof v === 'string' && v.trim() !== '');
        return typeof first === 'string' ? first : '';
    };

    if (typeof value === 'string') {
        const trimmed = value.trim();
        // Caso: parece un objeto JSON
        if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
            const parsed = tryParseJSON(trimmed);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                return pickFromObject(parsed as Record<string, any>);
            }
        }
        // Caso: string JSON entre comillas ("Texto")
        if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith('\'') && trimmed.endsWith('\''))) {
            const parsed = tryParseJSON(trimmed);
            if (typeof parsed === 'string') return parsed;
            // Fallback: quitar comillas exteriores simples/dobles
            return trimmed.replace(/^['"](.*)['"]$/s, '$1');
        }
        // Caso: contiene braces pero quizá doblemente serializado
        if (trimmed.includes('"es"') || trimmed.includes('"en"')) {
            const parsed = tryParseJSON(trimmed);
            if (parsed && typeof parsed === 'object') return pickFromObject(parsed as Record<string, any>);
        }
        return trimmed;
    }

    if (typeof value === 'object') {
        return pickFromObject(value as Record<string, any>);
    }

    return String(value);
}

/**
 * Atajo para normalizar títulos / nombres que podrían venir serializados.
 */
export function nl(value: unknown, locale: string = 'es'): string {
    return normalizeLocalized(value, locale);
}
