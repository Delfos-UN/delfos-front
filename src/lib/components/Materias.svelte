<script lang="ts">
	import Select from 'svelte-select';
	import type { Materia } from '$lib/utils/formatMaterias';

	export let materia: Materia;
	export let currentMateriaIndex: number;
	export let profesores: { created: boolean, value: string, label: string }[];
	export let actualizarCalificacion: (index: number, event: Event) => void;
	export let actualizarCalificacionProfesor: (index: number, event: Event) => void;
	export let seleccionarProfesor: (index: number, event: Event) => void;
	export let showValidationMessage: boolean = false;

	let filterText: string = '';

	function handleFilter(e: CustomEvent<{ length: number }>) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prevProfesores = profesores.filter(p => !p.created);
			const newProfesor = { value: filterText, label: filterText, created: true };
			profesores = [...prevProfesores, newProfesor];
		}
	}

	function handleChange(e: CustomEvent<{ value: string }>) {
		profesores = profesores.map(p => {
			p.created = false;
			return p;
		});
		materia.profesor = e.detail.value;

		const customEvent = new CustomEvent('change', { detail: { value: e.detail.value } });
		seleccionarProfesor(currentMateriaIndex, customEvent);
	}
</script>

<div>
	<div class="mb-4">
		<h1 class="mb-1 text-3xl font-bold text-center text-gradient">Evalúa tus asignaturas</h1>
		<p class="text-lg text-[#e0e4e2]">
			Por favor, califica de 1 a 5 las asignaturas que cursaste y a los profesores que las impartieron. Para agregar un nuevo profesor, por favor escriba el nombre y luego presione "ENTER".
		</p>
	</div>
	<div class="w-full p-6 text-lg border border-[#004034] rounded-lg shadow-sm text-[#e0e4e2] text-center">
		<h2 class="mb-1 text-2xl font-bold text-center text-gradient">Califica la materia</h2>
		<div class="flex flex-col items-center justify-between mb-4 space-y-4 lg:flex-row lg:space-y-0">
			<div class="w-full lg:w-auto">
				<p>{materia.nombre} - {materia.periodo}</p>
			</div>
			<div class="w-full text-center lg:w-auto">
				<label for="calificacion-materia-{currentMateriaIndex}" class="block text-sm font-medium">Calificación</label>
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
						<label for="calificacion-materia-{currentMateriaIndex}-{calificacion}" title="Calificación {calificacion}">⬤</label>
					{/each}
				</div>
			</div>
		</div>
		<h2 class="mb-1 text-2xl font-bold text-center text-gradient">Califica al profesor</h2>
		<div class="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
			<div class="w-full lg:w-full">
				<label for="profesor-select-{currentMateriaIndex}" class="block mb-1 text-sm font-medium text-start">Profesor:</label>
				<Select 
					id="profesor-select-{currentMateriaIndex}"
					bind:filterText 
					on:filter={handleFilter}
					on:change={handleChange}
					items={profesores}
					containerStyles="background: transparent !important; border: 2px solid #004034; border-radius: 8px; max-width: 400px; min-width: fit-content; text-align: left;"
					placeholder="Selecciona un profesor o agrégalo"
				>
					<div slot="item" let:item>
						{item.created ? 'Otro profesor: ' : ''}{item.label}
					</div>
				</Select>
			</div>
			<div class="w-full mt-4 text-center lg:w-auto lg:mt-0">
				<label for="calificacion-profesor-{currentMateriaIndex}" class="block text-sm font-medium">Calificación</label>
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
						<label for="calificacion-profesor-{currentMateriaIndex}-{calificacion}" title="Calificación {calificacion}">⬤</label>
					{/each}
				</div>
			</div>
		</div>

		{#if showValidationMessage}
			<p class="mt-4 text-sm text-red-600">Por favor, complete todos los campos obligatorios antes de avanzar.</p>
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
</style>
