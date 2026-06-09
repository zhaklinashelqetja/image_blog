<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  let user = $derived(data.user);
  let images = $derived(data.images);
</script>

<svelte:head>
  <title>Dashboard – ImageBlog</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] text-white">

  <section class="border-b border-[#1e1e2e] bg-[#0d0d17]">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-violet-900 border border-violet-700/30 flex items-center justify-center text-violet-300 text-2xl font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div class="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-3 py-1 mb-1">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span class="text-zinc-500 text-xs">Dashboard</span>
            </div>
            <h1 class="text-xl font-bold text-white">@{user.username}</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          
            <a href="/profile/{user.username}"
            class="bg-[#111120] border border-[#1e1e2e] hover:border-zinc-700
                   text-zinc-400 hover:text-white px-4 py-2 rounded-xl text-sm transition-all">
            View Profile
          </a>
          <a href="/" class="text-zinc-500 hover:text-white text-sm transition-colors">
            &larr; Back to feed
          </a>
        </div>
      </div>

      <div class="flex gap-4 mt-8">
        <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl px-6 py-4 text-center">
          <p class="text-white font-bold text-xl">{images.length}</p>
          <p class="text-zinc-600 text-xs mt-1">Photos</p>
        </div>
        <div class="bg-[#111120] border border-[#1e1e2e] rounded-2xl px-6 py-4 text-center">
          <p class="text-white font-bold text-xl">
            {images.reduce((sum, img) => sum + img.votes, 0)}
          </p>
          <p class="text-zinc-600 text-xs mt-1">Total votes</p>
        </div>
      </div>
    </div>
  </section>

  <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">

    <div class="w-full lg:w-80 shrink-0">
      <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-6 sticky top-6">
        <h2 class="text-white font-semibold mb-5">Upload Photo</h2>

        {#if form?.error}
          <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 mb-4 text-xs">
            {form.error}
          </div>
        {/if}

        {#if form?.success}
          <div class="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 mb-4 text-xs">
            Photo uploaded successfully!
          </div>
        {/if}

        <form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance class="space-y-4">
          <div>
            <label for="image" class="block text-zinc-500 text-xs uppercase tracking-widest mb-2">
              Image
            </label>
            <input id="image" type="file" name="image" accept="image/*" required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3
                     text-zinc-400 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0
                     file:bg-violet-700 file:text-white file:text-xs file:font-medium hover:border-zinc-700 transition-all"/>
          </div>

          <div>
            <label for="description" class="block text-zinc-500 text-xs uppercase tracking-widest mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Write something about your photo..."
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3
                     text-zinc-200 placeholder-zinc-700 text-sm resize-none
                     focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15
                     hover:border-zinc-700 transition-all"></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-violet-700 hover:bg-violet-600 active:scale-95
                   text-white font-semibold rounded-xl py-3 text-sm transition-all">Upload Photo
          </button>
        </form>
      </div>
    </div>

    <div class="flex-1">

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-white font-semibold text-lg">Your Photos</h2>
        <span class="text-zinc-600 text-sm">{images.length} total</span>
      </div>

      {#if images.length === 0}
        <div class="text-center py-32 bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl">
          <div class="w-14 h-14 bg-[#1a1a2e] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            📸
          </div>
          <p class="text-zinc-400 font-medium mb-1">No photos yet</p>
          <p class="text-zinc-700 text-sm">Upload your first photo to get started.</p>
        </div>

      {:else}
        <div class="columns-1 sm:columns-2 xl:columns-3 gap-4">
          {#each images as img (img.id)}
            <div class="mb-4 break-inside-avoid group relative overflow-hidden
                       rounded-2xl border border-[#1e1e2e] bg-[#0d0d17]
                       hover:border-violet-600/40 transition-all duration-300">

              <a href="/images/{img.id}">
                <img
                  src={img.image}
                  alt={img.description || 'Photo'}
                  class="w-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              </a>

              <div class="p-4 border-t border-[#1e1e2e]">
                {#if img.description}
                  <p class="text-zinc-400 text-xs line-clamp-2 mb-3">{img.description}</p>
                {/if}
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-2.5 py-1">
                    <span class="text-xs">❤️</span>
                    <span class="text-white text-xs font-semibold">{img.votes}</span>
                  </div>
                  <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="imageId" value={img.id} />
                    <button type="submit"
                      class="bg-red-500/10 hover:bg-red-500/30 border border-red-500/20
                             text-red-400 text-xs font-medium px-3 py-1.5 rounded-lg transition-all">Delete
                    </button>
                  </form>
                </div>
              </div>

            </div>
          {/each}
        </div>
      {/if}
    </div>

  </div>

  <footer class="border-t border-[#1e1e2e] bg-[#0d0d17]">
    <div class="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-violet-600"></div>
        <span class="text-white font-bold">ImageBlog</span>
      </div>
      <p class="text-zinc-700 text-xs">&copy; {new Date().getFullYear()} ImageBlog. All rights reserved.</p>
    </div>
  </footer>

</div>