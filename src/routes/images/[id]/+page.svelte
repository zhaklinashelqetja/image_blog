<script>
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  let { data, form } = $props();

  let voted = $state(false);
  let voteCount = $state(0);
  let filter = $state('none');
  let saving = $state(false);
  let saveMsg = $state('');

  let canvas;
  let ctx;
  let drawing = false;
  let color = '#ff0000';
  let tool = 'pen';

  const filters = {
    none: '',
    vintage: 'sepia(0.5) contrast(1.2) brightness(0.9)',
    autumn: 'sepia(0.35) saturate(1.4) hue-rotate(15deg)',
    summer: 'saturate(1.6) brightness(1.1)',
    cold: 'contrast(1.1) saturate(0.8) hue-rotate(180deg)',
    noir: 'grayscale(1) contrast(1.3)',
    vignette: 'contrast(1.2) brightness(0.9) saturate(1.1)',
  };

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  onMount(() => {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  });

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e) {
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    const pos = getPos(e);
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 18;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
    }
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() { drawing = false; }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function saveChanges() {
    saving = true;
    saveMsg = '';

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = data.image.image;

    img.onload = async () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const offCtx = offscreen.getContext('2d');

      offCtx.filter = filters[filter] || 'none';
      offCtx.drawImage(img, 0, 0);
      offCtx.filter = 'none';
      offCtx.drawImage(canvas, 0, 0, offscreen.width, offscreen.height);

      offscreen.toBlob(async (blob) => {
        const fd = new FormData();
        fd.append('editedImage', blob, 'edited.png');

        const res = await fetch('?/saveEdit', {
          method: 'POST',
          body: fd
        });

        saving = false;
        if (res.ok) {
          saveMsg = 'Saved!';
          setTimeout(() => window.location.reload(), 800);
        } else {
          saveMsg = 'Error saving.';
        }
      }, 'image/png');
    };

    img.onerror = () => {
      saving = false;
      saveMsg = 'Could not load image.';
    };
  }
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

        <div class="relative rounded-2xl overflow-hidden border border-[#1e1e2e] bg-[#0d0d17]">
          <img
            src={data.image.image}
            alt={data.image.description || 'Photo'}
            class="w-full object-contain max-h-[70vh]"
            style={`filter: ${filters[filter]}`}
          />
          {#if data.user && data.user.id === data.image.author_id}
            <canvas
              bind:this={canvas}
              class="absolute top-0 left-0 w-full h-full cursor-crosshair"
              on:mousedown={startDraw}
              on:mousemove={draw}
              on:mouseup={stopDraw}
              on:mouseleave={stopDraw}
            />
          {/if}
        </div>

        {#if data.user && data.user.id === data.image.author_id}
          <div class="mt-4 mb-2 text-xs tracking-[0.2em] uppercase text-violet-400 font-semibold">
            Image Editor
          </div>

          <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-5 space-y-5">

            <div>
              <div class="text-xs text-zinc-400 mb-2">Filters</div>
              <div class="flex flex-wrap gap-2">
                {#each Object.keys(filters) as f}
                  <button
                    class="px-3 py-1.5 rounded-xl text-xs border transition-all duration-200 font-medium
                           {filter === f
                             ? 'bg-violet-700 border-violet-500 text-white'
                             : 'bg-[#111120] border-[#2a2a45] hover:bg-violet-700 hover:border-violet-500'}"
                    on:click={() => filter = f}
                  >
                    {f}
                  </button>
                {/each}
              </div>
            </div>

            <div class="pt-2 border-t border-[#1e1e2e]">
              <div class="text-xs text-zinc-400 mb-2">Drawing Tools</div>
              <div class="flex items-center gap-2 flex-wrap">
                <input type="color" bind:value={color}
                  class="w-11 h-9 rounded-lg border border-[#2a2a45] bg-transparent cursor-pointer" />
                <button
                  class="px-4 py-2 rounded-xl text-sm font-medium border transition
                         {tool === 'pen' ? 'bg-violet-700 border-violet-500' : 'bg-[#111120] border-[#2a2a45] hover:bg-violet-700'}"
                  on:click={() => tool = 'pen'}>
                  Pen
                </button>
                <button
                  class="px-4 py-2 rounded-xl text-sm font-medium border transition
                         {tool === 'eraser' ? 'bg-violet-700 border-violet-500' : 'bg-[#111120] border-[#2a2a45] hover:bg-violet-700'}"
                  on:click={() => tool = 'eraser'}>
                  Eraser
                </button>
                <button
                  class="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-300
                         border border-red-500/30 hover:bg-red-500/20 transition"
                  on:click={clearCanvas}>
                  Clear
                </button>
              </div>
            </div>

            <div class="pt-2 border-t border-[#1e1e2e] flex items-center gap-3">
              <button
                on:click={saveChanges}
                disabled={saving}
                class="flex-1 bg-violet-700 hover:bg-violet-600 active:scale-95
                       text-white font-semibold rounded-xl py-3 text-sm transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {#if saveMsg}
                <span class="text-xs {saveMsg === 'Saved!' ? 'text-green-400' : 'text-red-400'}">
                  {saveMsg}
                </span>
              {/if}
            </div>

          </div>
        {/if}

      </div>

      <div class="w-full lg:w-72 flex flex-col gap-3">

        <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-violet-900 rounded-xl flex items-center justify-center text-violet-300 text-sm font-bold">
              {data.image.author[0].toUpperCase()}
            </div>
            <div>
              <a href="/profile/{data.image.author}" class="text-white text-sm font-medium hover:text-violet-400">
                @{data.image.author}
              </a>
              <p class="text-zinc-600 text-xs mt-0.5">
                {new Date(data.image.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {#if data.image.description}
            <p class="text-zinc-300 text-sm">{data.image.description}</p>
          {/if}
        </div>

        <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-4">
          <div class="text-xs text-zinc-400 mb-2">Reactions</div>
          <form method="POST" action="?/vote" use:enhance={() => {
            return ({ result }) => {
              if (result.type === 'success') { voted = true; voteCount += 1; }
            };
          }}>
            <button type="submit" disabled={!data.user || voted}
              class="w-full py-2.5 rounded-xl font-semibold text-sm transition-all border
              {voted ? 'bg-violet-900/40 border-violet-700/40 text-violet-300'
              : data.user ? 'bg-[#111120] border-[#2a2a45] hover:bg-violet-700 text-white'
              : 'bg-[#111120] border-[#2a2a45] text-zinc-600 cursor-not-allowed'}"
            >
              ❤️ {voteCount} {voted ? 'Voted' : 'Vote'}
            </button>
          </form>
          {#if !data.user}
            <p class="text-zinc-600 text-xs mt-2">Login required to vote</p>
          {/if}
        </div>

        <div class="bg-[#0d0d17] border border-[#1e1e2e] rounded-2xl p-4">
          <div class="text-xs text-zinc-400 mb-2">Comments ({data.comments.length})</div>

          {#if data.user}
            <form method="POST" action="?/comment" use:enhance class="mb-3">
              <textarea name="text" rows="2" placeholder="Write a comment..."
                class="w-full bg-[#080810] border border-[#1e1e2e] rounded-xl p-2 text-sm
                       focus:outline-none focus:border-violet-600 transition-all resize-none
                       placeholder-zinc-700 text-zinc-200"
              ></textarea>
              <button class="w-full mt-2 bg-violet-700 hover:bg-violet-600 py-2 rounded-xl text-sm font-semibold transition-all">
                Post
              </button>
            </form>
          {:else}
            <p class="text-zinc-600 text-sm mb-3">Login required to comment</p>
          {/if}

          <div class="space-y-2 max-h-60 overflow-y-auto">
            {#each data.comments as c (c.id)}
              <div class="bg-[#080810] border border-[#1e1e2e] rounded-xl p-2.5">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-5 h-5 rounded-lg bg-violet-900 flex items-center justify-center text-violet-300 text-[9px] font-bold">
                    {c.username[0].toUpperCase()}
                  </div>
                  <span class="text-zinc-400 text-xs font-medium">@{c.username}</span>
                </div>
                <p class="text-zinc-300 text-sm">{c.text}</p>
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