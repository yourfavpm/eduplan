import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPortalProfile, getPortalApplication } from '@/lib/supabase/portal'
import { getStatusIndex } from '@/types/portal'
import type { Metadata } from 'next'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payments | Student Portal — EduPlan360',
}

export default async function PaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [, application] = await Promise.all([
    getPortalProfile(user.id),
    getPortalApplication(user.id),
  ])

  const showTuitionDeposit =
    application && getStatusIndex(application.status) >= getStatusIndex('PAY_TUITION_DEPOSIT')

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Track your payment statuses. Contact your advisor to arrange payments.
        </p>
      </div>

      <div className="space-y-4">
        {/* Application Fee */}
        <PaymentCard
          title="Application Fee"
          description="Required to process and submit your application to the university."
          paid={application?.application_fee_paid ?? false}
          note={
            !application
              ? 'Complete your profile first to activate your application.'
              : undefined
          }
        />

        {/* Tuition Deposit — only shows when status reaches PAY_TUITION_DEPOSIT or beyond */}
        {showTuitionDeposit && (
          <PaymentCard
            title="Tuition Deposit"
            description="Required to secure your place at the university after receiving an offer."
            paid={application?.tuition_deposit_paid ?? false}
          />
        )}

        {!showTuitionDeposit && (
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6 text-center">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-600 mb-1">Tuition Deposit</h3>
            <p className="text-xs text-slate-400">
              This will appear once your application progresses to the deposit stage.
            </p>
          </div>
        )}
      </div>

      {/* Contact note */}
      <div className="mt-8 px-4 py-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
        <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-800">Need to make a payment?</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Contact your EduPlan360 advisor directly. We&apos;ll provide payment instructions and confirm receipt.{' '}
            <a href="mailto:hello@eduplan360.com" className="underline font-medium">hello@eduplan360.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function PaymentCard({
  title,
  description,
  paid,
  note,
}: {
  title: string
  description: string
  paid: boolean
  note?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
          paid ? 'bg-green-50' : 'bg-amber-50'
        }`}
      >
        {paid ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <Clock className="w-6 h-6 text-amber-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              paid
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-amber-50 text-amber-700 border-amber-100'
            }`}
          >
            {paid ? 'Paid' : 'Pending'}
          </span>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
        {note && <p className="text-xs text-slate-400 mt-2 italic">{note}</p>}
        {!paid && (
          <p className="text-xs text-slate-400 mt-2">
            Contact your advisor to arrange payment.
          </p>
        )}
      </div>
    </div>
  )
}
