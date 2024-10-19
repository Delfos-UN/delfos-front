import { createClient } from '@supabase/supabase-js';
import type { Materia } from './formatMaterias';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export async function guardarEncuestaConMaterias(
    aceptaTratamientoDatos: boolean,
    gustoProfesional: string,
    materiasFormateadas: Materia[]
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
                gusto_profesional: gustoProfesional // Guardar gusto_profesional
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
