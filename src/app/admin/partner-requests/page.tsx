import { getPartnerRequests, updatePartnerStatus, AdminPartnerRequest } from "@/lib/supabase/admin";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Mail, Phone, Handshake, Building, Globe, User, MessageSquare } from "lucide-react";

export const metadata = { title: "Partner Requests | Admin — EduPlan360" };

async function ChangeStatusAction(id: string, status: AdminPartnerRequest['status']) {
    'use server'
    await updatePartnerStatus(id, status);
    revalidatePath('/admin/partner-requests');
}

export default async function AdminPartnerRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const { q, status, page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? "1", 10);
  const { requests, total } = await getPartnerRequests({ search: q, status, page });
  const totalPages = Math.ceil(total / 25);

  return (
    <div className="max-w-6xl">
      <div className="mb-10 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Partnership Inquiries</h1>
            <p className="text-slate-500 mt-2">Manage institutional and corporate partnership proposals.</p>
        </div>
        <div className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20">
            {total} B2B Leads
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
        <form className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
                <input 
                    name="q"
                    defaultValue={q}
                    placeholder="Search by organization or name..."
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
            <button type="submit" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/10">
                Filter Results
            </button>
            {(q || status) && (
                <Link href="/admin/partner-requests" className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900">
                    Clear
                </Link>
            )}
        </form>
      </div>

      {/* List */}
      <div className="space-y-6">
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 border border-dashed border-slate-200 text-center">
            <Handshake className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No partnership inquiries found</h3>
          </div>
        ) : (
          requests.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
               <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-xl text-slate-900">{item.organization_name}</h3>
                                <StatusBadge status={item.status} />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Building className="w-4 h-4 text-brand-600" />
                                <span className="font-medium text-slate-700">{item.organization_type}</span>
                                <span className="text-slate-300">•</span>
                                <Globe className="w-4 h-4 text-brand-600" />
                                <span>{item.country}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'under_review') }}>
                                <button type="submit" className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50">Review</button>
                            </form>
                            <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'approved') }}>
                                <button type="submit" className="px-3 py-1.5 text-xs font-bold border border-green-200 text-green-700 bg-green-50 rounded-lg hover:bg-green-100">Approve</button>
                            </form>
                            <form action={async () => { 'use server'; await ChangeStatusAction(item.id, 'rejected') }}>
                                <button type="submit" className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg">Reject</button>
                            </form>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-50">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Contact Person</span>
                            <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                <User className="w-4 h-4 text-brand-500" />
                                {item.full_name}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Role</span>
                            <div className="text-slate-600 font-medium">
                                {item.role || 'Not specified'}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Email</span>
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {item.email}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Phone</span>
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <Phone className="w-4 h-4 text-slate-400" />
                                {item.phone}
                            </div>
                        </div>
                    </div>

                    {item.message && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <MessageSquare className="w-5 h-5 text-brand-600 shrink-0 mt-1" />
                                <p className="text-sm text-slate-600 leading-relaxed italic">&quot;{item.message}&quot;</p>
                            </div>
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
          <p className="text-sm text-slate-500 font-medium font-sans">Showing page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/partner-requests?page=${page - 1}`} className="px-4 py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50">Previous</Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/partner-requests?page=${page + 1}`} className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800">Next Page</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: AdminPartnerRequest['status'] }) {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.15)]",
        under_review: "bg-blue-100 text-blue-700 border-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        approved: "bg-green-100 text-green-700 border-green-200 shadow-[0_0_12px_rgba(34,197,94,0.15)]",
        rejected: "bg-slate-100 text-slate-600 border-slate-200 shadow-[0_0_12px_rgba(148,163,184,0.15)]",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${styles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
}
