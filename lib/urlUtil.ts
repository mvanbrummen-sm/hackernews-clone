export const getDomain = (url: string) => {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
}