<section class="flex items-center justify-center min-h-screen">
	<div class="container text-center">
		<h1 class="mb-4 text-4xl font-bold md:text-8xl sm:text-6xl text-gradient">
			Mejora tu destino académico con <span class="font-extralight">Delfos</span>
		</h1>
		<p class="text-l md:text-4xl sm:text-2xl font-light text-[#e0e4e2] mb-7">
			El Oráculo de las Materias respaldado por Inteligencia Artificial
		</p>

		<a href="/aporta" class="button">
			<span>Aportar Datos</span>
		</a>
	</div>
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
	.button {
		--glow-color: #6a7f77;
		--glow-spread-color: #02120c;
		--enhanced-glow-color: #e0e4e2;
		--btn-color: #010604;
		border: 0.25em solid var(--glow-color);
		padding: 1em 3em;
		color: var(--glow-color);
		font-size: 15px;
		font-weight: bold;
		background-color: var(--btn-color);
		border-radius: 1em;
		box-shadow:
			0 0 1em 0.25em var(--glow-color),
			0 0 4em 1em var(--glow-spread-color),
			inset 0 0 0.75em 0.25em var(--glow-color);
		text-shadow: 0 0 0.5em var(--glow-color);
		position: relative;
		transition: all 0.3s;
		margin-top: 2rem;
	}

	.button::after {
		pointer-events: none;
		content: '';
		position: absolute;
		top: 120%;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: var(--glow-spread-color);
		filter: blur(2em);
		opacity: 0.7;
		transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
	}

	.button:hover {
		color: var(--btn-color);
		background-color: var(--glow-color);
		box-shadow:
			0 0 1em 0.25em var(--glow-color),
			0 0 4em 2em var(--glow-spread-color),
			inset 0 0 0.75em 0.25em var(--glow-color);
	}

	.button:active {
		box-shadow:
			0 0 0.6em 0.25em var(--glow-color),
			0 0 2.5em 2em var(--glow-spread-color),
			inset 0 0 0.5em 0.25em var(--glow-color);
	}
</style>
