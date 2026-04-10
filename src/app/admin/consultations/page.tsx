import { getConsultations, updateConsultationStatus, AdminConsultation } from "@/lib/supabase/admin";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Mail, Phone, Calendar, MessageSquare, GraduationCap, Globe, MapPin } from "lucide-react";

export const metadata = { title: "Consultations | Admin — EduPlan360" };

async function ChangeStatusAction(id: string, status: AdminConsultation['status']) {
    'use server'
    await updateConsultationStatus(id, status);
    revalidatePath('/admin/consultations');
}

export default async function AdminConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const { q, status, page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? "1", 10);
  const { consultations, total } = await getConsultations({ search: q, status, page });
  const totalPages = Math.ceil(total / 25);

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Consultation Requests</h1>
        <p className="text-slate-500 mt-2">Manage and track student inquiries from the website.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
        <form className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[280px] relative">
                <input 
                    name="q"
                    defaultValue={q}
                    placeholder="Search by name or email..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                />
                <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <select 
                name="status"
                defaultValue={status}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm min-w-[150px]"
            >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="booked">Booked</option>
                <option value="closed">Closed</option>
            </select>
            <button type="submit" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/10">
                Filter Results
            </button>
            {(q || status) && (
                <Link href="/admin/consultations" className="px-4 py-2.5 text-sm text-slate-500 font-medium hover:text-slate-900 transition-colors flex items-center">
                    Clear Filters
                </Link>
            )}
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {consultations.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 border border-dashed border-slate-200 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No consultation requests found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          consultations.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-slate-900">{item.full_name}</h3>
                        <StatusBadge status={item.status} />
                     </div>
                     <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {item.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {item.phone}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(item.created_at).toLocaleDateString()}</span>
                     </div>
                  </div>

                  <div className="flex gap-2">
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'contacted') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Mark Contacted</button>
                    </form>
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'booked') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-700 border border-green-100 rounded-lg hover:bg-green-100 transition-colors">Booked</button>
                    </form>
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'closed') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors">Close</button>
                    </form>
                  </div>
               </div>

               <div className="mt-6 pt-6 border-t border-slate-50 grid md:grid-cols-2 gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Study Level</span>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <GraduationCap className="w-4 h-4 text-brand-600" />
                            {item.study_level || 'Not specified'}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Country of Interest</span>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Globe className="w-4 h-4 text-brand-600" />
                            {item.country_of_interest || 'Not specified'}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Lead Source</span>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <MapPin className="w-4 h-4 text-brand-600" />
                            {item.source || 'Direct'}
                        </div>
                    </div>
                </div>
                  
                  {item.message && (
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Message</span>
                        <p className="text-sm text-slate-600 italic leading-relaxed">&quot;{item.message}&quot;</p>
                    </div>
                  )}
               </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-10 p-6 bg-white rounded-2xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Showing page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/consultations?page=${page - 1}`} className="px-4 py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">Previous</Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/consultations?page=${page + 1}`} className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all">Next Page</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: AdminConsultation['status'] }) {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        contacted: "bg-blue-100 text-blue-700 border-blue-200",
        booked: "bg-green-100 text-green-700 border-green-200",
        closed: "bg-slate-100 text-slate-600 border-slate-200",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </span>
    );
}
