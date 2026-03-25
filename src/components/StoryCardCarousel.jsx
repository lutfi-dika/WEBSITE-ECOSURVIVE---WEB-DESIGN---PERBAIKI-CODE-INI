import { useState } from 'react'
import clsx from 'clsx'

const StoryCardCarousel = ({ stories = [] }) => {
  const [activeId, setActiveId] = useState(stories[0]?.id)
  const activeStory = stories.find((story) => story.id === activeId) || stories[0]

  if (!activeStory) return null

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar lg:flex-col">
        {stories.map((story) => (
          <button
            key={story.id}
            type="button"
            onClick={() => setActiveId(story.id)}
            className={clsx('min-w-[180px] rounded-[1.5rem] border p-4 text-left transition lg:min-w-0', activeId === story.id ? 'border-cyan-200 bg-cyan-50' : 'border-slate-200 bg-white hover:bg-slate-50')}
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{story.tag}</p>
            <p className="mt-2 font-semibold text-slate-900">{story.title}</p>
          </button>
        ))}
      </div>
      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-900 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{activeStory.tag}</p>
        <h3 className="mt-2 text-2xl font-semibold">{activeStory.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeStory.description}</p>
      </div>
    </div>
  )
}

export default StoryCardCarousel
