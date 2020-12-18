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
       
        return state;
    },




}