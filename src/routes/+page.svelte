<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import About from '$lib/components/About.svelte';
    import Roadmap from '$lib/components/Roadmap.svelte';
    import Dev from '$lib/components/Dev.svelte';

    import '../app.css';
</script>

<div class="transition-colors duration-300 bg-custom-gradient font-poppins">
  <Header />
  <Hero />
  <About id="about" />
  <Roadmap id="roadmap" />
  <Dev id="devs"/>
  <Footer />
</div>
