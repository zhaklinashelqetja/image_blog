<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Login – ImageBlog</title>
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
          <p class="text-[#e4e4f0] text-xl font-light leading-relaxed mb-6">
            "The place where <span class="text-violet-400 font-medium">great photography</span> finds its audience."
          </p>
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
          <div class="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
          <span class="text-zinc-500 text-xs">Members area</span>
        </div>

        <h1 class="text-white text-2xl font-bold mb-1">Welcome back</h1>
        <p class="text-zinc-600 text-sm mb-7">Sign in to continue sharing your world.</p>

        {#if form?.error}
          <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 mb-5 text-xs">
            {form.error}
          </div>
        {/if}

        <form method="POST" action="?/login" class="space-y-4">

          <div>
            <label class="block text-zinc-500 text-xs uppercase mb-2">Username</label>
            <input
              name="username"
              type="text"
              required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white text-sm"
            />
          </div>

          <div>
            <label class="block text-zinc-500 text-xs uppercase mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-xl py-3 text-sm"
          >
            Sign in
          </button>

        </form>

        <div class="flex items-center gap-3 my-5">
          <div class="flex-1 h-px bg-[#1e1e2e]"></div>
          <span class="text-zinc-700 text-xs">or</span>
          <div class="flex-1 h-px bg-[#1e1e2e]"></div>
        </div>

        <a
          href="/register"
          class="block text-center bg-[#111120] border border-[#1e1e2e] text-zinc-400 hover:text-white rounded-xl py-3 text-sm"
        >
          Create an account
        </a>

      </div>
    </div>
  </div>
</div>