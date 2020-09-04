import localizeFilter from "@/filters/localize.filter";

export default {
    'LogoutMessage': localizeFilter('logout'),
    'Login':  localizeFilter('LoginMessage'),
    "auth/user-not-found":  localizeFilter('auth/user-not-found'),
    'auth/wrong-password':  localizeFilter('auth/wrong-password'),
    'auth/email-already-in-use':  localizeFilter('auth/email-already-in-use')
}