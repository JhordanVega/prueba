const mode_env = process.env.NODE_ENV;
let domainWeb;
if (mode_env === 'production' && !process.env.VUE_APP_API_BASE) {
    domainWeb = window.location.origin;
} else {
    domainWeb = process.env.VUE_APP_API_BASE;
}
export default domainWeb;
