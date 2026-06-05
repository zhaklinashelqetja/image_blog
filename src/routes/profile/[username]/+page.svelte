<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>@{data.profileUser.username} – ImageBlog</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] text-white">
  <section class="border-b border-[#1e1e2e] bg-[#0d0d17]">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div class="flex items-center gap-5">
          <div class="w-20 h-20 rounded-3xl bg-violet-900 border border-violet-700/30 flex items-center justify-center text-violet-300 text-3xl font-bold shrink-0">
            {data.profileUser.username[0].toUpperCase()}
          </div>

          <div>
            <div class="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-3 py-1 mb-2">
              <div class="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
              <span class="text-zinc-500 text-xs">Creator</span>
            </div>

            <h1 class="text-2xl font-bold text-white">@{data.profileUser.username}</h1>

            <p class="text-zinc-600 text-xs mt-1">Member since {new Date(data.profileUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div class="flex gap-3">

          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl px-8 py-5 text-center">
            <p class="text-white font-bold text-2xl">{data.images.length}</p>
            <p class="text-zinc-600 text-xs mt-1">Photos</p>
          </div>

          <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl px-8 py-5 text-center">
            <p class="text-white font-bold text-2xl">{data.images.reduce((sum, img) => sum + img.votes, 0)}</p>
            <p class="text-zinc-600 text-xs mt-1">Votes</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="max-w-5xl mx-auto px-6 py-10">

    <div class="mb-6">
      <a href="/" class="text-sm text-zinc-500 hover:text-white transition-colors">
        ← Back to Feed
      </a>
    </div>

    <div class="flex items-center justify-between mb-8">
      <h2 class="text-white font-semibold">All photos</h2>
      <span class="text-zinc-700 text-sm">{data.images.length} total</span>
    </div>

    {#if data.images.length === 0}

      <div class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-14 h-14 bg-[#1a1a2e] rounded-2xl flex items-center justify-center text-2xl mb-4">
          📸
        </div>
        <p class="text-zinc-400 font-medium mb-1">No photos yet</p>
        <p class="text-zinc-700 text-sm">This creator hasn't uploaded anything yet.</p>
      </div>

    {:else}

      <div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {#each data.images as img (img.id)}
          <a href="/image/{img.id}" class="block mb-4 break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#1e1e2e] bg-[#0d0d17] hover:border-violet-600/40 hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300">

            <img src={img.image} alt={img.description || 'Photo'} class="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
            <div class="absolute inset-0 bg-linear-to-t from-[#080810]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              {#if img.description}
                <p class="text-white text-sm font-medium line-clamp-2 mb-2">
                  {img.description}
                </p>
              {/if}
              <div class="flex items-center justify-between">

                <span class="text-zinc-500 text-xs">
                  {new Date(img.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>

                <div class="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-2.5 py-1">
                  <span class="text-xs">❤️</span>
                  <span class="text-white text-xs font-semibold">{img.votes}</span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>
</div>