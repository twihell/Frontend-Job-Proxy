export default {
    getProjects(context, payload) {

        context.commit('getProjects', payload);

    },

    setTotalCount(context, payload) {
        context.commit('setTotalCount', payload);
    },

    storeUserPrice(context, payload) {
        context.commit('storeUserPrice', payload);
    },

    storeUserStack(context, payload) {
        context.commit('storeUserStack', payload);
    },

    deleteUserStack(context, payload) {
        context.commit('deleteUserStack', payload);
    },
    storeUserPeriod(context, payload) {
        context.commit('storeUserPeriod', payload);
    },
    deleteUserPeriod(context, payload) {
        context.commit('deleteUserPeriod', payload);
    }
}