
function groupby(keygroup: any = '', array: Array<any> = []) {
  const arraybas = {}
  array.forEach((item) => {
    let key = item[keygroup];
    if (arraybas.hasOwnProperty(key)) {
      arraybas[key].push(item);
    } else {
      arraybas[key] = [];
      arraybas[key].push(item);
    }
  })

  return arraybas;
}

export default groupby;