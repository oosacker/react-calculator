const keypad = [
  ["AC", "+/−", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "=", ""],
];

function App() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 text-slate-100">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-200">
            React
          </p>
          <h1 className="text-3xl font-semibold text-white">Calculator</h1>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-white/20">
          Tailwind Ready
        </span>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl bg-slate-900/60 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Preview</span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/80 p-6 shadow-inner ring-1 ring-black/40">
              <div className="mb-4 flex items-center justify-between text-slate-300">
                <span className="text-sm">History</span>
                <span className="text-xs font-semibold text-emerald-300">
                  Live
                </span>
              </div>
              <div className="mb-6 rounded-lg bg-slate-900/80 px-3 py-4 text-right text-5xl font-semibold tracking-tight text-white ring-1 ring-white/10">
                128.42
              </div>
              <div className="grid grid-cols-4 gap-3">
                {keypad.flat().map((label, idx) =>
                  label ? (
                    <button
                      key={`${label}-${idx}`}
                      type="button"
                      className="rounded-lg bg-slate-800/80 px-4 py-3 text-lg font-semibold text-white shadow-sm ring-1 ring-white/5 transition hover:-translate-y-[1px] hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      {label}
                    </button>
                  ) : (
                    <span key={`spacer-${idx}`} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">
            Ready for Tailwind
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            Tailwind CSS is installed, configured for Vite, and ready to style
            your components. Start by editing this component or create new ones
            inside <span className="font-semibold text-white">src/</span> — any
            class you use will be generated automatically.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-200">
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              Tailwind directives added in{" "}
              <span className="font-semibold text-white">src/index.css</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              Content paths set in{" "}
              <span className="font-semibold text-white">
                tailwind.config.js
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              PostCSS pipeline wired with Tailwind and Autoprefixer
            </li>
          </ul>
          <div className="mt-6 rounded-xl bg-slate-900/70 px-4 py-3 text-xs text-slate-200 ring-1 ring-white/10">
            Run <span className="font-semibold text-white">yarn dev</span> to
            start the dev server.
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
