<script>
    //can do other transitions but fly or fade looks best
    import { fly,fade } from "svelte/transition";
    export let url = "";
  </script>
  
  {#key url}
    <div
      in:fade={{ duration: 200, delay: 500 }}
      out:fade={{ duration: 200 }}
    >
      <slot />
    </div>
  {/key}
  <!--
    in:fly={{ x: 5, duration: 200, delay: 500 }}
    out:fly={{ x: -5, duration: 200 }}
  -->