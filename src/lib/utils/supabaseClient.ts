import { createClient } from '@supabase/supabase-js';
import type { Materia } from './formatMaterias';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function guardarEncuestaConMaterias(
    aceptaTratamientoDatos: boolean,
    gustoProfesional: string,
    materiasFormateadas: Materia[],
    correo: string
) {
    try {
        for (const materia of materiasFormateadas) {
            if (!materia.nombre || !materia.codigo || !materia.tipologia || !materia.periodo || materia.calificacion === null) {
                throw new Error(`Faltan datos obligatorios en la materia ${materia.nombre || "sin nombre"}`);
            }
        }

        const { data: encuestaData, error: encuestaError } = await supabase
            .from('encuesta')
            .insert([{ 
                acepta_tratamiento_datos: aceptaTratamientoDatos,
                gusto_profesional: gustoProfesional,
                correo: correo
            }])
            .select();

        if (encuestaError) {
            throw new Error(`Error al crear la encuesta: ${encuestaError.message}`);
        }

        if (!encuestaData || encuestaData.length === 0) {
            throw new Error('No se pudo obtener el ID de la encuesta recién creada.');
        }

        const encuestaId = encuestaData[0].id;

        const materiasFormatted = materiasFormateadas.map(materia => ({
            encuesta_id: encuestaId,
            nombre: materia.nombre,
            codigo: materia.codigo,
            tipologia: materia.tipologia,
            periodo: materia.periodo,
            calificacion: materia.calificacion,
            profesor: materia.profesor || null,
            calificacion_profesor: materia.calificacion_profesor || null
        }));

        const { error: materiasError } = await supabase.from('materias').insert(materiasFormatted);

        if (materiasError) {
            throw new Error(`Error al insertar las materias: ${materiasError.message}`);
        }

        console.log('Encuesta y materias guardadas correctamente');
        return { success: true };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al guardar la encuesta y materias:', errorMessage);
        return { success: false, error: errorMessage };
    }
}

export async function contarEncuestas() {
    try {
        const { count, error } = await supabase
            .from('encuesta')
            .select('*', { count: 'exact', head: true });

        if (error) {
            throw new Error(`Error al contar encuestas: ${error.message}`);
        }

        return count;
    } catch (error) {
        console.error('Error al contar las encuestas:', error);
        return 0;
    }
}

export function suscribirseCambios(callback: (nuevoTotal: number) => void) {
    const channel = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'encuesta' },
            async (payload) => {
                console.log('Change received!', payload);
                const nuevoTotal = await contarEncuestas();
                callback(nuevoTotal ?? 0);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}

export async function guardarColaborador(
    nombre: string,
    email: string,
    github: string,
    area: string,
    mensaje: string,
    aceptaTratamientoDatos: boolean
) {
    try {
        const { data, error } = await supabase
            .from('colaboradores')
            .insert([{ nombre, email, github, area, mensaje, acepta_tratamiento_datos: aceptaTratamientoDatos }]);

        if (error) {
            throw new Error(`Error al insertar colaborador: ${error.message}`);
        }

        console.log('Colaborador guardado correctamente:', data);
        return { success: true, data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al guardar el colaborador:', errorMessage);
        return { success: false, error: errorMessage };
    }
}
