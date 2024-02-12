import { Loading } from "./Loading"

export const Button = ({ 
    label, 
    className, 
    isLoading=false, 
    type="button", 
    onClick = () => {} }) => {
  return (
    <>
  
      {
        isLoading ?
        (
          <Loading />
        ):
        (
          <button
            type={ type } 
            onClick={ onClick }
            className={`rounded-md text-white border border-primary px-20 py-2 cursor-pointer hover:bg-primary hover:text-white transition ease-in ${ className }`}>
            { label }
          </button>
        )

      }
    </>
    )
}