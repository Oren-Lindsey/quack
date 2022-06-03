<script>
    import { MetaTags } from 'svelte-meta-tags';
</script>
<MetaTags
    title={`Home - Quack`}
    description={`Homepage - Quack`}
    openGraph={{
        title: `Home - Quack`,
        description: `Homepage - Quack`,
        site_name: 'Quack',
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: `Home - Quack`,
    description: `Homepage - Quack`,
  }}
/>
<h1 class="text-black text-2xl dark:text-white">Quack</h1>
<p class="text-gray-500 pt-2">
    Quack is a <b class="delay-50 underline decoration-yellow-400 decoration-wavy decoration-2 dark:decoration-gray-500 hover:decoration-dotted">simple</b> and <b class="underline decoration-cyan-400 decoration-2 decoration-wavy dark:decoration-gray-500 hover:decoration-dotted">fast</b> way to share and answer questions. Get started by creating a new session.
</p>
<br>
<a href="/new" class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400">New session</a>
<br>
<br>
<a href="/session" class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400">Go to a session</a>
