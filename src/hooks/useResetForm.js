import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"

import { toast } from "react-hot-toast"

export const useResetForm = (params) => {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [resetInfo, setResetInfo] = useState({
    password:'',
    password2: ''
  })

  const {token} = params
  const { password, password2} = resetInfo

  const onChange = (e) =>{
    setResetInfo({
      ...resetInfo,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    if(password.trim() !== password2.trim()){
      return toast.error('Las contraseñas no coinciden')
    }

    try {
      setIsLoading(true)
      const res = await fetch(`/api/reset-password`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({password, userEmail})
      })

      if(!res.ok){
        const error = await res.json()
        toast.error(error.message)
      }

      toast.success('Contraseña actualizada con éxito!!')
      router.replace('/')
      
    } catch (error) {
      toast.error(error.message)
    }

    setIsLoading(false)
  }

  const validateToken = async() => {
    setIsValidating(true)
    try {
      const resp = await fetch(`/api/validate-token/${ token }`)
      
      if(!resp.ok){
        const error = await resp.json()
        toast.error( error.message)
        setIsValidating(false)
        return router.replace('/forgot-password')
      }

      const { email } = await resp.json()
      setIsValidating(false)
      setUserEmail(email)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    validateToken()
  }, [ token ])

  return{
    isLoading,
    password,
    password2,
    isValidating,

    onSubmit,
    onChange
  }
  
}