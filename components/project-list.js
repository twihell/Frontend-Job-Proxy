import Component from '../lib/component.js';
import store from '../store/index.js';
import ProjectItem from './project-item.js';


const currentTime = new Date() / 1000;
const GENERAL_URL = `https://www.freelancer.com/api/projects/0.1/projects/active?full_description=true&project_types[]=fixed&query=frontend&languages[]=en&job_details=true&to_time=${currentTime}`;
const HEADER = { 'freelancer-oauth-v1': 'XLeKZUitt7wVQKNtfdltpyc7sOxNYp' };

export default class ProjectList extends Component {

    constructor() {
        super({
            store,
            element: document.querySelector('.results-list')
        });
    }

    getProjects() {
        let request = fetch(GENERAL_URL, { headers: HEADER });

        request.then(response => response.json())
            .then(data => {
                store.dispatch('getProjects', { 'projects': data.result.projects, 'count': data.result.total_count });
            })
            .catch(err => console.log("Ошибка HTTP: ", err));

    }


    render() {
        let projectsArray = store.state.projects;
        let projectDivElements = this.element.childNodes;
        let domElementIdSet = new Set();
        let projectIdSet = new Set();

        if (projectsArray.length === 0) {
            this.getProjects();
            return;
        }

        for (let i = 0; i < projectsArray.length; i++) {
            projectIdSet.add(projectsArray[i].projectId);
        };

        for (let j = 0; j < projectDivElements.length; j++) {
            domElementIdSet.add(+projectDivElements[j].getAttribute('data-id'));
        };

        let differenceSet = new Set([...projectIdSet].filter(id => !domElementIdSet.has(+id)));

        for (let i = 0; i < projectsArray.length; i++) {

            if (differenceSet.has(Number(projectsArray[i].projectId))) {
                
                new ProjectItem(projectsArray[i]).render();
            }

        }

    }

    // for (let itemId of projectsArray) {
    //     new ProjectItem(itemId).render()
    // }
};