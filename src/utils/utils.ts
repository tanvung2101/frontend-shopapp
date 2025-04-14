const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

  export function formatNumberToSocialStyles(value: number) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    })
      .format(value)
      .replace(".", ",")
      .toLocaleLowerCase();
}


export const rateSale = (original: number, sale: number) =>
  Math.round(((original - sale) / original) * 100) + "%";


export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
