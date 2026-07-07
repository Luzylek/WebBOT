import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-serif mb-6">Witaj, {user.user_metadata.full_name}!</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md">
        <img
          src={user.user_metadata.avatar_url}
          className="w-20 h-20 rounded-full mb-4"
          alt="avatar"
        />
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Discord ID:</strong> {user.user_metadata.provider_id}</p>
        <form action="/auth/signout" method="post" className="mt-4">
          <button className="text-sm text-red-600">Wyloguj</button>
        </form>
      </div>
    </div>
  )
}