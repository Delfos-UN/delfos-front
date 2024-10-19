<script lang="ts">
	export let id: string; // Definir id como una propiedad exportada
</script>

<section {id} class="flex items-center max-w-4xl min-h-screen p-6 pt-16 mx-auto">
	<div class="container mx-auto">
		<h2 class="mb-8 text-4xl font-bold text-center text-gradient">
			Nuestro Camino Hacia el Futuro
		</h2>

		<!-- Steps container -->
		<div class="relative ml-6 step-container">
			<!-- Recolección de Datos -->
			<div class="relative mb-12 ml-8">
				<div
					class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
				>
					1
				</div>
				<h3 class="mb-2 text-2xl font-semibold text-gradient">Recolección de Datos</h3>
				<p class="mb-4 text-lg text-[#e0e4e2]">
					Estamos recopilando información para entrenar a Delfos. ¡Contribuye y forma parte
					fundamental del desarrollo de Delfos!
				</p>
				<a href="/aporta" class="button"> Aportar datos </a>
			</div>

			<!-- Desarrollo del MVP del Modelo -->
			<div class="relative mb-12 ml-8">
				<div
					class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
				>
					2
				</div>
				<h3 class="mb-2 text-2xl font-semibold text-gradient">Desarrollo del MVP del Modelo</h3>
				<p class="mb-4 text-lg text-[#e0e4e2]">
					21 días después de finalizar la recolección de datos, desarrollaremos el MVP de Delfos.
				</p>
			</div>

			<!-- Pruebas de Alpha Cerrada -->
			<div class="relative mb-12 ml-8">
				<div
					class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
				>
					3
				</div>
				<h3 class="mb-2 text-2xl font-semibold text-gradient">Alpha Cerrada</h3>
				<p class="mb-4 text-lg text-[#e0e4e2]">
					Lanzaremos pruebas de alpha cerrada para afinar detalles. Si deseas ser parte y ayudarnos
					a mejorar, ¡te invitamos a unirte!
				</p>
				<!-- <button class="button"> Únete a las pruebas de Alpha </button> -->
			</div>

			<!-- Beta Abierta -->
			<div class="relative mb-12 ml-8">
				<div
					class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
				>
					4
				</div>
				<h3 class="mb-2 text-2xl font-semibold text-gradient">Beta Abierta</h3>
				<p class="mb-4 text-lg text-[#e0e4e2]">
					Finalizada la alpha, abriremos una beta pública para que más usuarios puedan experimentar
					y brindar retroalimentación.
				</p>
			</div>

			<!-- Lanzamiento de Delfos 1.0 -->
			<div class="relative ml-8">
				<div
					class="absolute flex items-center justify-center w-8 h-8 font-bold text-[#e0e4e2] bg-[#004034] rounded-full -left-10"
				>
					5
				</div>
				<h3 class="mb-2 text-2xl font-semibold text-gradient">Lanzamiento de Delfos 1.0</h3>
				<p class="mb-4 text-lg text-[#e0e4e2]">
					Refinados detalles, presentaremos la versión oficial de nuestro modelo: Delfos One.
					¡Prepárate para mejorar tu camino académico con la mejor recomendación de materias!
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.step-container::before {
		content: '';
		position: absolute;
		width: 2px;
		top: 0;
		bottom: 6rem;
		left: 8px;
		background-color: #004034;
	}

	.button {
		display: inline-block;
		padding: 12px 24px;
		color: #e0e4e2;
		border: 2px solid #004034;
		border-radius: 7.5px;
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
</style>
