<script>
	let { data } = $props();
	let images = data.images;
</script>

<svelte:head>
	<title>ImageBlog – Discover Photos</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] text-white">

  <section class="relative border-b border-[#1e1e2e] bg-[#0d0d17] overflow-hidden">

    <div class="absolute -left-25 w-100 h-100 bg-violet-600/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-20 -right-20 w-75 h-75 bg-violet-800/10 rounded-full blur-3xl"></div>

    <div class="relative max-w-6xl mx-auto px-6 py-24">

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-10">

        <div class="max-w-xl">

          <div class="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-3 py-1 mb-6">
            <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span class="text-xs text-zinc-500">Community feed</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-5">
            Discover<br />
            <span class="text-violet-400">beautiful</span><br />
            photography
          </h1>

          <p class="text-zinc-500 mb-8 max-w-sm">
            The best photos from our community, ranked by upvotes.
          </p>

          <div class="flex gap-3">

            <a href="/register"
              class="bg-violet-700 hover:bg-violet-600 px-6 py-3 rounded-xl font-semibold text-sm">
              📸 Start sharing
            </a>

            <a href="/login"
              class="bg-[#111120] border border-[#1e1e2e] px-6 py-3 rounded-xl text-sm text-zinc-400 hover:text-white">
              Sign in
            </a>

          </div>

        </div>

        <div class="hidden md:grid grid-cols-2 gap-3 w-64">

          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center">
            <div class="text-2xl font-bold">12k+</div>
            <div class="text-xs text-zinc-600">Photos</div>
          </div>

          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center">
            <div class="text-2xl font-bold">4k+</div>
            <div class="text-xs text-zinc-600">Creators</div>
          </div>

          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center col-span-2">
            <div class="text-2xl font-bold">80k+</div>
            <div class="text-xs text-zinc-600">Upvotes</div>
          </div>

        </div>

      </div>

    </div>

  </section>

  <section class="max-w-6xl mx-auto px-6 py-12">



    {#if images.length === 0}

      <div class="text-center py-32">
        📸
        <p class="text-zinc-400 mt-3">No photos yet</p>
        <a href="/register"
          class="inline-block mt-6 bg-violet-700 px-6 py-3 rounded-xl text-sm font-semibold">
          Upload
        </a>
      </div>

    {:else}

      <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">

        {#each images as img (img.id)}

          <a href="/image/{img.id}"
            class="block mb-4 break-inside-avoid group rounded-2xl border border-[#1e1e2e] bg-[#0d0d17] overflow-hidden hover:border-violet-600/40 transition">

            <img
              src={img.image}
              alt=""
              class="w-full object-cover group-hover:scale-105 transition"
            />

            <div class="flex justify-between p-4 text-xs">
              <span class="text-zinc-400">@{img.author}</span>
              <span>❤️ {img.votes}</span>
            </div>

          </a>

        {/each}

      </div>

    {/if}

  </section>

  <footer class="border-t border-[#1e1e2e] bg-[#0d0d17] text-center py-6 text-xs text-zinc-700">
    ImageBlog © {new Date().getFullYear()}
  </footer>

</div>