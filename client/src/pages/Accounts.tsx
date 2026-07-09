import { CheckCircle2, Plus, Unplug } from 'lucide-react'
import { dummyAccountsData, PLATFORMS, getPlatform } from '../assets/assets'

const Accounts = () => {
  const connectedCount = dummyAccountsData.length

  return (
    <div className="space-y-8">
      {/* header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Connected Accounts</h2>
          <p className="mt-1 text-slate-500">
            {connectedCount} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90">
          <Plus className="size-4" />
          Connect Account
        </button>
      </div>

      {/* connected accounts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {dummyAccountsData.map((account) => {
          const platform = getPlatform(account.platform)
          const Icon = platform?.icon
          return (
            <div
              key={account._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50">
                  {Icon && <Icon className={`size-6 ${platform?.color}`} />}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{account.handle}</p>
                  <p className="text-sm text-slate-500">{platform?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="size-4" />
                  Connected
                </span>
                <button
                  title="Disconnect"
                  className="text-slate-300 transition-colors hover:text-red-500"
                >
                  <Unplug className="size-5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Accounts;
