<script lang="ts">
	import InputHistoria from '$lib/components/InputHistoria.svelte';
	import Materias from '$lib/components/Materias.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		limpiarTexto,
		profesores,
		extraerPlanDeEstudios,
		esPlanDeEstudiosValido,
		type Materia
	} from '$lib/utils/formatMaterias';
	import { guardarEncuestaConMaterias } from '$lib/utils/supabaseClient';
	import Select from 'svelte-select';
	import Toast from '$lib/components/Toast.svelte';
	import ModalTDP from '$lib/components/ModalTDP.svelte';

	import '../../app.css';

	let inputText: string = '';
	let materiasFormateadas: Materia[] = [];
	let aceptaTratamientoDatos: boolean = false;
	let showTextareaError: boolean = false;
	let currentStep: number = 1;
	let currentMateriaIndex: number = 0;
	let planDeEstudios: string | null = null;
	let showPlanError: boolean = false;
	let email: string = '';
	let gustoProfesional: { label: string, value: string }[] = [];
	let successMessage: string = '';
	let errorMessage: string = '';

	$: maxItems = gustoProfesional?.length === 3;
    $: opcionesFiltradas  = maxItems ? [] : [...opcionesGustoProfesional];

    let modalRef: ModalTDP | null = null;

    function openModal() {
        modalRef?.openModal();
    }

	const opcionesGustoProfesional = [
		{ label: 'Desarrollo Web', value: 'Desarrollo Web' },
		{ label: 'Ingeniería de Software', value: 'Ingeniería de Software' },
		{ label: 'Inteligencia Artificial', value: 'Inteligencia Artificial' },
		{ label: 'Ciencia de Datos', value: 'Ciencia de Datos' },
		{ label: 'Bases de Datos', value: 'Bases de Datos' },
		{ label: 'Videojuegos', value: 'Videojuegos' },
		{ label: 'Diseño y multimedia', value: 'Diseño y multimedia' },
		{ label: 'Nube', value: 'Nube' },
		{ label: 'Redes y Comunicaciones', value: 'Redes y Comunicaciones' },
		{ label: 'Sistemas y modelado', value: 'Sistemas y modelado' },
		{ label: 'Gestión de Proyectos', value: 'Gestión de Proyectos' },
		{ label: 'Ciberseguridad', value: 'Ciberseguridad' },
		{ label: 'Algoritmos', value: 'Algoritmos' }
	];

	function avanzarPaso() {
		if (!inputText.trim()) {
			showTextareaError = true;
			errorMessage = 'El campo de texto está vacío. Por favor, ingresa tu historia académica.';
			return;
		}
		showTextareaError = false;

		planDeEstudios = extraerPlanDeEstudios(inputText);

		if (planDeEstudios && esPlanDeEstudiosValido(planDeEstudios)) {
			if (aceptaTratamientoDatos && gustoProfesional.length > 0) {
				materiasFormateadas = limpiarTexto(inputText);
				currentStep++;
			} else {
				errorMessage =
					'Debe aceptar el tratamiento de datos y seleccionar su área de gusto profesional para continuar.';
			}
		} else {
			showPlanError = true;
			errorMessage = 'El plan de estudios no es válido para esta encuesta.';
		}
	}

	function retrocederMateria() {
		if (currentMateriaIndex > 0) {
			currentMateriaIndex--;
		}
	}

	let showValidationMessage: boolean = false;

	function avanzarMateria() {
		const materiaActual = materiasFormateadas[currentMateriaIndex];
		const isValid =
			!!materiaActual.nombre &&
			!!materiaActual.codigo &&
			!!materiaActual.tipologia &&
			!!materiaActual.periodo &&
			materiaActual.calificacion !== null;

		if (!isValid) {
			showValidationMessage = true;
			return;
		}

		showValidationMessage = false;

		if (currentMateriaIndex < materiasFormateadas.length - 1) {
			currentMateriaIndex++;
		}
	}

	async function guardarDatos() {
    const gustoProfesionalString = gustoProfesional.map(item => item.value).join(',');

    const result = await guardarEncuestaConMaterias(
        aceptaTratamientoDatos,
        gustoProfesionalString,
        materiasFormateadas,
        email
    );

    if (result.success) {
        successMessage = '¡Gracias por tu contribución! Los datos se han guardado exitosamente.';
        window.location.href = '/';
    } else {
        errorMessage = 'Hubo un problema al guardar los datos. Por favor, intenta de nuevo.';
    }
}


	function actualizarCalificacion(index: number, e: Event) {
		const target = e.target as HTMLInputElement;
		materiasFormateadas[index].calificacion = parseFloat(target.value);
	}

	function actualizarCalificacionProfesor(index: number, e: Event) {
		const target = e.target as HTMLInputElement;
		materiasFormateadas[index].calificacion_profesor = parseFloat(target.value);
	}

	function seleccionarProfesor(index: number, e: Event) {
		const target = e.target as HTMLSelectElement;
		materiasFormateadas[index].profesor = target.value;
	}

	function actualizarOtroProfesor(index: number, e: Event) {
		const target = e.target as HTMLInputElement;
		materiasFormateadas[index].profesor = target.value;
	}
