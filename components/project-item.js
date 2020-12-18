import Component from '../lib/component.js';
import store from '../store/index.js';


export default class ProjectItem extends Component {
    constructor(project) {
        super({
            store,
            element: document.querySelector('.results-list')
        });
        this.project = project;
    }

    getFormattedDate(timeStamp) {
        let currentDate = new Date(timeStamp * 1000);
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        return `${day}.${month}.${year}`;
    }

    getFormattedTime(timeStamp) {
        let currentDate = new Date(timeStamp * 1000);
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return `${hours}:${minutes}`;
    }

    shouldRerender() {return false;}

    render() {
        // let project = store.state.projects[this.projectId];
    
        let div = document.createElement("div");
        let tagSpan = this.project.jobsList.map(
            item => `<span class="project-tag">${item}</span>`).join(" ");

        div.innerHTML = ` 
        <div class="row">
        <div class="first-column">
        <h2 class="project-title">${this.project.title}</h2>
        <p class="project-description">${this.project.projectDescription.split(/\.+/g, 2).join('.')}.</p>
        <div class="tag-block">
           ${tagSpan}
        </div>
    </div>
    <div class="second-column">
        <h2 class="project-price">${this.project.currency} ${this.project.budgetMinimum}-${this.project.budgetMaximum}</h2>
        <div class="project-date-wrapper">
        <p class="project-date">${this.getFormattedDate(this.project.projectDate)}</p>
        <p class="project-time">${this.getFormattedTime(this.project.projectDate)}</p>
        </div>
        <a href="https://www.freelancer.com/projects/${this.project.jobLink}" target="_blank" class="learn-more-link">Learn more</a>
    </div>
    </div>
    `


        div.classList.add(`results-list__item`);
     
        div.dataset.id = this.project.projectId;


        this.element.appendChild(div);




    }
}