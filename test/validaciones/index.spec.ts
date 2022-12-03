import { describe, expect, test } from '@jest/globals';
import Validator from '../../config/complementos/validator';
const objVali = new Validator()

describe('Ejecucion de metodos de validacion:', () => {
  describe('Valida si es un integer', () => {
    test('Valida con un 0', () => {
      const resutl = objVali.validator_integer(0)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506', () => {
      const resutl = objVali.validator_integer(2506)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506 en string', () => {
      const resutl = objVali.validator_integer('2506')
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506.16 - error', () => {
      const resutl = objVali.validator_integer(2506.16)
      expect(true).toBe(resutl)
    })
    test('Valida con un hola - error', () => {
      const resutl = objVali.validator_integer('hola')
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es un decimal', () => {
    test('Valida con un 0.0', () => {
      const resutl = objVali.validator_decimal(0.0)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506.35', () => {
      const resutl = objVali.validator_decimal(2506.35)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506.45 en string', () => {
      const resutl = objVali.validator_decimal('2506.45')
      expect(false).toBe(resutl)
    })
    test('Valida con un 2506.16 - error', () => {
      const resutl = objVali.validator_decimal(2506)
      expect(true).toBe(resutl)
    })
    test('Valida con un hola - error', () => {
      const resutl = objVali.validator_decimal('hola')
      expect(true).toBe(resutl)
    })
    test('Valida con un 25567 eb string - error', () => {
      const resutl = objVali.validator_decimal('25567')
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es un correo electronico', () => {
    test('Valida con un arturo14@gmail.com', () => {
      const resutl = objVali.validator_mail('arturo14@gmail.com')
      expect(false).toBe(resutl)
    })
    test('Valida con un canagmail.com - error', () => {
      const resutl = objVali.validator_mail('canagmail.com')
      expect(true).toBe(resutl)
    })
    test('Valida con un cana@gmailcom - error', () => {
      const resutl = objVali.validator_mail('cana@gmailcom')
      expect(true).toBe(resutl)
    })
    test('Valida con un canagmailcom - error', () => {
      const resutl = objVali.validator_mail(2506)
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es una URL tanto de HTTP / HTTPS', () => {
    test('Valida con un http://google.com', () => {
      const resutl = objVali.validator_url('http://google.com')
      expect(false).toBe(resutl)
    })
    test('Valida con un URL vacio - error', () => {
      const resutl = objVali.validator_url('')
      expect(true).toBe(resutl)
    })
    test('Valida con un ftp://google.com - error', () => {
      const resutl = objVali.validator_url('ftp://google.com')
      expect(true).toBe(resutl)
    })
    test('Valida con un http:/google.com - error', () => {
      const resutl = objVali.validator_url('http:/google.com')
      expect(true).toBe(resutl)
    })
    test('Valida con un http://googlecom mal escrito - error', () => {
      const resutl = objVali.validator_url('http://googlecom')
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es un numero de telefono celular', () => {
    test('Valida con un 985796307', () => {
      const resutl = objVali.validator_celular('985796307')
      expect(false).toBe(resutl)
    })
    test('Valida con un 985 796 307', () => {
      const resutl = objVali.validator_celular('985-796-307')
      expect(false).toBe(resutl)
    })
    test('Valida con un +51 985-796-307', () => {
      const resutl = objVali.validator_celular('+51 985-796-307')
      expect(false).toBe(resutl)
    })
    test('Valida con un (+51) 985-796-307', () => {
      const resutl = objVali.validator_celular('(+51) 985-796-307')
      expect(false).toBe(resutl)
    })
    test('Valida con un (+51) 985 796 307', () => {
      const resutl = objVali.validator_celular('(+51) 985 796 307')
      expect(false).toBe(resutl)
    })
    test('Valida con un (+51) 985796307', () => {
      const resutl = objVali.validator_celular('(+51) 985796307')
      expect(false).toBe(resutl)
    })
    test('Valida con un 9857963075456 - error', () => {
      const resutl = objVali.validator_celular('9857963075456')
      expect(true).toBe(resutl)
    })
    test('Valida con un (+dshfjsd) 985796307 - error', () => {
      const resutl = objVali.validator_celular('(+dshfjsd) 985796307')
      expect(true).toBe(resutl)
    })
    test('Valida con un (62) 985796307 - error', () => {
      const resutl = objVali.validator_celular('(62) 985796307')
      expect(true).toBe(resutl)
    })
    test('Valida con un (+62) 985796307456 - error', () => {
      const resutl = objVali.validator_celular('(+62) 985796307456')
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es una edad', () => {
    test('Valida con un 12 entero', () => {
      const resutl = objVali.validator_edad(12)
      expect(false).toBe(resutl)
    })
    test('Valida con un 100 string', () => {
      const resutl = objVali.validator_edad('100')
      expect(false).toBe(resutl)
    })
    test('Valida con un 4561 - eror', () => {
      const resutl = objVali.validator_edad('4561')
      expect(true).toBe(resutl)
    })
    test('Valida con un 23146a - error', () => {
      const resutl = objVali.validator_edad('23146a')
      expect(true).toBe(resutl)
    })
  })
  describe('Valida si es una fecha mysql', () => {
    test('Valida con un 2000-11-10', () => {
      const resutl = objVali.validator_date('2000-11-10')
      expect(false).toBe(resutl)
    })
    test('Valida con un 2500-08-10', () => {
      const resutl = objVali.validator_date('2500-08-10')
      expect(false).toBe(resutl)
    })
    test('Valida con un 30-20-2500 - eror', () => {
      const resutl = objVali.validator_date('30-20-2500')
      expect(true).toBe(resutl)
    })
    test('Valida con un 2000-15-10 - error', () => {
      const resutl = objVali.validator_date('2000-15-10')
      expect(true).toBe(resutl)
    })
    test('Valida con un 200-250-300 - error', () => {
      const resutl = objVali.validator_date('200-250-300')
      expect(true).toBe(resutl)
    })
    test('Valida con un 2000-1-21 - error', () => {
      const resutl = objVali.validator_date('2000-1-21')
      expect(true).toBe(resutl)
    })
    test('Valida con un 2000-11-10 y 2000-11-20 si 9 dias esta dentro del margen', () => {
      const resutl = objVali.validator_date_range_day('2000-11-10', '2000-11-20', 9)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2000-11-10 y 2000-11-20 si 10 dias esta dentro del margen', () => {
      const resutl = objVali.validator_date_range_day('2000-11-10', '2000-11-20', 10)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2000-11-10 y 2000-11-11 si 1 dias esta dentro del margen', () => {
      const resutl = objVali.validator_date_range_day('2000-11-10', '2000-11-11', 1)
      expect(false).toBe(resutl)
    })
    test('Valida con un 2000-11-10  es menor que 2000-11-20', () => {
      const resutl = objVali.validator_date_men_date('2000-11-10', '2000-11-20')
      expect(false).toBe(resutl)
    })
    test('Valida con un 2000-11-10  es menor que 2000-11-11', () => {
      const resutl = objVali.validator_date_men_date('2000-11-10', '2000-11-11')
      expect(false).toBe(resutl)
    })
    test('Valida con un 2000-11-10  es menor que 2000-11-10 - error', () => {
      const resutl = objVali.validator_date_men_date('2000-11-10', '2000-11-10')
      expect(true).toBe(resutl)
    })
    test('Valida con un 2000-11-10  es menor que 2000-21-20 - error', () => {
      const resutl = objVali.validator_date_men_date('2000-11-10', '2000-21-20')
      expect(true).toBe(resutl)
    })
    test('Valida con un 2000-11-10', () => {
      const resutl = objVali.convert_date_minisecons('2000-11-10')
      expect(false).toBe(!(resutl > 0))
    })
    test('Valida con un 2032-11-11', () => {
      const resutl = objVali.convert_date_minisecons('2032-11-11')
      expect(false).toBe(!(resutl > 0))
    })
    test('Valida con un 2032-15-11 - error', () => {
      const resutl = objVali.convert_date_minisecons('2032-15-11')
      expect(true).toBe(!(resutl > 0))
    })
    test('Valida con un 2032-20-11 - error', () => {
      const resutl = objVali.convert_date_minisecons('2032-20-11')
      expect(true).toBe(!(resutl > 0))
    })
  })
})
