const JSON = window.JSON
const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

export const local = {
  getItem(name) {
    let value = localStorage.getItem(name)
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
    return value
  },
  setItem(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(name, value)
  },
  removeItem(name) {
    return localStorage.removeItem(name)
  }
}

export const session = {
  getItem(name) {
    let value = sessionStorage.getItem(name)
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
    return value
  },
  setItem(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return sessionStorage.setItem(name, value)
  },
  removeItem(name) {
    return sessionStorage.removeItem(name)
  }
}
