<script>
    import { onMount } from 'svelte';
    export let params;

    onMount(() => {
        const queryParams = new URLSearchParams(params.querystring);
        if (queryParams.has("dit")) {
            console.log(queryParams.get('dit'));
        } else{
            console.log("`dit` not found");
        }
        console.log(params);
        console.log(queryParams)
    });
</script>

<h1>About</h1>

<p>This page shows the use of query parameters on the client side. In <code>App.svelte</code> you can find the following code</p>
<p>
    <code>
        router('/about', (ctx) => &lcub;<br>
        page = About;<br>
        currentRoute = ctx.pathname;<br>
        params = ctx;<br>
        &rcub;);
    </code>
</p>
<p>
    the <code>params = ctx;</code> part stores the routing context in the params variable.
</p>
<p>
    This variable is then passed into the component that is called for the page which is <code>About</code>
</p>
<p>
    Inside <code>About</code> the value can be read from the <code>params</code> like so <code>params.querystring</code>.
</p>
<p>
    It can be used to populate a <code>URLSearchParams</code> object.
</p>
<p>
    <code>
        const queryParams = new URLSearchParams(params.querystring);
    </code>
</p>
<p>
    The manual for <code>URLSearchParams</code> can be found <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams">here</a>.
</p>

<style>
    p {
        text-align: left;
    }
</style>
