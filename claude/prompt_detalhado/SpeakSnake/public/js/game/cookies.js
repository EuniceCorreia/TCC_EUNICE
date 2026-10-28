/**
 * Utilitário de cookies compartilhado.
 */

export function getCookie(name) {
    const rawCookies = `; ${document.cookie}`;
    const parts = rawCookies.split(`; ${name}=`);

    if (parts.length !== 2) {
        return null;
    }

    return parts.pop().split(';').shift();
}

export function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}
