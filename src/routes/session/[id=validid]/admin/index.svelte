<script>
    import { page } from '$app/stores';
    export let questions
    let msg = ""
    export let session
    import { fly } from 'svelte/transition'
    async function refresh() {
        try {
            msg = "loading..."
            const res = await fetch(`/session/${session._id}/admin`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            const data = await res.json()
            questions = data.questions
            msg = ""
        } catch (err) {
            msg = `couldn't load questions, please try again later`
        }
    }
    setInterval(async () => {
        await refresh()
    }, 20000);
    const url = `${$page.url.origin}/s/${session.name}`
    const viewer = `${$page.url.origin}/session/${session._id}/view`
    async function update(e) {
        const formData = new FormData(e.target);
        const parsed = await parseFormData(formData);
        const msg = document.getElementById(`msg-${parsed.id}`)
        const checked = document.getElementById(`${parsed.id}-hidden`).checked // a little bit of a hacky way of doing things but there's no other way that i can see
        const data = {
            _id: parsed.id,
            checked: checked,
            content: parsed.content
        }
        msg.innerText = 'updating...'
        const res = await fetch(`/session/${session._id}/question/${data._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        msg.innerText = 'updated!'
        setTimeout(async () => {
            msg.innerText = "";
            refresh()
        }, 500)
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
<h1 class="text-xl p-2">Admin page ("{session.name}")</h1>
<b class="text-black dark:text-white">Link to send in questions:</b> <b class="text-black underline decoration-cyan-500 decoration-2 decoration-wavy select-all hover:decoration-dotted dark:text-white">{url}</b>
<br>
<a class="transition ease-in-out delay-50 p-2 my-4 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900" href={url}>Send in questions</a>
<a class="transition ease-in-out delay-50 p-2 my-4 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900" href={viewer}>Presenter view</a>
<br>
{#if questions.length > 0}
<p class="pb-4">{questions.length} {#if questions.length > 1}questions{:else}question{/if}</p>
{:else}
<p class="pb-4">No questions yet!</p>
{/if}
<button class="transition ease-in-out delay-50 p-2 mb-4 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:bg-slate-1000 dark:hover:bg-slate-900" on:click={refresh}>refresh</button> <i class="text-gray-500">{msg}</i>
{#key questions}
    {#each questions.slice(0, Math.pow(10, 1000)) as question}
        {@const id = question._id}
        <div in:fly={{ x: 5, duration: 200, delay: 200 }} out:fly={{ x: -5, duration: 200 }}>
            <form id={id} name={id} on:submit|preventDefault={update} class="transition ease-in-out delay-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900">
                <p class="text-black dark:text-white" id={`msg-${id}`}></p>
                <i class="text-gray-500">From IP address: <b>{question.ipAddress}</b></i>
                <textarea id="content" name="content" placeholder="content..." value={question.content} class="transition ease-in-out delay-50 shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl dark:bg-gray-900 dark:text-white" />
                <input hidden id="id" name="id" value={id} />
                <label for={`${id}-hidden`} class="dark:text-gray-500">hidden:</label> 
                <input type="checkbox" class="accent-cyan-500" name="hidden" id={`${id}-hidden`} checked={question.hidden} />
                <br>
                <button type="submit" class="mt-4 transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-800">update</button>
            </form>
            <br>
        </div>
    {/each}
{/key}
<!--
    you can put this transition on the div to make it fade in/out, i didn't want to because it doesn't look good
    in:fly={{ x: 5, duration: 200, delay: 200 }} out:fly={{ x: -5, duration: 200 }}
-->