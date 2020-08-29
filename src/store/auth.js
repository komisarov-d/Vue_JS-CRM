import firebase from "firebase/app";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                return  commit('setError', e)

            }
        },

        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name: name
                })
            } catch (e) {
                commit('setError', e)

            }
        },
        async logout() {
            await firebase.auth().signOut()
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}