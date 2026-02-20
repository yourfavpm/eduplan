import Link from 'next/link'
import { FileText, Upload, Mic, ArrowRight, BarChart3 } from 'lucide-react'
import type { ApplicationStatus, PortalApplication } from '@/types/portal'

interface ActionCardProps {
  profileComplete: boolean
  application: PortalApplication | null
}

type Action = {
  icon: React.ReactNode
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  color: 'blue' | 'amber' | 'green' | 'purple'
}

function getAction(profileComplete: boolean, application: PortalApplication | null): Action {
  // Not yet started profile
  if (!profileComplete || !application) {
    return {
      icon: <FileText className="w-6 h-6" />,
      title: 'Complete your student profile',
      description: 'Tell us about your study goals so we can process your application.',
      primaryLabel: 'Complete Profile',
      primaryHref: '/portal/profile',
      color: 'blue',
    }
  }

  const status: ApplicationStatus = application.status

  if (status === 'INCOMPLETE_DOCUMENTS') {
    return {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload your documents',
      description: 'Your application is waiting on required documents. Upload them to move forward.',
      primaryLabel: 'Upload Documents',
      primaryHref: '/portal/documents',
      secondaryLabel: 'See what\'s needed',
      secondaryHref: '/portal/documents',
      color: 'amber',
    }
  }

  if (status === 'PAY_APPLICATION_FEES') {
    return {
      icon: <FileText className="w-6 h-6" />,
      title: 'Application fee required',
      description: 'Your application fee is due. Our team will contact you with payment details.',
      primaryLabel: 'Contact Advisor',
      primaryHref: 'mailto:hello@eduplan360.com',
      color: 'amber',
    }
  }

  if (status === 'APPLICATION_SUBMITTED') {
    return {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Application under review',
      description: 'Your application has been submitted. We\'re reviewing it and will update you soon.',
      primaryLabel: 'Track Progress',
      primaryHref: '/portal/application',
      color: 'blue',
    }
  }

  if (status === 'OFFER_SENT') {
    return {
      icon: <FileText className="w-6 h-6" />,
      title: 'You\'ve received an offer! 🎉',
      description: 'Your offer letter is ready. Review your application for full details.',
      primaryLabel: 'View Offer',
      primaryHref: '/portal/application',
      color: 'green',
    }
  }

  if (status === 'PREPARE_FOR_INTERVIEW') {
    return {
      icon: <Mic className="w-6 h-6" />,
      title: 'Prepare for your interview',
      description: 'Your interview is approaching. Review our guide to make a strong impression.',
      primaryLabel: 'Interview Guide',
      primaryHref: '/portal/application',
      secondaryLabel: 'Contact Advisor',
      secondaryHref: 'mailto:hello@eduplan360.com',
      color: 'purple',
    }
  }

  if (status === 'PAY_TUITION_DEPOSIT') {
    return {
      icon: <FileText className="w-6 h-6" />,
      title: 'Tuition deposit required',
      description: 'Secure your place by paying the tuition deposit. Contact your advisor for details.',
      primaryLabel: 'Contact Advisor',
      primaryHref: 'mailto:hello@eduplan360.com',
      color: 'amber',
    }
  }

  if (status === 'CAS_ISSUED') {
    return {
      icon: <FileText className="w-6 h-6" />,
      title: 'Your CAS number has been issued',
      description: 'You\'re ready to apply for your visa. View your application for details.',
      primaryLabel: 'View Application',
      primaryHref: '/portal/application',
      color: 'green',
    }
  }

  if (status === 'PROCESS_VISA') {
    return {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Visa application in progress',
      description: 'Your visa is being processed. We\'ll update you when there\'s news.',
      primaryLabel: 'Track Progress',
      primaryHref: '/portal/application',
      color: 'blue',
    }
  }

  return {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Track your application',
    description: 'Stay up to date with your application progress.',
    primaryLabel: 'View Application',
    primaryHref: '/portal/application',
    color: 'blue',
  }
}

const COLOR_MAP = {
  blue: {
    wrapper: 'bg-blue-50 border-blue-100',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-900',
    desc: 'text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'text-blue-600 hover:text-blue-800',
  },
  amber: {
    wrapper: 'bg-amber-50 border-amber-100',
    icon: 'bg-amber-100 text-amber-600',
    title: 'text-amber-900',
    desc: 'text-amber-700',
    btn: 'bg-amber-500 hover:bg-amber-600 text-white',
    secondary: 'text-amber-600 hover:text-amber-800',
  },
  green: {
    wrapper: 'bg-green-50 border-green-100',
    icon: 'bg-green-100 text-green-600',
    title: 'text-green-900',
    desc: 'text-green-700',
    btn: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'text-green-600 hover:text-green-800',
  },
  purple: {
    wrapper: 'bg-purple-50 border-purple-100',
    icon: 'bg-purple-100 text-purple-600',
    title: 'text-purple-900',
    desc: 'text-purple-700',
    btn: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'text-purple-600 hover:text-purple-800',
  },
}

export default function ActionCard({ profileComplete, application }: ActionCardProps) {
  const action = getAction(profileComplete, application)
  const colors = COLOR_MAP[action.color]

  return (
    <div className={`rounded-xl border p-5 flex gap-4 items-start ${colors.wrapper}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors.icon}`}>
        {action.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-base mb-1 ${colors.title}`}>{action.title}</h3>
        <p className={`text-sm mb-4 leading-relaxed ${colors.desc}`}>{action.description}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={action.primaryHref}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${colors.btn}`}
          >
            {action.primaryLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {action.secondaryLabel && action.secondaryHref && (
            <Link
              href={action.secondaryHref}
              className={`text-sm font-medium transition-colors ${colors.secondary}`}
            >
              {action.secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
