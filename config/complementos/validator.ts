
export default class Validator {

  validator_vacio(text: any = '') {
    // console.log(text)
    if (text == null || text === undefined || text.length === 0) return true
    return text === ''
  }

  compruJson(value: any, json: any, initValue: any) {
    if (typeof json == typeof undefined || typeof value == typeof undefined) return initValue;
    return json.hasOwnProperty(value) ? json[value] : initValue;
  }

  validator_integer(textd: any = '') {
    const cadena = (textd + '')
    if (this.validator_vacio((cadena))) return true
    const expres = /^\d+$/
    return !expres.test(cadena)
  }

  validator_decimal(textd: any = '') {
    const cadena = (textd + '')
    if (this.validator_vacio((cadena))) return true
    if (cadena === '0') return false
    const expres = /^[0-9]+([,|.][0-9]+)$/
    return !expres.test(cadena)
  }

  validator_celular(celular: any = '') {
    const cadena = (celular + '')
    if (this.validator_vacio((cadena))) return true
    const expres2 = /^((^(\()?(\+\s?\d{1,})(\))?)(\s)?)?((\d{9}$)|(\d{3}(\s|-)?\d{3}(\s|-)?\d{3}$))/
    return !expres2.test(cadena)
  }

  validator_edad(edad: any = '') {
    const cadena = (edad + '')
    if (this.validator_vacio((cadena))) return true
    if (this.validator_integer((cadena))) return true
    const expres2 = /^\d{1,3}$/
    return !expres2.test(cadena)
  }

  validator_url(url: any = '') {
    const cadena = (url + '')
    if (this.validator_vacio((cadena))) return true
    const expres = /^(http|https)(:\/\/)(((\w{0,}\.)?(\w{0,}\.\w{0,3}))(:\d{1,65555})?)(\S{0,})?$/
    return !expres.test(cadena)
  }

  validator_mail(mail: any = '') {
    const cadena = (mail + '')
    if (this.validator_vacio((cadena))) return true
    if (cadena === '0') return false
    const expres = /^[\w]+([@])([\w]{0,})([.]\w{0,3})$/
    return !expres.test(cadena)
  }

  validator_date(date: any = '') {
    const cadena = (date + '')
    if (this.validator_vacio(cadena)) return true
    const expres = /^(\d{4})(-)(\d{2})(-)(\d{2})/
    if (!expres.test(cadena)) return true
    const isValidDate = Date.parse(`${cadena}T00:00:00`)
    return isNaN(isValidDate)
  }

  convert_date_minisecons(date: any = '') {
    if (this.validator_date(date)) return 0
    const dateobj = new Date(date)
    return dateobj.getTime()
  }

  validator_date_men_date(datein: any = '', datefin: any = '') {
    if (this.validator_date(datein)) return true
    if (this.validator_date(datefin)) return true
    // valida si es menos o mayor
    const miniseconsinit = this.convert_date_minisecons(datein)
    const miniseconsfin = this.convert_date_minisecons(datefin)
    return !(miniseconsinit < miniseconsfin)
  }

  validator_date_range_day(datein: any = '', datefin: any = '', daydif: any = 0) {
    if (this.validator_date_men_date(datein, datefin)) return true
    const miniseconsInit = this.convert_date_minisecons(datein)
    const miniseconsFin = this.convert_date_minisecons(datefin)
    const diferentminisecons = Math.abs(miniseconsInit - miniseconsFin)
    const miniseconsToDay = diferentminisecons / 86400000
    if (daydif <= miniseconsToDay) {
      return false
    } else {
      return true
    }
  }
}