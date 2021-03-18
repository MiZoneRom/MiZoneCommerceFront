const TOKEN_KEY = 'MCS_ADMIN_TOKEN'
const ADMIN_KEY = 'MCS_ADMIN'
const REFRESH_TOKEN_KEY = 'MCS_ADMIN_REFRESH_TOKEN'

// 获取 token
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}
// 保存 token
export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token)
}
// 获取 refreshtoken
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}
// 保存 refreshtoken
export function setRefreshToken(token) {
    return localStorage.setItem(REFRESH_TOKEN_KEY, token)
}
// 获取用户信息
export function getAdmin() {
    return localStorage.getItem(ADMIN_KEY)
}
//保存用户信息
export function setAdmin(admin) {
    localStorage.setItem(ADMIN_KEY, admin)
}
//移除用户信息
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}