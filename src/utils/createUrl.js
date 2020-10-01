export default (str) => {
  const url = str
    .split("")
    .map((l) => (l.match(/[A-Za-zА-Яа-я]/) ? l : "-"))
    .filter((v, i, arr) => !(v === "-" && v === arr[i + 1]))
  if (url[0] === "-") url.shift()
  let lengthOfUrl = url.length
  let count = 0
  for (let i = 0; i < url.length; i++) {
    if (url[i] === "-") count++
    if (count === 10) {
      lengthOfUrl = i
      break
    }
  }
  if (url[url.length - 1] === "-") url.pop()
  const returnUrl = cyrillicToLatin(url.slice(0, lengthOfUrl).join(""))

  return returnUrl
}

function cyrillicToLatin(str) {
  return str
    .split("")
    .map((l) => {
      const lower = l.toLowerCase()
      const ret = alphabet.hasOwnProperty(lower) ? alphabet[lower] : lower
      return ret
    })
    .join("")
}

const alphabet = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  "-": "-",
}
