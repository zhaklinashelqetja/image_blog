<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Register – ImageBlog</title>
</svelte:head>

<div class="min-h-screen bg-[#080810] flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-3xl">
    <div class="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#1e1e2e]">
      <div class="flex-1 bg-[#100f1a] p-10 flex flex-col justify-between gap-10">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-violet-600"></div>
          <span class="text-white font-bold text-lg">ImageBlog</span>
        </div>

        <div>
          <p class="text-[#e4e4f0] text-xl font-light leading-relaxed mb-6">"The most
            <span class="text-violet-400 font-medium">beautiful way</span>to share photography I've ever used."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-violet-950 flex items-center justify-center text-violet-400 text-xs font-bold">MK
            </div>
            <div>
              <p class="text-white text-sm font-medium">Maria K.</p>
              <p class="text-zinc-600 text-xs mt-0.5">Photographer, Vienna</p>
            </div>
          </div>
        </div>

        <div class="flex gap-8">
          <div>
            <p class="text-white font-bold text-xl">12k+</p>
            <p class="text-zinc-600 text-xs mt-1">Photos shared</p>
          </div>
          <div>
            <p class="text-white font-bold text-xl">4k+</p>
            <p class="text-zinc-600 text-xs mt-1">Creators</p>
          </div>
          <div>
            <p class="text-white font-bold text-xl">80k+</p>
            <p class="text-zinc-600 text-xs mt-1">Upvotes</p>
          </div>
        </div>

      </div>

      <div class="w-full md:w-85 bg-[#0d0d17] p-8 flex flex-col justify-center">

        <div class="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-3 py-1.5 mb-6 w-fit">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span class="text-zinc-500 text-xs">Open to new members</span>
        </div>

        <h1 class="text-white text-2xl font-bold leading-tight mb-1">Create your<br />account</h1>
        <p class="text-zinc-600 text-sm mb-7">Join thousands of creators sharing their world.</p>

        {#if form?.error}
          <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 mb-5 text-xs">
            {form.error}
          </div>
        {/if}

        <form action="?/register" method="POST" class="space-y-4">

          <div>
            <label for="username" class="block text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Username</label>
            <input id="username" type="text" name="username" placeholder="your_username" required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15 hover:border-zinc-700 transition-all"/></div>

          <div>
            <label for="email" class="block text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Email</label>
            <input id="email" type="email" name="email" placeholder="you@example.com" required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15  hover:border-zinc-700 transition-all"/></div>

          <div>
            <label for="password" class="block text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2"> Password</label>
            <input id="password" type="password" name="password" placeholder="Min. 8 characters" required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15  hover:border-zinc-700 transition-all"/></div>

          <button type="submit"
            class="w-full bg-violet-700 hover:bg-violet-600 active:scale-95 text-white font-semibold rounded-xl py-3 text-sm transition-all duration-150 mt-1">Create account </button>
        </form>

        <div class="flex items-center gap-3 my-5">
          <div class="flex-1 h-px bg-[#1e1e2e]"></div>
          <span class="text-zinc-700 text-xs">or</span>
          <div class="flex-1 h-px bg-[#1e1e2e]"></div>
        </div>

          <a href="/login"
          class="block w-full text-center bg-[#111120] border border-[#1e1e2e] hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 rounded-xl py-3 text-sm transition-all">Sign in instead</a>
      </div>
    </div>

  </div>
</div>