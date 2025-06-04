import React from 'react'

export default function MadeWithAI() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-purple-200/50 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
      <span className="text-purple-600">✨</span>
      <span>
        Made using AI, <em className="font-semibold text-purple-700">not by AI!</em>
      </span>
    </div>
  )
}
