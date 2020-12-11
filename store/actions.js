export default {
    getProjects(context, payload) {

        context.commit('getProjects', payload);

    },

    setTotalCount(context, payload) {
        context.commit('setTotalCount', payload);
    }
}