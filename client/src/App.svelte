<script>
  import router from 'page';
  import { currentPath } from './stores/currentPathStore.js';  // Import the store
  import Home from "./pages/Home.svelte";
  import Header from "./components/Header.svelte";
  import ProductDetail from "./pages/ProductDetail.svelte";
  import AdminDashboard from "./pages/AdminDashboard.svelte";


  let page;
  let params;



  router('/', (ctx) => {
    page = Home;
    currentPath.set(ctx.pathname);
  });

  router('/laptops/:id', (ctx) => {
    page = ProductDetail;
    params = ctx.params;
    currentPath.set(ctx.pathname);
  });

  router('/admin', (ctx) => {
    page = AdminDashboard;
    params = ctx.params;
    currentPath.set(ctx.pathname);
  });



  router.start();
</script>

<main>
  <Header />
  <svelte:component this={page} {params} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 5px;
    margin: 0 auto;
  }


</style>
