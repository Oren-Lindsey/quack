<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                title: status,
                message: error.message
            }
        };
    }
  </script>
  
  <script>
    export let title;
    export let message
  </script>
  
  <h1 class="text-xl p-2">{title} error</h1>
  <b class="underline decoration-yellow-400 decoration-wavy decoration-2">{#if title == 404} {message} {:else} something went wrong {/if}</b>