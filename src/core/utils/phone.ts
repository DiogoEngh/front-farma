export const formatPhone = (phone: string) => {
    phone = phone.replace(/\D/g, '')
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2')
    phone = phone.replace(/(\d)(\d{4})/, '$1$2')
    phone = phone.replace(/(\d{5})(\d{4})/, '$1-$2')
    return phone.substring(0, 15)
}

export const matchPhone = (phone: string) => {
    phone = phone.substring(0, 15)
    phone = phone.replace(/\D/g, '')
    let regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'); 
    return regex.test(phone);
}