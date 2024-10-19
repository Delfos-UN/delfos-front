<script lang="ts">
	export let id: string;
</script>

<section {id} class="min-h-[50vh] p-6 flex flex-col justify-center max-w-4xl mx-auto pt-16">
	<div class="container px-4 mx-auto">
		<h2 class="mb-4 text-4xl font-bold text-gradient">Sobre Delfos</h2>
		<p class="mb-6 text-lg text-[16px] text-[#e0e4e2]">
			Delfos será un modelo inteligencia artificial que te recomienda las materias ideales.
			Inspirada en el Oráculo de Delfos, te guía para tomar decisiones informadas en tu camino
			educativo. Delfos es creado y entrenado por estudiantes. Al ser desarrollado por quienes
			conocen de primera mano las necesidades y desafíos académicos, Delfos ofrece recomendaciones
			más precisas y relevantes. Participa en esta iniciativa colaborativa y forma parte de una
			comunidad que mejora la experiencia educativa para todos.
		</p>
		<div class="flex flex-row items-center justify-end space-x-4">
			<!-- <a href="#devs" class="button-dev">Para Desarrolladores</a> -->
			<a href="/aporta" class="button">Aportar Datos</a>
		</div>
	</div>
</section>

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

	/* .button-dev {
		color: #e0e4e2;
		line-height: 2;
		position: relative;
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
	} */

	.button:hover {
		background-color: #004034;
	}

	.flex {
		display: flex;
	}

	/*   .space-x-4 > * + * {
    margin-left: 1rem;
  } */
</style>
