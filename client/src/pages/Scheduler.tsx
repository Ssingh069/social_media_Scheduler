import { useState } from 'react'
import { CalendarClock, Send, ImagePlus } from 'lucide-react'
import { dummyPostsData, PLATFORMS, getPlatform } from '../assets/assets'

const MAX_CHARS = 280

const Scheduler = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [scheduledFor, setScheduledFor] = useState('')

  const togglePlatform = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const upcoming = dummyPostsData.filter((p: { status: string }) => p.status === 'scheduled')
  const published = dummyPostsData.filter((p: { status: string }) => p.status === 'published')

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* compose */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
        <h3 className="text-xl font-semibold text-slate-800">Compose Post</h3>

        {/* platforms */}
        <p className="mt-6 mb-3 text-xs uppercase tracking-wider text-slate-400">Platforms</p>
        <div className="flex flex-wrap gap-3">
          {PLATFORMS.map(({ id, name, icon: Icon, color }) => {
            const active = selected.includes(id)
            return (
              <button
                key={id}
                onClick={() => togglePlatform(id)}
                title={name}
                className={`flex size-14 items-center justify-center rounded-xl border transition-all ${
                  active ? 'border-red-400 bg-red-50 ring-1 ring-red-200' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`size-6 ${active ? color : 'text-slate-400'}`} />
              </button>
            )
          })}
        </div>

        {/* content */}
        <p className="mt-6 mb-3 text-xs uppercase tracking-wider text-slate-400">Content</p>
        <div className="rounded-xl border border-slate-200 focus-within:border-red-300">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            placeholder="What do you want to share today?"
            rows={6}
            className="w-full resize-none rounded-xl bg-transparent p-4 text-slate-700 outline-none placeholder:text-slate-400"
          />
          <div className="px-4 pb-3 text-right text-sm text-slate-400">
            {content.length}/{MAX_CHARS}
          </div>
        </div>

        {/* media */}
        <p className="mt-6 mb-3 text-xs uppercase tracking-wider text-slate-400">Media (optional)</p>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-10 text-slate-400 transition-colors hover:border-red-300 hover:text-red-400">
          <ImagePlus className="size-7" />
          <span className="text-sm">Click to upload image or video</span>
          <input type="file" className="hidden" accept="image/*,video/*" />
        </label>

        {/* schedule row */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="datetime-local"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-red-300"
          />
          <button
            disabled={!selected.length || !content.trim()}
            className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-600 to-red-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" />
            Schedule Post
          </button>
        </div>
      </div>

      {/* right column */}
      <div className="space-y-6">
        {/* upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CalendarClock className="size-5 text-slate-400" />
              Upcoming
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {upcoming.length}
            </span>
          </div>
          <div className="space-y-4">
            {upcoming.map((post: { _id: string; content: string; platforms: string[]; mediaType?: string; scheduledFor: string }) => (
              <PostRow key={post._id} post={post} />
            ))}
          </div>
        </div>

        {/* published */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <Send className="size-5 text-slate-400" />
              Published
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {published.length}
            </span>
          </div>
          <div className="max-h-100 space-y-4 overflow-auto pr-1">
            {published.map((post: { _id: string; content: string; platforms: string[]; mediaType?: string; scheduledFor: string }) => (
              <PostRow key={post._id} post={post} published />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PostRowProps {
  post: { content: string; platforms: string[]; mediaType?: string; scheduledFor: string }
  published?: boolean
}

const PostRow = ({ post, published }: PostRowProps) => {
  const platform = getPlatform(post.platforms[0])
  const Icon = platform?.icon
  return (
    <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          {Icon && <Icon className={`size-4 ${platform?.color}`} />}
          {post.mediaType === 'image' && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">Image</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{new Date(post.scheduledFor).toLocaleString()}</span>
          {published && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-600">
              Published
            </span>
          )}
        </div>
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-700">{post.content}</p>
    </div>
  )
}

export default Scheduler;
