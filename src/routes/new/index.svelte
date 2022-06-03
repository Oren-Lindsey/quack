<script>
    import { MetaTags } from 'svelte-meta-tags';
    let name
    let msg = ""
    let id = ""
    let show = false
    let success = false
    const createSession = async (e) => {
        try {
            msg = `creating...`
            const formData = new FormData(e.target);
            const parsed = await parseFormData(formData);
            const newDoc = await fetch('/new', {
                method: "POST",
                body: JSON.stringify(parsed),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            const parsedDoc = await newDoc.json()
            if (parsedDoc.error) {
                msg = parsedDoc.error
                show = true
                success = false
            } else {
                name = "";
                msg = `Your session "${parsedDoc.data.name}" has been created`
                id = parsedDoc.data._id
                show = true
                success = true
            }
        } catch (err) {
            msg = err
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
<h1 class="text-xl p-2">New session:</h1>
<br>
<form on:submit|preventDefault={createSession} class="transition ease-in-out delay-50 bg-white shadow-md rounded [background-color: green] [min-width: 36rem] px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900">
    {#if show && !success}
    <div class="max-w-2 break-words">
        <i class="text-black dark:text-white">{msg}</i>
        <br>
    </div>
    {/if}
    <label for="name" class="text-gray-500">Name:</label>
    <br>
    <input id="name" name="name" type="text" placeholder="name" class="transition ease-in-out delay-50 shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl dark:bg-gray-900 dark:text-white" bind:value={name}>
    <br>
    <button class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-800" type="submit">create</button>
</form>
{#if show && success}
    <i class="text-black break-words dark:text-white">{msg}</i>
    <br>
{/if}
{#if success}
    <a href="/session/{id}/admin" class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900">visit session admin page</a>
    <br>
    <a href="/session/{id}/view" class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900">visit presenter page</a>
    <br>
    <a href="/session/{id}" class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900">submit questions</a>
{/if}
<MetaTags
    title={`New - Quack`}
    description={`New Session - Quack`}
    openGraph={{
        title: `New - Quack`,
        description: `New Session - Quack`,
        site_name: 'Quack',
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: `New - Quack`,
    description: `New Session - Quack`,
  }}
/>
