<script lang="ts">
	import type { Materia } from '$lib/utils/formatMaterias';

	export let materia: Materia;
	export let currentMateriaIndex: number;
	export let profesores: string[];
	export let actualizarCalificacion: (index: number, event: Event) => void;
	export let actualizarCalificacionProfesor: (index: number, event: Event) => void;
	export let seleccionarProfesor: (index: number, event: Event) => void;
	export let actualizarOtroProfesor: (index: number, event: Event) => void;
	export let showValidationMessage: boolean = false;

	let seleccionOtro = false;

	function manejarSeleccionProfesor(index: number, e: Event) {
		const selectedValue = (e.target as HTMLSelectElement).value;

		if (selectedValue === 'Otro') {
			seleccionOtro = true;
			materia.profesor = '';
		} else {
			seleccionOtro = false;
			materia.profesor = selectedValue;
			materia.otroProfesor = '';
		}

		seleccionarProfesor(index, e);
	}

	function manejarCambioOtroProfesor(e: Event) {
		const input = e.target as HTMLInputElement;
		materia.otroProfesor = input.value;
		actualizarOtroProfesor(currentMateriaIndex, e);
	}
</script>

<div>
	<div class="mb-4">
		<h1 class="mb-1 text-3xl font-bold text-center text-gradient">Evalúa tus asignaturas</h1>
		<p class="text-lg text-[#e0e4e2]">
			Por favor, califica de 1 a 5 las asignaturas que cursaste y a los profesores que las
			impartieron.
		</p>
	</div>
	<div
		class="w-full p-6 text-lg border border-[#004034] rounded-lg shadow-sm text-[#e0e4e2] text-center"
	>
		<h2 class="mb-1 text-2xl font-bold text-center text-gradient">Califica la materia</h2>

		<div class="flex items-center justify-between mb-4">
			<div class="">
				<p>{materia.nombre} - {materia.periodo}</p>
			</div>

			<div class="text-center">
				<label for="calificacion-materia-{currentMateriaIndex}" class="block text-sm font-medium"
					>Calificación</label
				>
				<div class="rating">
					{#each [5, 4, 3, 2, 1] as calificacion (calificacion)}
						<input
							type="radio"
							id="calificacion-materia-{currentMateriaIndex}-{calificacion}"
							name="calificacion-materia-{currentMateriaIndex}"
							value={calificacion}
							on:change={(e) => actualizarCalificacion(currentMateriaIndex, e)}
							checked={materia.calificacion === calificacion}
						/>
						<label
							for="calificacion-materia-{currentMateriaIndex}-{calificacion}"
							title="Calificación {calificacion}">⬤</label>
					{/each}
				</div>				
			</div>
		</div>

		<h2 class="mb-1 text-2xl font-bold text-center text-gradient">Califica al profesor</h2>

		<div class="flex items-center justify-between">
			<div class="flex-col items-center justify-between">
				<div class="">
					<label for="profesor-{currentMateriaIndex}" class="block text-sm font-medium"
						>Profesor:</label
					>
					<select
						id="profesor-{currentMateriaIndex}"
						bind:value={materia.profesor}
						on:change={(e) => manejarSeleccionProfesor(currentMateriaIndex, e)}
						class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-[0px_0px_20px_0px_#004034] bg-transparent"
					>
						<option value="">Selecciona un profesor</option>
						{#each profesores as profesor}
							<option value={profesor}>{profesor}</option>
						{/each}
						<option value="Otro">Otro</option>
					</select>
				</div>

				{#if seleccionOtro}
					<div>
						<label for="otro-profesor-{currentMateriaIndex}" class="block text-sm font-medium"
							>Nombre del Profesor:</label
						>
						<input
							type="text"
							id="otro-profesor-{currentMateriaIndex}"
							bind:value={materia.otroProfesor}
							on:input={manejarCambioOtroProfesor}
							class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-lg bg-transparent"
						/>
					</div>
				{/if}
			</div>

			<div class="mt-4 text-center">
				<label for="calificacion-profesor-{currentMateriaIndex}" class="block text-sm font-medium"
					>Calificación del Profesor</label
				>
				<div class="rating">
					{#each [5, 4, 3, 2, 1] as calificacion (calificacion)}
						<input
							type="radio"
							id="calificacion-profesor-{currentMateriaIndex}-{calificacion}"
							name="calificacion-profesor-{currentMateriaIndex}"
							value={calificacion}
							on:change={(e) => actualizarCalificacionProfesor(currentMateriaIndex, e)}
							checked={materia.calificacion_profesor === calificacion}
						/>
						<label
							for="calificacion-profesor-{currentMateriaIndex}-{calificacion}"
							title="Calificación {calificacion}">⬤</label>
					{/each}
				</div>				
			</div>
		</div>

		{#if showValidationMessage}
			<p class="mt-4 text-sm text-red-600">
				Por favor, complete todos los campos obligatorios antes de avanzar.
			</p>
		{/if}
	</div>
</div>

<style>
	.rating {
		display: inline-flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
	}

	.rating input[type='radio'] {
		display: none;
	}

	.rating label {
		font-size: 2rem;
		color: #666;
		padding: 0 0.1rem;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.rating label:hover ~ label,
	.rating label:hover,
	.rating input:checked ~ label {
		color: #004034;
	}

	select option {
		margin: 40px;
		background: #010604;
		color: #e0e4e2;
	}
</style>
