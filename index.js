
import ProjectList from './components/project-list.js';

const newProjectList = new ProjectList();



newProjectList.render();



window.addEventListener("scroll", () => {
    newProjectList.checkPageHeight();
});

