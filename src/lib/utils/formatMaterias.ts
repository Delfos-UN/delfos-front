export const profesores = [
    'Diana Lorena Cadavid Higuita',
    'Roberto Antonio Manjarres Betancur',
    'Juan David Ospina Arango',
    'Gabriel Alberto Awad Aubad',
    'John Willian Branch Bedoya',
    'Francisco Javier Díaz Serna',
    'Albeiro Espinosa Bedoya',
    'Carlos Jaime Franco Cardona',
    'Jaime Alberto Guzmán Luna',
    'Patricia Jaramillo Álvarez',
    'Jovani Alberto Jiménez Builes',
    'Maria Constanza Torres Madroñero',
    'Laura Lotero Vélez',
    'Francisco Javier Moreno Arboleda',
    'Luis Fernando Moreno Velásquez',
    'Julián Moreno Cadavid',
    'Yris Olaya Morales',
    'Demetrio Arturo Ovalle Carranza',
    'Juan David Velásquez Henao',
    'Carlos Mario Zapata Jaramillo',
    'Santiago Arango Aramburo',
    'Fernán Alonso Villa Garzón'
].map(profesor => ({ value: profesor, label: profesor, created: false }));

export interface Materia {
	nombre: string;
	codigo: string;
	tipologia: string;
	periodo: string;
	calificacion: number | null;
	profesor: string;
	calificacion_profesor: number | null;
}

export function extraerPlanDeEstudios(texto: string): string | null {
	console.log('Texto de entrada:', texto);

	const planDeEstudiosInicio = texto.indexOf('Plan de estudios');
	const facultadInicio = texto.indexOf('Facultad');

	console.log("Posición de 'Plan de estudios':", planDeEstudiosInicio);
	console.log("Posición de 'Facultad':", facultadInicio);

	if (planDeEstudiosInicio !== -1 && facultadInicio !== -1) {
		const planDeEstudiosTexto = texto.slice(planDeEstudiosInicio, facultadInicio).trim();

		console.log('Texto extraído del plan de estudios:', planDeEstudiosTexto);

		const planRegex = /(\d{4})\s+([A-ZÁÉÍÓÚÑ\s]+)(?=\n|$)/i;
		const match = planDeEstudiosTexto.match(planRegex);

		console.log('Resultado del regex:', match);

		if (match) {
			const plan = `${match[1]} ${match[2].trim()}`;
			console.log('Plan de estudios encontrado:', plan);
			return plan;
		}
	}

	console.log('No se encontró el plan de estudios');
	return null;
}

export function esPlanDeEstudiosValido(planDeEstudios: string): boolean {
	const planValido =
		'3534 INGENIERÍA DE SISTEMAS E INFORMÁTICA\nINGENIERÍA DE SISTEMAS E INFORMÁTICA';

	console.log('Plan a validar:', planDeEstudios);

	const isValid = planDeEstudios.trim().toUpperCase() === planValido.toUpperCase();

	console.log('¿Es el plan válido?', isValid);

	return isValid;
}

export function limpiarTexto(inputText: string): Materia[] {
    let cleanedText = inputText;
    const startIndex = inputText.indexOf('CALIFICACIÓN');
    if (startIndex !== -1) {
        cleanedText = inputText.substring(startIndex + 'CALIFICACIÓN'.length);
    }

    const endIndex = cleanedText.indexOf('Resumen de créditos');
    if (endIndex !== -1) {
        cleanedText = cleanedText.substring(0, endIndex);
    }

    const materias = cleanedText.split('\n').filter(linea => linea.trim() !== '');

    const materiasProcesadas: Materia[] = [];

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i].trim();

        if (materia === 'REPROBADA') {
            console.log(`Materia reprobada excluida: ${materia}`);
            continue;
        }

        const siguienteLinea = materias[i + 1]?.trim();
        if (siguienteLinea === 'APROBADA') {
            i++;
        } else {
            console.log(`Materia no agregada por no estar aprobada: ${materia}`);
            continue;
        }

        let partes = materia
            .replace(/\t+/g, ' ')
            .replace(/\s\s+/g, ' ')
            .trim()
            .replace(/\s/g, ',')
            .split(',');

        const finalIndex = partes.indexOf('Ordinaria');
        if (finalIndex !== -1) {
            partes = partes.slice(0, finalIndex);
        }

        const codigoIndex = partes.findIndex((part) => part.startsWith('('));
        if (codigoIndex === -1 || partes.length < codigoIndex + 5) {
            console.log(`Materia inválida por falta de campos obligatorios: ${materia}`);
            continue;
        }

        const nombre = partes.slice(0, codigoIndex).join(' ');
        const codigo = partes[codigoIndex].replace(/[()]/g, '');
        const tipologia = `${partes[codigoIndex + 2]} ${partes[codigoIndex + 3]}`;
        const periodo = partes[codigoIndex + 4];
        const materiaFinal: Materia = {
            nombre: nombre.trim(),
            codigo: codigo.trim(),
            tipologia: tipologia.trim(),
            periodo: periodo.trim(),
            calificacion: null,
            profesor: '',
            calificacion_profesor: null
        };
        

        console.log(`Materia final agregada: ${JSON.stringify(materiaFinal)}`);
        materiasProcesadas.push(materiaFinal);
    }

    return materiasProcesadas;
}
