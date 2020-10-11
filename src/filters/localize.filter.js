import store from "@/store"

import ruRU from "@/locales/ruRu.json"
import enUs from "@/locales/enUs.json"

export const languageName={
  "en-US": "English",
  "ru-RU": "Русский",
}

export const languageProperty = {
  "en-US": "eng",
  "ru-RU": "rus",
}

const locales = {
  "ru-RU": ruRU,
  "en-US": enUs,
}

export default function localizeFilter(path) {
  try {
    const [component, key] = path.split("/")
    const locale = store.state.locale

    return locales[locale][component][key] || "[Localize Error]"
  } catch (e) {
    return "[Localize Error]"
  }
}
