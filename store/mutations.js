export default {
    getProjects(state, payload) {
        let projects = payload.projects;

        state.totalCount = payload.count;
        for (let i = 0; i < projects.length; i++) {

            let project = projects[i];
            let jobsList = [];

            let projectId = project.id;
            let projectDescription = project.description;
            let projectDate = project.submitdate;
            let budgetMinimum = project.budget.minimum;
            let budgetMaximum = project.budget.maximum;
            let title = project.title;
            let currency = project.currency.sign;
            let jobLink = project.seo_url;
            let jobs = project.jobs;

            for (let item in jobs) {
                let jobName = jobs[item].name;
                jobsList.push(jobName);

            }



            if (state.projects.includes(project)) {
                return;
            }

            if (currency === "$") {
                state.projects.push({
                    projectId,
                    projectDescription,
                    projectDate,
                    budgetMinimum,
                    budgetMaximum,
                    title,
                    currency,
                    jobsList,
                    jobLink
                });
            }



        }

        return state;
    },
    storeUserPrice(state, priceRange) {
        let minUserPrice = priceRange.min;
        let maxUserPrice = priceRange.max;

        state.filter.price.min = minUserPrice;
        state.filter.price.max = maxUserPrice;

        return state;

    },
    storeUserStack(state, stackItem) {

        let stackArray = state.filter.stack;

        stackArray.push(stackItem);
        return state;
    },

    deleteUserStack(state, stackItem) {
        let stackArray = state.filter.stack;

        for (let i = 0; i < stackArray.length; i++) {

            if (stackArray[i] === stackItem) {
                stackArray.splice(i, 1);

            }
        }

        return stackArray;
    },

    storeUserPeriod(state, period) {
        
        let filteredPeriod = state.filter.period;
        
        for (let prop in filteredPeriod) {
            filteredPeriod[prop] = false;
        }

        filteredPeriod[`${period}`] = true;
       
        return state;
    },

    deleteUserPeriod(state, period) {
        let filteredPeriod = state.filter.period;
        if (filteredPeriod.hasOwnProperty(`${period}`)) {

            filteredPeriod[`${period}`] = false;
        }

        return state;
    }

}