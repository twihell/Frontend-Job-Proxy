import Component from '../lib/component.js';
import store from '../store/index.js';
import ProjectItem from './project-item.js';


const currentTime = new Date() / 1000;
const pageSize = 10;
const GENERAL_URL = `https://www.freelancer.com/api/projects/0.1/projects/active?full_description=true&limit=10&project_types[]=fixed&query=frontend&languages[]=en&job_details=true&to_time=${currentTime}`;
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



    // loadMore() {

    //     for (let offset = 0; offset + pageSize < store.state.totalCount; offset += 10) {
    //         if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight) {
    //             this.getProjects(offset);
    //         }

    //     }


    // }



    render() {
        let projectsArray = Object.keys(store.state.projects);
        let projectDivElements = this.element.childNodes;

        if (projectsArray.length === 0) {
            this.getProjects();
            return;
        }


        //Loop through the items and generate a list of elements


        for (let item of projectsArray) {
            
          
            // if (projectDivElements.length > 0) {
            //     console.log(projectDivElements[i]);
            // }
            
            new ProjectItem(store.state.projects[item]).render();
            // console.log(store.state.projects[`${item}`]);

        }

    }



    // for (let itemId of projectsArray) {
    //     new ProjectItem(itemId).render()
    // }


};