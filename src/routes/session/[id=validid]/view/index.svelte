<script>
    export let questions
    let msg = ""
    export let session
    import { fly } from 'svelte/transition'
    async function refresh() {
        try {
            msg = "loading..."
            const res = await fetch(`/session/${session._id}/view/`, {
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
    }, 10000);
</script>
<h1 class="p-2 text-xl">Questions in session: "{session.name}"</h1>
{#if questions.length > 0}
<p class="pt-4">{questions.length} {#if questions.length > 1}questions{:else}question{/if}</p>
{:else}
<p class="pt-4">No questions yet!</p>
{/if}
<button class="my-4 transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-700" on:click={refresh}>refresh</button>
<i class="text-gray-500">{msg}</i>
{#key questions}
    <ul>
    {#each questions.slice(0, Math.pow(10, 1000)) as question}
        <li><div class="transition ease-in-out delay-50 bg-white shadow-md max-w-xs rounded w-96 [min-width: 24rem] max-w-sm px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900 select-all" in:fly={{ x: 5, duration: 200, delay: 200 }} out:fly={{ x: -5, duration: 200 }}>{question.content}</div></li>
    {/each}
    </ul>
{/key}