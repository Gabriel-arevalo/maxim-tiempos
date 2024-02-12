export const Loading = ({ className="" }) => {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid  text-maxim-color border-current border-r-transparent align-[-2.25em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${ className  }`}
      role="status">
      <span className="!absolute top-10 !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  )
}