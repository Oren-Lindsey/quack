<script>
    let name = "";
    let id = "";
    function redirect() {
        window.location.href = `/s/${name.toLowerCase()}`
    }
    function goToId() {
        window.location.href = `/session/${id}`
    }
</script>
<h1 class="text-xl p-2">Go to a session:</h1>
<div class="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
<form on:submit|preventDefault={redirect} class="transition ease-in-out delay-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900">
    <label for="name" class="text-gray-500">Session name:</label>
    <br>
    <input class="transition ease-in-out delay-50 shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl dark:bg-gray-900 dark:text-white" name="name" id="name" placeholder="name of session..." bind:value={name} />
    <br>
    <button class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-800" type="submit">Go</button>
</form>
<form on:submit|preventDefault={goToId} class="transition ease-in-out delay-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-xl dark:bg-slate-900">
    <label for="name" class="text-gray-500">Or, go to a session by id:</label>
    <br>
    <input class="transition ease-in-out delay-50 shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl dark:bg-gray-900 dark:text-white" name="name" id="name" placeholder="id of session..." bind:value={id} />
    <br>
    <button class="transition ease-in-out delay-50 p-2 rounded-md inline-block bg-yellow-500 shadow-lg hover:shadow-2xl hover:bg-yellow-400 dark:hover:bg-slate-800" type="submit">Go</button>
</form>
</div>