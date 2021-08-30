export function createDefaultControl(config, validation){
  return {
    ...config,
    validation,
    isTouched: false,
    valid: !validation,
    value: ''
  }
}

export function validateControl(value, validation){
  if(!validation){
    return true
  }

  let isValid = true

  if(validation.required){
    isValid = value.trim() !== '' && isValid
  }
  return isValid
}

export function validateForm(formControl){
  let valid = true
  Object.keys(formControl).map((controlName) => {
    return valid = formControl[controlName].valid && valid
  })

  return valid
}