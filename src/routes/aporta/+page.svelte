<script lang="ts">
	import InputHistoria from '$lib/components/InputHistoria.svelte';
	import Materias from '$lib/components/Materias.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { limpiarTexto, profesores, extraerPlanDeEstudios, esPlanDeEstudiosValido, type Materia } from '$lib/utils/formatMaterias';
	import { guardarEncuestaConMaterias } from '$lib/utils/supabaseClient';

	import '../../app.css';

	let inputText: string = '';
	let materiasFormateadas: Materia[] = [];
	let aceptaTratamientoDatos: boolean = false;
	let showTextareaError: boolean = false;
	let currentStep: number = 1;
	let currentMateriaIndex: number = 0;
	let planDeEstudios: string | null = null;
	let showPlanError: boolean = false;

	function avanzarPaso() {
		console.log("Texto de entrada para extraer plan de estudios:", inputText);
		
		if (!inputText.trim()) {
			showTextareaError = true;
			return;
		}
		showTextareaError = false;

		// Extraer y validar el plan de estudios
		planDeEstudios = extraerPlanDeEstudios(inputText);

		// Log del plan de estudios extraído
		console.log("Plan de estudios extraído:", planDeEstudios);

		if (planDeEstudios && esPlanDeEstudiosValido(planDeEstudios)) {
			console.log("Plan de estudios es válido, avanzando al siguiente paso.");
			if (aceptaTratamientoDatos) {
				materiasFormateadas = limpiarTexto(inputText);
				currentStep++;
			} else {
				alert('Debe aceptar el tratamiento de datos para continuar.');
			}
		} else {
			console.log("Plan de estudios no válido, mostrando error.");
			showPlanError = true;
		}
	}

	function retrocederMateria() {
		if (currentMateriaIndex > 0) {
			currentMateriaIndex--;
		}
	}

	let showValidationMessage: boolean = false;

	function avanzarMateria() {
		// Verifica si la materia actual está completa
		const materiaActual = materiasFormateadas[currentMateriaIndex];
		const isValid = !!materiaActual.nombre && !!materiaActual.codigo && !!materiaActual.tipologia && !!materiaActual.periodo && 
						(materiaActual.calificacion !== null) && 
						(!!materiaActual.profesor || !!materiaActual.otroProfesor);

		if (!isValid) {
			showValidationMessage = true;
			return;
		}

		showValidationMessage = false; // Oculta el mensaje de error si es válido

		if (currentMateriaIndex < materiasFormateadas.length - 1) {
			currentMateriaIndex++;
		}
	}

	async function guardarDatos() {
		const result = await guardarEncuestaConMaterias(aceptaTratamientoDatos, materiasFormateadas);
		if (result.success) {
			console.log('Datos guardados exitosamente');
		} else {
			console.error('Error al guardar datos:', result.error);
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

<div class="transition-colors duration-300 bg-custom-gradient font-poppins">
	<Header />
	<div class="flex flex-col items-center justify-center max-w-4xl min-h-screen p-6 pt-16 mx-auto">
		{#if currentStep === 1}
			<div class="text-[#e0e4e2] mb-4">
				<div class="mb-4">
					<h1 class="mb-1 text-3xl font-bold text-center text-gradient">¡Necesitamos tus datos!</h1>
					<p class="text-lg">
						Para ofrecerte una mejor experiencia, necesitamos que nos proporciones tu historial
						académico. Con esta información, podremos entrenar a Delfos para recomendarte las
						mejores materias. Solo necesitas pegar tu historial académico en el siguiente campo y
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
							Pega tu historia académica en el campo de texto y presiona el botón "Empezar".
						</p>
					</div>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							2
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Selecciona la calificación de la materia y el profesor que la impartió, luego presiona
							"Siguiente" para avanzar a la siguiente materia.
						</p>
					</div>
					<div class="relative ml-8">
						<div
							class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
						>
							3
						</div>
						<p class="mb-4 text-[#e0e4e2] text-lg">
							Al finalizar, presiona "Enviar" para enviar tus datos.
						</p>
					</div>
				</div>
			</div>
			<InputHistoria bind:inputText bind:showTextareaError />
			<div class="flex-col items-center justify-center my-4 text-center">
				{#if showPlanError}
					<p class="text-red-500">El plan de estudios no es válido para esta encuesta.</p>
				{/if}
				<input
					type="checkbox"
					id="acepta-tratamiento"
					bind:checked={aceptaTratamientoDatos}
					class="mr-2 accent-[#004034]"
				/>
				<label for="acepta-tratamiento" class="text-sm text-[#e0e4e2]">
					Acepto el tratamiento de datos
				</label>
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
                <!-- Botón de retroceder con icono de flecha -->
                <button
                    on:click={retrocederMateria}
                    class="p-1 font-semibold text-white bg-transparent rounded-full border-2 border-[#004034] shadow-md w-fit hover:bg-[#004034]"
                    disabled={currentMateriaIndex === 0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            
                <!-- Texto con el índice de la materia actual -->
                <h3 class="text-[#e0e4e2]">
                    {currentMateriaIndex + 1} / {materiasFormateadas.length}
                </h3>
            
                <!-- Botón de avanzar con icono de flecha -->
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
                        Guardar
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
</style>
