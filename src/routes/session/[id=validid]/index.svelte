<script>
    import { MetaTags } from 'svelte-meta-tags';
    export let id; 
    export let name;
    let msg = ""
    async function sendQuestion(e) {
        try {
        const formData = new FormData(e.target);
        const parsed = await parseFormData(formData);
        parsed.parentId = id;
        const newDoc = await fetch(`/session/${id}`, {
            method: "POST",
            body: JSON.stringify(parsed),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const parsedDoc = await newDoc.json()
        msg = `Your question "${parsedDoc.data.doc.content}" has been sent to session "${parsedDoc.data.session.name}". You can send another question if you like...`
        } catch (err) {
            msg = `sorry, something went wrong. please try again. your question couldn't be sent`
        }
    }
    async function parseFormData(formData) {
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        return data
    }
</script>
<h1 class="pt-2 text-xl">Send questions to session "{name}"</h1>
<br>
{#if msg.length > 0}
<p class="mb-4">{msg}</p>
{/if}
<form on:submit|preventDefault={sendQuestion} class="transition ease-in-out delay-50 bg-white shadow-md rounded px-8 pt-6 pb-8 sm:[width: 36rem] sm:max-w-xl xs:max-w-md min-w-full xs:[width: 28rem] mb-4 hover:shadow-xl dark:bg-gray-900 dark:text-white">
    <label for="content" class="text-gray-500">Content:</label>
    <input class="transition ease-in-out delay-50 shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl dark:bg-gray-900 dark:text-white" type="text" name="content" id="content" placeholder="Question content..." />
    <button type="submit" class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-800">Send</button>
</form>
<MetaTags
    title={`Send questions to session "${name}" - Quack`}
    description={`Send questions to session "${name}" - Quack`}
    openGraph={{
        title: `Submit questions to ${name} - Quack`,
        description: `Submit questions to session "${name}" - Quack`,
        site_name: 'Quack',
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: `Submit questions to ${name} - Quack`,
    description: `Submit questions to session "${name}" - Quack`,
  }}
/>
