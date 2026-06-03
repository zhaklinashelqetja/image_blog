<script>
  let { data } = $props();
  let images = data.images;
</script>

<svelte:head>
  <title>ImageBlog – Discover Photos</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] text-white">

  <section class="relative border-b border-[#1e1e2e] bg-[#0d0d17] overflow-hidden">

    <div class="absolute  -left-25 w-100 h-100 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-20 -right-20 w-75 h-75 bg-violet-800/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto px-6 py-24">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-10">

        <div class="max-w-xl">
          <div class="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-3 py-1.5 mb-6">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span class="text-zinc-500 text-xs">Community feed</span>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-5">
            Discover<br />
            <span class="text-violet-400">beautiful</span><br />
            photography
          </h1>
          <p class="text-zinc-500 text-base leading-relaxed mb-8 max-w-sm">
            The best photos from our community, curated and ranked by your upvotes.
          </p>

          <div class="flex items-center gap-3">
            
              <a href="/register"
              class="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-600
                     active:scale-95 text-white font-semibold px-6 py-3 rounded-xl
                     text-sm transition-all duration-150"
            >
              <span>📸</span>
              Start sharing
            </a>
            
             <a  href="/login"
              class="inline-flex items-center gap-2 bg-[#111120] border border-[#1e1e2e]
                     hover:border-zinc-700 text-zinc-400 hover:text-white
                     font-medium px-6 py-3 rounded-xl text-sm transition-all"
            >
              Sign in
            </a>
          </div>
        </div>

        <div class="hidden md:grid grid-cols-2 gap-3 w-64 shrink-0">
          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center">
            <p class="text-white font-bold text-2xl">12k+</p>
            <p class="text-zinc-600 text-xs mt-1">Photos</p>
          </div>
          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center">
            <p class="text-white font-bold text-2xl">4k+</p>
            <p class="text-zinc-600 text-xs mt-1">Creators</p>
          </div>
          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl p-5 text-center col-span-2">
            <p class="text-white font-bold text-2xl">80k+</p>
            <p class="text-zinc-600 text-xs mt-1">Upvotes given</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section class="max-w-6xl mx-auto px-6 py-12">

    <div class="flex items-center justify-between mb-8">
      <h2 class="text-white font-semibold text-lg">Top photos</h2>
      <span class="text-zinc-600 text-sm">{images.length} photos</span>
    </div>

    {#if images.length === 0}
      <div class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center text-3xl mb-4">
          📸
        </div>
        <p class="text-zinc-400 font-medium mb-1">No photos yet</p>
        <p class="text-zinc-700 text-sm">Be the first to upload something beautiful.</p>
        
          <a href="/register"
          class="mt-6 bg-violet-700 hover:bg-violet-600 text-white text-sm
                 font-semibold px-6 py-3 rounded-xl transition-all active:scale-95"
        >
          Upload a photo
        </a>
      </div>

    {:else}
      <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {#each images as img (img.id)}
          
            <a href="/image/{img.id}"
            class="block mb-4 break-inside-avoid group relative overflow-hidden
                   rounded-2xl border border-[#1e1e2e] bg-[#0d0d17]
                   hover:border-violet-600/40 hover:shadow-lg hover:shadow-violet-900/20
                   transition-all duration-300"
          >
            <img
              src={img.image}
              alt={img.description || 'Photo'}
              class="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            <div class="absolute inset-0 bg-linear-to-t from-[#080810]/95 via-[#080810]/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex flex-col justify-end p-4">
              {#if img.description}
                <p class="text-white text-sm font-medium line-clamp-2 mb-2">
                  {img.description}
                </p>
              {/if}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-5 h-5 rounded-full bg-violet-900 flex items-center justify-center text-violet-300 text-[9px] font-bold">
                    {img.author[0].toUpperCase()}
                  </div>
                  <span class="text-zinc-400 text-xs">@{img.author}</span>
                </div>
                <div class="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2a2a45]
                            rounded-full px-2.5 py-1">
                  <span class="text-xs">❤️</span>
                  <span class="text-white text-xs font-semibold">{img.votes}</span>
                </div>
              </div>
            </div>

            <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-[#080810]/80
                        backdrop-blur-sm border border-[#1e1e2e] rounded-full px-2.5 py-1
                        group-hover:opacity-0 transition-opacity">
              <span class="text-xs">❤️</span>
              <span class="text-white text-xs font-semibold">{img.votes}</span>
            </div>

          </a>
        {/each}
      </div>
    {/if}

  </section>

  <footer class="border-t border-[#1e1e2e] bg-[#0d0d17]">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-violet-600"></div>
        <span class="text-white font-bold">ImageBlog</span>
      </div>
      <p class="text-zinc-700 text-xs">
        &copy; {new Date().getFullYear()} ImageBlog. All rights reserved.
      </p>
    </div>
  </footer>

</div>