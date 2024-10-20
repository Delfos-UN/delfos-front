<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
	import Colaborators from '$lib/components/Colaborators.svelte';

    import '../../app.css';
</script>

<div class="transition-colors duration-300 bg-custom-gradient font-poppins">
  <Header />
  <Colaborators />
  <Footer />
</div>
