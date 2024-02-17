export const isValidEmail = (email) => {
    
  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
  const trimmedEmail = email.trim()

  const isValidEmail = validEmail.test(trimmedEmail)

  return isValidEmail
  
}