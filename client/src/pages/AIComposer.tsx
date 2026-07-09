import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { dummyGenerationData } from '../assets/assets'

const TONES = ['Professional', 'Creative', 'Funny', 'Minimalist', 'Excited']

const AIComposer = () => {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('Professional')
  const [aiImage, setAiImage] = useState(true)
  const [result, setResult] = useState<(typeof dummyGenerationData)[number] | null>(null)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    // simulate generation using existing sample data
    const sample = dummyGenerationData[Math.floor(prompt.length % dummyGenerationData.length)]
    setResult({ ...sample, prompt, tone })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h2 className="text-center text-3xl font-semibold text-slate-800 sm:text-4xl">
        What should we create today?
      </h2>

      {/* prompt box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)"
          className="w-full resize-none bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
        />
        <div className="mt-4 flex items-center justify-end gap-4">
          {/* AI image toggle */}
          <button
            onClick={() => setAiImage((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            AI Image
            <span
              className={`relative h-6 w-11 rounded-full transition-colors ${
                aiImage ? 'bg-red-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                  aiImage ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* tone chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {TONES.map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              tone === t
                ? 'border-transparent bg-red-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* generated result */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
              {result.tone}
            </span>
            <span className="text-sm text-slate-400">Generated draft</span>
          </div>
          {result.mediaUrl && (
            <img
              src={result.mediaUrl}
              alt="Generated media"
              className="mb-4 max-h-72 w-full rounded-xl object-cover"
            />
          )}
          <p className="whitespace-pre-line text-slate-700">{result.content}</p>
        </div>
      )}
    </div>
  )
}

export default AIComposer;