</script>

{#if successMessage}
	<Toast message={successMessage} type="success" />
{/if}

{#if errorMessage}
	<Toast message={errorMessage} type="error" />
{/if}

<ModalTDP bind:this={modalRef} />

<div class="transition-colors duration-300 bg-custom-gradient font-poppins">
	<Header />
	<div class="flex flex-col items-center justify-center max-w-4xl min-h-screen p-6 pt-16 mx-auto">
		{#if currentStep === 1}
			<div class="text-[#e0e4e2] mb-4">
				<div class="mb-4">
					<h1 class="mb-1 text-3xl font-bold text-center text-gradient">¡Necesitamos tus datos!</h1>
					<p class="text-lg">
						Para ofrecerte una mejor experiencia, necesitamos que nos proporciones tu historia
						académica. Con esta información, podremos entrenar a Delfos para recomendarte las
						mejores materias. Solo necesitas pegar tu historia académica en el siguiente campo y
						seguir las instrucciones. Los datos que recopilaremos son: Nombre de la materia, Código
						de la materia, Tipología de la materia, Período en el que la cursaste y el profesor que
						la impartió. Con esta información, podrás calificar tanto la materia como al profesor.
						También deberás aceptar el tratamiento de datos.
					</p>
				</div>
				<div>
					<h2 class="mb-1 text-2xl font-bold text-center text-gradient">Pasos</h2>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							1
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Copia tu historia académica (Ctrl+A , Ctrl+C).
						</p>
						<div class="flex justify-center">
							<img src="/paso-1.gif" alt="Paso 1" class="h-[400px]" />
						</div>
					</div>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							2
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Ingresa pega tu hisotira académica ene l campo de texto, escribe tu correo, selecciona 3 areas de gusto profesional y acepta el tramiento de datos, luego presiona "Empezar"
						</p>
						<div class="flex justify-center">
							<img src="/paso-2.gif" alt="Paso 2" class="h-[400px]" />
						</div>
					</div>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							3
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Selecciona la calificación de la materia y, si recuerdas al profesor que la impartió, califícalo también, avanza a la siguiente materia.
						</p>
						<div class="flex justify-center">
							<img src="/paso-3.gif" alt="Paso 3" class="h-[400px]" />
						</div>
					</div>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							4
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Al finalizar, presiona "Enviar" para enviar tus datos.
						</p>
					</div>
				</div>
			</div>
			<div class="w-[400px]">
				<InputHistoria bind:inputText bind:showTextareaError />
				<div class="flex-col items-center justify-center my-4">
					{#if showPlanError}
						<p class="text-red-500">El plan de estudios no es válido para esta encuesta.</p>
					{/if}
					<div class="mt-4 mb-4">
						<label for="correo" class="text-sm text-[#e0e4e2]"> Correo Electrónico: </label>
						<input
							type="email"
							id="correo"
							bind:value={email}
							class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] bg-transparent text-[#e0e4e2]"
							placeholder="tu@correo.com"
							required
						/>
					</div>
					<div class="mt-4 mb-4">
						<label for="gusto-profesional" class="text-sm text-[#e0e4e2]">
							Selecciona tus áreas de gusto profesional:
						</label>
						<Select
							items={opcionesFiltradas}
							bind:value={gustoProfesional}
							multiple={true}
							placeholder="Selecciona tus áreas"
							containerStyles="background: transparent !important; border: 2px solid #004034; border-radius: 8px; max-width: 400px;"
						>
							<div class="text-[#e0e4e2] text-center" slot="empty">{maxItems ? 'Solo puedes seleccionar 3 áreas' : 'No hay áreas disponibles'}</div>
						</Select> 
					</div>
					<input
						type="checkbox"
						id="acepta-tratamiento"
						bind:checked={aceptaTratamientoDatos}
						class="mr-2 accent-[#004034]"
					/>
					<label for="acepta-tratamiento" class="text-sm text-[#e0e4e2]">
						Acepto el <button on:click={openModal} class="underline">tratamiento de datos</button>
					</label>
				</div>
			</div>
			<button on:click={avanzarPaso} class="button">Empezar</button>
		{/if}

		<!-- Paso 2: Mostrar materias una por una -->
		{#if currentStep === 2 && materiasFormateadas.length > 0}
			<Materias
				materia={materiasFormateadas[currentMateriaIndex]}
				{currentMateriaIndex}
				{profesores}
				actualizarCalificacion={(index, e) => actualizarCalificacion(index, e)}
				actualizarCalificacionProfesor={(index, e) => actualizarCalificacionProfesor(index, e)}
				seleccionarProfesor={(index, e) => seleccionarProfesor(index, e)}
				actualizarOtroProfesor={(index, e) => actualizarOtroProfesor(index, e)}
				{showValidationMessage}
			/>

			<div class="flex items-center justify-center w-full gap-2 mt-6">
				<button
					on:click={retrocederMateria}
					class="p-1 font-semibold text-white bg-transparent rounded-full border-2 border-[#004034] shadow-md w-fit hover:bg-[#004034]"
					disabled={currentMateriaIndex === 0}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="inline w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<h3 class="text-[#e0e4e2]">
					{currentMateriaIndex + 1} / {materiasFormateadas.length}
				</h3>
				<button
					on:click={() => {
						if (currentMateriaIndex === materiasFormateadas.length - 1) {
							guardarDatos();
						} else {
							avanzarMateria();
						}
					}}
					class="p-1 font-semibold text-white rounded-full shadow-md border-2 border-[#004034] bg-trabg-transparent w-fit hover:bg-[#004034]"
				>
					{#if currentMateriaIndex === materiasFormateadas.length - 1}
						Enviar
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="inline w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					{/if}
				</button>
			</div>
		{/if}
	</div>
	<Footer />
</div>

<style>
	.button {
		display: inline-block;
		padding: 12px 24px;
		color: #e0e4e2;
		border: 2px solid #004034;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition:
			background-color 0.3s ease-in-out,
			transform 0.3s ease;
		position: relative;
		z-index: 1;
		width: fit-content;
	}

	.button:hover {
		background-color: #004034;
	}

	.button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		border-color: #999;
	}

	:global(.svelte-select) {
		--background: transparent;
		--border: 2px solid #004034;
		--border-radius: 8px;
		--input-color: #e0e4e2;
		--multi-item-bg: #010604;
		--item-color: #e0e4e2;
		--multi-item-color: #e0e4e2;
		--multi-item-outline: 2px solid #004034;
		--clear-icon-color: #004034;
		--multi-item-clear-icon-color: #004034;
		--multi-item-border-radius: 4px;
		--item-hover-bg: #004034;
		--item-hover-color: #e0e4e2;
		--item-is-active-bg: #00a77e;
		--item-is-active-color: #e0e4e2;
		--list-background: #010604;
		--list-border: 2px solid #004034;
		--placeholder-color: #e0e4e2;
		--width: 100%;
		--max-height: 200px;
		--list-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	}
</style>
