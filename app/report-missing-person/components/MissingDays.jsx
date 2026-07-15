'use client'

export default function MissingDays({ dateMissing }) {

  if (!dateMissing) return null

  const today = new Date()

  const missingDate = new Date(dateMissing)

  const days = Math.floor(
    (today - missingDate) /
    (1000 * 60 * 60 * 24)
  )

  return (

    <div className="bg-red-50 dark:bg-red-950 border border-red-400 rounded-lg p-4">

      <p className="font-semibold text-red-600">

        Missing for {days} day{days !== 1 ? 's' : ''}

      </p>

    </div>

  )

}