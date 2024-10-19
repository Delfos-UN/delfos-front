<script lang="ts">
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="fixed top-0 left-0 z-50 w-full py-4 bg-glass-effect text-[#e0e4e2]">
	<div class="container flex items-center justify-between px-4 mx-auto">
		<a href="/" class="flex items-center">
			<img src="/delfos-logo.svg" alt="" class="w-8 mr-2" />
			<h1 class="text-2xl font-light">Delfos</h1>
		</a>

		<button class="block text-white md:hidden" on:click={toggleMenu}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>

		<nav
			class={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-[#00261c] md:bg-transparent sm:bg-transparent w-full md:w-auto top-16 left-0 md:top-auto md:left-auto text-center z-40`}
		>
			<ul class="flex flex-col p-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:p-0">
				<li><a href="/#about" class="button">Sobre Delfos</a></li>
				<li><a href="/#roadmap" class="button">Roadmap</a></li>
				<li><a href="/aporta" class="button">Aporta tus datos</a></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.bg-glass-effect {
		background-color: rgba(255, 255, 255, 0);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.button {
		color: #e0e4e2;
		line-height: 2;
		position: relative;
	}

	.button::before {
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

	.button:hover::before {
		transform: translateY(-0.25rem);
		opacity: 1;
	}
</style>
