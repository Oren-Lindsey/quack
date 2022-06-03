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
<p class="text-gray-500">
    Quack is a simple and fast way to share and answer questions. Get started by creating a new session.
</p>
<br>
<a href="/new" class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400">New session</a>
<br>
<br>
<a href="/session" class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400">Go to a session</a>