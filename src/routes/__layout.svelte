<script context="module">
    export const load = async ({ url }) => ({ props: { url } });
  </script>
  
  <script>
    import PageTransition from "$lib/components/PageTransition.svelte";
    export let url;
    import "../app.css";
  </script>
  
  <div class="grid place-items-center dark:bg-slate-800 dark:text-white max-w-screen break-words">
    <nav class="p-2 grid place-items-center mt-0 w-screen top-0 border-b-4 border-yellow-400 bg-cyan-500">
      <div class="flex justify-center align-center content-center">
        <a href="/">
          <span>
            <img alt="logo" src="/apple-touch-icon.png" class="h-8" />
          </span>
        </a>
      </div>
      <br>
      <div class="w-full">
        <div class="pb-6 hidden place-items-center align-center sm:h-2 grid-cols-3 gap-4 content-center sm:grid">
          <span>
            <a href="/" class="transition ease-in-out delay-150 pb-4 text-white hover:text-yellow-300">Home</a>
          </span>
          <span>
            <a href="/new" class="transition ease-in-out delay-150 pb-4 text-white hover:text-yellow-300">New Session</a>
          </span>
          <span>
            <a href="/session" class="transition ease-in-out delay-150 pb-4 text-white hover:text-yellow-300">Go to a session</a>
          </span>
        </div>
      </div>
    </nav>
    <div class="font-sans grid pt-2 place-items-center mx-4 mb-4">      
      <PageTransition {url}>
        <slot />
      </PageTransition>
    </div>
  </div>
  