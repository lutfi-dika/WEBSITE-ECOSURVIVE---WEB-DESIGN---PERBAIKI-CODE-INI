import { useMemo, useState } from 'react'
import DashboardPanel from '../../components/DashboardPanel'
import PaginationControls from '../../components/PaginationControls'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import EmptyStatePremium from '../../components/EmptyStatePremium'
import LeaderboardPodium from '../../components/LeaderboardPodium'

const AdminUsersTab = ({
  userSearch,
  setUserSearch,
  users,
  selectedUser,
  setSelectedUserEmail,
  getUserSnapshot,
  formatDateTime,
  contentMeta,
  leaderboard,
  setSpotlightItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedUsers = useMemo(
    () => users.slice((activePage - 1) * pageSize, activePage * pageSize),
    [activePage, users],
  )
  const resolveFeatureTitle = (featureId) => contentMeta.featureTitles[featureId] || featureId
  const resolveChallengeTitle = (challengeId) => contentMeta.challengeTitles[challengeId] || challengeId

  return (
    <div className="space-y-5">
      <AnimatedSectionHeader
        eyebrow="Users"
        title="Detail user dengan leaderboard dan spotlight drawer"
        description="Area ini dibuat agar admin dapat menunjukkan kedalaman perilaku user, bukan sekadar tabel daftar akun."
        tone="admin"
      />
      <DashboardPanel
        eyebrow="Community podium"
        title="Top contributors"
        description="Snapshot cepat untuk menunjukkan rasa komunitas dan kompetisi."
      >
        <LeaderboardPodium leaders={leaderboard} />
      </DashboardPanel>
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <DashboardPanel
          eyebrow="Users"
          title="Ringkasan user"
          description="Klik user untuk melihat detail penggunaan fitur, challenge, dan aktivitas terakhir."
          actions={
            <input
              value={userSearch}
              onChange={(event) => setUserSearch(event.target.value)}
              placeholder="Cari nama atau email..."
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
            />
          }
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-3 pr-4 font-semibold">Nama</th>
                  <th className="pb-3 pr-4 font-semibold">Email</th>
                  <th className="pb-3 pr-4 font-semibold">Fitur aktif</th>
                  <th className="pb-3 pr-4 font-semibold">Challenge selesai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedUsers.map((user) => {
                  const snapshot = getUserSnapshot(user.email)
                  return (
                    <tr key={user.id} className="cursor-pointer" onClick={() => setSelectedUserEmail(user.email)}>
                      <td className="py-3 pr-4 font-medium text-slate-900">{user.name}</td>
                      <td className="py-3 pr-4 text-slate-600">{user.email}</td>
                      <td className="py-3 pr-4 text-slate-600">{snapshot.activeFeatureCount}</td>
                      <td className="py-3 pr-4 text-slate-600">{snapshot.completedChallengeCount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {paginatedUsers.length === 0 && (
              <div className="py-5">
                <EmptyStatePremium
                  title="Belum ada user yang cocok"
                  description="Ubah kata kunci pencarian untuk membuka kembali daftar user."
                />
              </div>
            )}
          </div>
          <PaginationControls
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemLabel="user"
            totalItems={users.length}
          />
        </DashboardPanel>

        <DashboardPanel
          eyebrow="Selected user"
          title={selectedUser ? selectedUser.name : 'Pilih user'}
          description={selectedUser ? selectedUser.email : 'Belum ada user dipilih.'}
        >
          {selectedUser ? (
            (() => {
              const snapshot = getUserSnapshot(selectedUser.email)
              return (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fitur aktif</p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">{snapshot.activeFeatureCount}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Challenge selesai</p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">{snapshot.completedChallengeCount}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Aktivitas terakhir</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDateTime(snapshot.lastActivityAt)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpotlightItem({ title: selectedUser.name, subtitle: 'User spotlight', content: `Fitur aktif ${snapshot.activeFeatureCount}, challenge selesai ${snapshot.completedChallengeCount}, aktivitas terakhir ${formatDateTime(snapshot.lastActivityAt)}.` })}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Buka spotlight
                  </button>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fitur aktif</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(snapshot.featureUsage).filter(([, value]) => value).length > 0 ? (
                        Object.entries(snapshot.featureUsage)
                          .filter(([, value]) => value)
                          .map(([featureId]) => (
                            <span key={featureId} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                              {resolveFeatureTitle(featureId)}
                            </span>
                          ))
                      ) : (
                        <span className="text-sm text-slate-500">Belum ada fitur aktif.</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Challenge progress</p>
                    <div className="mt-2 space-y-2">
                      {Object.entries(snapshot.challengeProgress).length > 0 ? (
                        Object.entries(snapshot.challengeProgress).map(([challengeId, completed]) => (
                          <div key={challengeId} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                            <span className="truncate text-slate-700">{resolveChallengeTitle(challengeId)}</span>
                            <span className={`font-semibold ${completed ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {completed ? 'Selesai' : 'Belum'}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">Belum ada progres challenge.</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Aktivitas terbaru</p>
                    <div className="mt-2 space-y-2">
                      {snapshot.recentActivities.length > 0 ? (
                        snapshot.recentActivities.map((activity) => (
                          <div key={activity.id} className="rounded-xl bg-white px-3 py-2">
                            <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{formatDateTime(activity.createdAt)}</p>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">Belum ada aktivitas.</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()
          ) : (
            <p className="text-sm text-slate-500">Klik salah satu user untuk membuka detailnya.</p>
          )}
        </DashboardPanel>
      </div>
    </div>
  )
}

export default AdminUsersTab
