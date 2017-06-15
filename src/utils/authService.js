
export function saveCookie (name, value) {
  localStorage.setItem(name, value)
}

export function getCookie (name) {
  return localStorage.getItem('token')
}

export function signOut () {
  localStorage.removeItem('token')
}

export function isLogin () {
  return !!localStorage.getItem('token')
}
