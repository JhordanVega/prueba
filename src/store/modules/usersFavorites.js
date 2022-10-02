export const namespaced = true;

export const state = {
    usersFavorites: [],
};

export const mutations = {
    ADD_USER_FAVORITE(state, user) {
        const obj = state.usersFavorites.find(x => x.id.name === user.id.name
            && x.id.value === user.id.value)
        if(!obj){
            const newUser = {...user, isFavorite: true}
            state.usersFavorites.push(newUser)
        }
    },
    REMOVE_USER_FAVORITE(state, user) {
        const filtered = state.usersFavorites.filter(x => x.id.name !== user.id.name
            && x.id.value !== user.id.value)
        state.usersFavorites = filtered
    },
};

export const actions = {
    
};

export const getters = {
    usersFavorites(state) {
        return state.usersFavorites;
    },
};
