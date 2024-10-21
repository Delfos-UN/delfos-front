<script lang="ts">
	import { guardarColaborador } from '../utils/supabaseClient';
	import { Globe } from 'lucide-svelte';
	import Toast from './Toast.svelte';
	import ModalTDP from '$lib/components/ModalTDP.svelte';

	let name: string = '';
	let email: string = '';
	let github: string = '';
	let area: string = 'Delfos';
	let message: string = '';
	let aceptaTratamientoDatos: boolean = false;
	let successMessage: string = '';
	let errorMessage: string = '';

	let modalRef: ModalTDP | null = null;

	function openModal() {
		modalRef?.openModal();
	}

	const repos = [{ name: 'Landing', url: 'https://github.com/tu-org/delfos', icon: Globe }];

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		// Validar si acepta el tratamiento de datos
		if (!aceptaTratamientoDatos) {
			errorMessage = 'Debe aceptar el tratamiento de datos para continuar.';
			return;
		}

		try {
			const response = await guardarColaborador(
				name,
				email,
				github,
				area,
				message,
				aceptaTratamientoDatos
			);

			if (response.success) {
				successMessage = 'Tu solicitud ha sido enviada con éxito.';
				name = '';
				email = '';
				github = '';
				area = 'Delfos';
				message = '';
				aceptaTratamientoDatos = false; // Reiniciar el estado
			} else {
				throw new Error(response.error);
			}
		} catch (error) {
			errorMessage = 'Hubo un error al enviar tu solicitud. Inténtalo de nuevo.';
		}
	};
</script>

{#if successMessage}
	<Toast message={successMessage} type="success" />
{/if}

{#if errorMessage}
	<Toast message={errorMessage} type="error" />
{/if}

<ModalTDP bind:this={modalRef} />

<div
	class="flex flex-col justify-center max-w-4xl min-h-screen p-8 pt-16 mx-auto rounded-lg shadow-lg"
>
	<div class="min-h-[25vh]">
		<h1 class="mb-6 text-4xl font-bold text-center text-gradient">Conviértete en Colaborador</h1>
		<p class="mb-4 text-lg text-[#e0e4e2]">
			En Delfos, creemos que cada persona tiene el potencial de generar un impacto significativo.
			Buscamos mentes creativas y apasionadas que estén dispuestas a compartir su talento y
			compromiso para impulsar el desarrollo y construir un futuro mejor. Si estás listo para
			aceptar el desafío y ser parte de una comunidad que valora la innovación y el trabajo en
			equipo, te invitamos a unirte a nosotros. ¡Juntos, podemos hacer la diferencia!
		</p>
	</div>
	<div class="min-h-[25vh]">
		<h2 class="mb-4 text-3xl font-bold text-center text-gradient">
			Proyectos Abiertos que Esperan Tu Talento
		</h2>
		<p class="mb-4 text-lg text-[#e0e4e2]">
			Te invitamos a explorar nuestros repositorios públicos y a dejar tu huella realizando pull
			requests. Tu contribución puede marcar la diferencia en el avance de nuestros proyectos
			actuales. ¡Únete y colabora con nosotros!
		</p>
		<div class="flex justify-center">
			{#each repos as { name, url, icon }}
				<div class="p-4 border-[#004034] border-2 rounded-lg shadow-md w-fit text-center">
					<svelte:component this={icon} class="w-6 h-6 text-[#004034] text-center" />
					<a href={url} target="_blank" rel="noopener noreferrer" class="button-dev">
						{name}
					</a>
				</div>
			{/each}
		</div>
	</div>
	<div class="min-h-[50vh]">
		<h2 class="mb-4 text-3xl font-bold text-center text-gradient">
			¿Tienes algo específico que aportar?
		</h2>
		<p class="mb-4 text-lg text-[#e0e4e2]">
			Si tienes ideas innovadoras o deseas contribuir de una manera más específica, nos encantaría
			saber de ti. Estamos siempre abiertos a nuevas propuestas y colaboraciones que impulsen
			nuestro proyecto. Por favor, no dudes en ponerte en contacto con nosotros para discutir cómo
			podemos trabajar juntos.
		</p>
		<div class="flex justify-center">
			<form on:submit={handleSubmit} class="w-full max-w-lg space-y-4">
				<div>
					<label for="name" class="block text-[#e0e4e2]">Nombre:</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-lg bg-transparent text-[#e0e4e2]"
						placeholder="Tu nombre"
						required
					/>
				</div>
				<div>
					<label for="email" class="block text-[#e0e4e2]">Correo Electrónico:</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-lg bg-transparent text-[#e0e4e2]"
						placeholder="tu@correo.com"
						required
					/>
				</div>
				<div>
					<label for="github" class="block text-[#e0e4e2]">GitHub:</label>
					<input
						type="url"
						id="github"
						bind:value={github}
						class="w-full p-2 mt-2 border-[#004034] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-lg bg-transparent text-[#e0e4e2]"
						placeholder="https://github.com/tu-usuario"
						required
					/>
				</div>
				<div>
					<label for="area" class="block text-[#e0e4e2]">Área a la que quieres aportar:</label>
					<select
						id="area"
						bind:value={area}
						class="w-full p-2 mt-2 border-[#004034] text-[#e0e4e2] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] focus:drop-shadow-lg bg-transparent cursor-pointer"
						required
					>
						<option value="Delfos">Delfos</option>
						<option value="Cloud">Cloud</option>
						<option value="Develop">Develop</option>
					</select>
				</div>
				<div>
					<label for="message" class="block text-[#e0e4e2]"
						>¿Cómo y por qué te gustaría aportar?</label
					>
					<textarea
						id="message"
						bind:value={message}
						class="w-full p-3 mb-6 bg-transparent border-2 border-[#004034] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] text-[#e0e4e2] resize-none"
						placeholder="Describe tu motivación y contribución esperada"
						rows="4"
						required
					></textarea>
				</div>
				<div class="flex items-center">
					<input
						type="checkbox"
						id="acepta-tratamiento"
						bind:checked={aceptaTratamientoDatos}
						class="mr-2 accent-[#004034]"
					/>
					<label for="acepta-tratamiento" class="text-sm text-[#e0e4e2]">
						Acepto el <button type="button" on:click={openModal} class="underline">tratamiento de datos</button>
					</label>
				</div>

                <button type="submit" class="button"> Enviar Solicitud </button>
			</form>
		</div>
	</div>
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
	}

	.button:hover {
		background-color: #004034;
	}

	select option {
		margin: 40px;
		background: #010604;
		color: #e0e4e2;
	}

	.button-dev {
		color: #e0e4e2;
		line-height: 2;
		position: relative;
		display: flex;
		gap: 4px;
		align-items: center;
	}

	.button-dev::before {
		content: '';
		width: 100%;
		height: 2px;
		border-radius: 2px;
		background-color: #004034;
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		transition:
			transform 0.4s,
			opacity 0.4s;
		opacity: 0;
	}

	.button-dev:hover::before {
		transform: translateY(-0.25rem);
		opacity: 1;
	}
</style>
