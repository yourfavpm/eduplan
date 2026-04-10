import { getAssociateRequests, updateAssociateStatus, AdminAssociateRequest } from "@/lib/supabase/admin";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Mail, Phone, Calendar, UserPlus, Briefcase, MapPin, GraduationCap } from "lucide-react";

export const metadata = { title: "Associate Requests | Admin — EduPlan360" };

async function ChangeStatusAction(id: string, status: AdminAssociateRequest['status']) {
    'use server'
    await updateAssociateStatus(id, status);
    revalidatePath('/admin/associate-requests');
}

export default async function AdminAssociateRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const { q, status, page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? "1", 10);
  const { requests, total } = await getAssociateRequests({ search: q, status, page });
  const totalPages = Math.ceil(total / 25);

  return (
    <div className="max-w-6xl">
      <div className="mb-10 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Associate Applications</h1>
            <p className="text-slate-500 mt-2">Manage individuals interested in joining the EduPlan360 associate program.</p>
        </div>
        <div className="bg-brand-50 text-brand-700 px-4 py-2 rounded-xl text-sm font-bold border border-brand-100">
            {total} Total Applications
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
        <form className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
                <input 
                    name="q"
                    defaultValue={q}
                    placeholder="Search by name or email..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                />
            </div>
            <select 
                name="status"
                defaultValue={status}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm min-w-[150px]"
            >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
            <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg">
                Filter
            </button>
            {(q || status) && (
                <Link href="/admin/associate-requests" className="px-4 py-2.5 text-sm text-slate-500 font-medium hover:text-slate-900">
                    Clear
                </Link>
            )}
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 border border-dashed border-slate-200 text-center">
            <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No applications found</h3>
          </div>
        ) : (
          requests.map((item) => (
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
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(item.created_at).toLocaleDateString()}</span>
                     </div>
                  </div>

                  <div className="flex gap-2">
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'under_review') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50">Review</button>
                    </form>
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'approved') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-700 border border-green-100 rounded-lg hover:bg-green-100">Approve</button>
                    </form>
                    <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'rejected') }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg">Reject</button>
                    </form>
                  </div>
               </div>

               <div className="mt-6 pt-6 border-t border-slate-50 grid md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Occupation</span>
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <Briefcase className="w-4 h-4 text-brand-600" />
                          {item.occupation || 'N/A'}
                      </div>
                  </div>
                  <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Location</span>
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <MapPin className="w-4 h-4 text-brand-600" />
                          {item.city}, {item.country}
                      </div>
                  </div>
                  <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Qualification</span>
                      <div className="flex items-center gap-2 text-slate-700 font-medium capitalize">
                          <GraduationCap className="w-4 h-4 text-brand-600" />
                          {item.qualification}
                      </div>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-10 p-6 bg-white rounded-2xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium font-sans">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/associate-requests?page=${page - 1}`} className="px-4 py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50">Prev</Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/associate-requests?page=${page + 1}`} className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800">Next</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: AdminAssociateRequest['status'] }) {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        under_review: "bg-blue-100 text-blue-700 border-blue-200",
        approved: "bg-green-100 text-green-700 border-green-200",
        rejected: "bg-pink-100 text-pink-700 border-pink-200",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${styles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
}
