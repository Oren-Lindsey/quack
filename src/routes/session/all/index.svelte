<script>
    export let sessions
    import { page } from '$app/stores';
    let msg = ""
    import { fly } from 'svelte/transition'
    async function refresh() {
        try {
            msg = "loading..."
            const res = await fetch(`/session/all/`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            const data = await res.json()
            sessions = data.sessions
            msg = ""
        } catch (err) {
            msg = `couldn't load sessions, please try again later`
        }
    }
    setInterval(async () => {
        await refresh()
    }, 10000);
</script>
<h1 class="text-xl p-2">All sessions</h1>
<button class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-900" on:click={refresh}>refresh</button>
<p>{msg}</p>
{#key sessions}
    <ul>
    {#each sessions.slice(0, Math.pow(10, 1000)) as session}
        <li><div class="transition ease-in-out delay-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900" in:fly={{ x: 5, duration: 200, delay: 200 }} out:fly={{ x: -5, duration: 200 }}>
            <b>{session.name}</b> 
            <br>
            <a class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-900" href={`${$page.url.origin}/session/${session._id}/admin/`}>(Link to admin page)</a> <a class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-900" href={`${$page.url.origin}/session/${session._id}/view/`}>(Link to presenter page)</a> <a class="transition ease-in-out delay-50 p-2 my-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-900" href={`${$page.url.origin}/session/${session._id}/`}>(Link to questions page)</a>
            <br>
            <i class="text-gray-500">ID: {session._id}</i>
        </div></li>
    {/each}
    </ul>
{/key}
