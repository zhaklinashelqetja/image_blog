<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  let voted = $state(false);
  let voteCount = $state(0);

</script>

<svelte:head>
  <title>{data.image.description || 'Photo'} – ImageBlog</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] text-white">
  <div class="max-w-5xl mx-auto px-6 py-6">

    <a href="/" class="text-zinc-500 hover:text-white text-sm mb-4 inline-block transition-colors">
      &larr; Back to feed
    </a>

    <div class="flex flex-col lg:flex-row gap-4">

      <div class="flex-1">
        <div class="rounded-2xl overflow-hidden border border-[#1e1e2e] bg-[#0d0d17]">
          <img src={data.image.image} alt={data.image.description || 'Photo'} class="w-full object-contain max-h-[70vh]" />
        </div>
      </div>

      <div class="w-full lg:w-72 flex flex-col gap-3">

        <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-violet-900 rounded-xl flex items-center justify-center text-violet-300 text-sm font-bold">
              {data.image.author[0].toUpperCase()}
            </div>
            <div>
              <a href="/profile/{data.image.author}" class="text-white text-sm font-medium hover:text-violet-400 transition-colors">
                @{data.image.author}
              </a>
              <p class="text-zinc-600 text-xs mt-0.5">
                {new Date(data.image.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          {#if data.image.description}
            <p class="text-zinc-300 text-sm leading-relaxed">{data.image.description}</p>
          {/if}
        </div>

        <form method="POST" action="?/vote" use:enhance={() => {
          return ({ result }) => {
            if (result.type === 'success') { voted = true; voteCount += 1; }
          };
        }}>
          <button type="submit" disabled={!data.user || voted}
            class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold text-sm transition-all
            {voted ? 'bg-violet-900/40 border-violet-700/40 text-violet-300 cursor-default'
            : data.user ? 'bg-[#0d0d17] border-[#1e1e2e] hover:border-violet-600/50 text-white'
            : 'bg-[#0d0d17] border-[#1e1e2e] text-zinc-600 cursor-not-allowed'}"
          >
            <span>❤️</span>
            <span>{voteCount} {voted ? 'Voted' : 'Upvote'}</span>
          </button>
        </form>

        {#if !data.user}
          <p class="text-zinc-600 text-xs text-center -mt-1">
            <a href="/login" class="text-violet-400 hover:underline">Sign in</a> to upvote
          </p>
        {/if}

        <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-4">
          <h2 class="text-white font-semibold text-sm mb-3">
            Comments <span class="text-zinc-600 font-normal">({data.comments.length})</span>
          </h2>

          {#if form?.error}
            <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-2 mb-3 text-xs">
              {form.error}
            </div>
          {/if}

          {#if data.user}
            <form method="POST" action="?/comment" use:enhance class="mb-3">
              <textarea name="text" rows="2" placeholder="Write a comment..."
                class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-3 py-2
                       text-zinc-200 placeholder-zinc-700 text-sm resize-none
                       focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15
                       hover:border-zinc-700 transition-all"
              ></textarea>
              <button type="submit"
                class="mt-1.5 w-full bg-violet-700 hover:bg-violet-600 active:scale-95
                       text-white font-semibold rounded-xl py-2 text-sm transition-all"
              >
                Post comment
              </button>
            </form>
          {:else}
            <p class="text-zinc-600 text-sm mb-3">
              <a href="/login" class="text-violet-400 hover:underline">Sign in</a> to comment
            </p>
          {/if}

          <div class="space-y-2 max-h-72 overflow-y-auto">
            {#each data.comments as c (c.id)}
              <div class="bg-[#080810] border border-[#1e1e2e] rounded-xl p-2.5">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-5 h-5 rounded-lg bg-violet-900 flex items-center justify-center text-violet-300 text-[9px] font-bold">
                    {c.username[0].toUpperCase()}
                  </div>
                  <span class="text-zinc-400 text-xs font-medium">@{c.username}</span>
                  <span class="text-zinc-700 text-xs ml-auto">
                    {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p class="text-zinc-300 text-sm leading-relaxed">{c.text}</p>
              </div>
            {/each}

            {#if data.comments.length === 0}
              <p class="text-zinc-700 text-sm text-center py-4">No comments yet</p>
            {/if}
          </div>
        </div>

      </div>
    </div>
  </div>

  <footer class="border-t border-[#1e1e2e] bg-[#0d0d17] mt-8">
    <div class="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-violet-600"></div>
        <span class="text-white font-bold">ImageBlog</span>
      </div>
      <p class="text-zinc-700 text-xs">&copy; {new Date().getFullYear()} ImageBlog. All rights reserved.</p>
    </div>
  </footer>
</div>