import { CalendarClock, Send, Users, TrendingUp } from 'lucide-react'
import { dummyPostsData, dummyAccountsData, dummyActivityData } from '../assets/assets'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const Dashboard = () => {
  const scheduledCount = dummyPostsData.filter((p: { status: string }) => p.status === 'scheduled').length
  const publishedCount = dummyPostsData.filter((p: { status: string }) => p.status === 'published').length
  const connectedCount = dummyAccountsData.length

  const stats = [
    { label: 'Scheduled Posts', value: scheduledCount, note: '+2 today', icon: CalendarClock, accent: false },
    { label: 'Published Posts', value: publishedCount, note: 'All time', icon: Send, accent: false },
    { label: 'Connected Accounts', value: connectedCount, note: 'Active', icon: Users, accent: true },
  ]

  return (
    <div className="space-y-8">
      {/* greeting */}
      <div>
        <h2 className="text-3xl font-semibold text-slate-800">
          {getGreeting()}! <span className="align-middle">👋</span>
        </h2>
        <p className="mt-1 text-slate-500">Here's what's happening with your social accounts today.</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, note, icon: Icon, accent }) => (
          <div
            key={label}
            className={`rounded-2xl border p-6 ${
              accent ? 'border-red-100 bg-red-50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <p className="text-4xl font-semibold text-slate-800">{value}</p>
              <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                <TrendingUp className="size-4" />
                {note}
              </span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-slate-500">
              <Icon className="size-5" />
              <span className="font-medium">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* recent activity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
          <span className="text-sm text-slate-400">{dummyActivityData.length} events</span>
        </div>

        <div className="divide-y divide-slate-100">
          {dummyActivityData.map((activity) => (
            <div key={activity._id} className="flex items-start gap-4 py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Send className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  Published
                </span>
                <p className="mt-1 truncate font-medium text-slate-700">{activity.description.trim()}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-sm text-slate-400">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
