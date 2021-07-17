import Cookies from 'js-cookie';

const TokenKey = 'token'
const RefreshTokenKey = 'refresh-token'

export function getToken(): string {
    return Cookies.get(TokenKey) || ""
}

export function setToken(token: string): string {
    return Cookies.set(TokenKey, token) || ""
}

export function getRefreshToken(): string {
    return Cookies.get(RefreshTokenKey) || ""
}

export function setRefreshToken(refreshToken: string): string {
    return Cookies.set(RefreshTokenKey, refreshToken) || ""
}

export function removeToken(): void {
    Cookies.remove(TokenKey)
    Cookies.remove(RefreshTokenKey)
}