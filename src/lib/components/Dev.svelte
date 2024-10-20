<script lang="ts">
	import { Linkedin, Github, Terminal } from 'lucide-svelte';
	export let id: string;
	type Member = {
		name: string;
		role: string;
		image: string;
		linkedin: string;
		github: string;
	};

	export let members: Member[] = [
		{
			name: 'Juan Duran',
			role: 'Software Developer',
			image:
				'https://media.licdn.com/dms/image/v2/D4E03AQEkC0Lbb_GzpQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686673249482?e=1735171200&v=beta&t=11C8KrM-BT1kQX71TloDyZtBY_UpnGIgS4ZC6boGGuM',
			linkedin: 'https://www.linkedin.com/in/jusebdu/',
			github: 'https://github.com/juduranr'
		},
		{
			name: 'Juan Mejia',
			role: 'Data Scientist',
			image: 'https://avatars.githubusercontent.com/u/81326509?v=4',
			linkedin: 'https://www.linkedin.com/in/juanmejiadev/',
			github: 'https://github.com/jmejiaes'
		},
		{
			name: 'Andrés Galvis',
			role: 'Machine Learning Engineer',
			image:
				'https://media.licdn.com/dms/image/v2/D4E03AQFt_6YibSGegg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720128586234?e=1735171200&v=beta&t=tdzRzTYueCMove21U8FQnJg59M3zCUBk7Djt9-qSydw',
			linkedin: 'https://www.linkedin.com/in/alexis-galvis/',
			github: 'https://github.com/aleuse'
		}
	];
</script>

<div {id} class="min-h-[50vh] p-6 flex flex-col justify-center max-w-4xl mx-auto pt-16">
	<h1 class="mb-6 text-4xl font-bold text-center text-gradient">Conoce a nuestros colaboradores</h1>
	<div class="flex items-center justify-center mb-6">
		{#each members as member (member.name)}
			<div class="max-w-xs p-6 rounded-lg" aria-label="Ver más información sobre {member.name}">
				<img
					src={member.image}
					alt={`Foto de ${member.name}`}
					class="w-24 h-24 mx-auto mb-4 transition-transform duration-500 rounded-full hover:rotate-6"
				/>
				<h2 class="mb-2 text-xl font-bold text-center text-[#e0e4e2]">{member.name}</h2>
				<p class="mb-4 text-center text-[#e0e4e2]">{member.role}</p>
				<div class="flex justify-center space-x-4">
					<a
						href={member.linkedin}
						target="_blank"
						class="text-[#e0e4e2] transition-colors hover:text-[#004034] duration-100 hover:rotate-6"
						aria-label={`Perfil de LinkedIn de ${member.name}`}
					>
						<Linkedin />
					</a>
					<a
						href={member.github}
						target="_blank"
						class="text-[#e0e4e2] transition-colors hover:text-[#004034] duration-100 hover:rotate-6"
						aria-label={`Perfil de GitHub de ${member.name}`}
					>
						<Github />
					</a>
				</div>
			</div>
		{/each}
	</div>
	<div>
		<h2 class="text-[#e0e4e2] text-3xl text-gradient font-bold mb-5 text-center">
			¿Quieres ser colaborador?
		</h2>
		<p class="text-[#e0e4e2] text-lg">
			Si te interesa colaborar con nosotros, no dudes en contactarnos. Estamos en constante búsqueda de nuevos talentos que quieran aportar a la comunidad.
		</p>
		<div class="flex flex-row items-center justify-end space-x-4">
			<a href="/colab" class="button-dev"><span><Terminal/></span>Colabora con nosotros</a>
		</div>
	</div>
</div>

<style>
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
