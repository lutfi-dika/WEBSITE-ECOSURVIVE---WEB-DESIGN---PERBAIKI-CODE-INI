const EmptyStatePremium = ({ title, description, action }) => (
  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-8 text-center">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-900 text-xl text-white shadow-sm">+</div>
    <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">{description}</p>
    {action && <div className="mt-4 flex justify-center">{action}</div>}
  </div>
)

export default EmptyStatePremium
