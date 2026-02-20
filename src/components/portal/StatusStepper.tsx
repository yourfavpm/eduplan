import { APPLICATION_STATUSES, getStatusIndex, type ApplicationStatus } from '@/types/portal'
import { Check } from 'lucide-react'

interface StatusStepperProps {
  currentStatus: ApplicationStatus
}

export default function StatusStepper({ currentStatus }: StatusStepperProps) {
  const currentIndex = getStatusIndex(currentStatus)

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max px-1">
        {APPLICATION_STATUSES.map((step, idx) => {
          const isCompleted = idx < currentIndex
          const isCurrent = idx === currentIndex

          return (
            <div key={step.value} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center gap-1.5">
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{idx + 1}</span>
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-[10px] font-medium text-center leading-tight max-w-[64px] ${
                    isCompleted
                      ? 'text-green-600'
                      : isCurrent
                      ? 'text-blue-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < APPLICATION_STATUSES.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-1 shrink-0 rounded-full transition-colors duration-200 ${
                    idx < currentIndex ? 'bg-green-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
