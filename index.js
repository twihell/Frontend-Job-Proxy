
import ProjectList from './components/project-list.js';

const newProjectList = new ProjectList();
const resetFilterButton = document.querySelector('.reset-filter');
const filterBox = document.querySelector('.filter-content');



newProjectList.render();



window.addEventListener("scroll", () => {
    newProjectList.checkPageHeight();
});



resetFilterButton.addEventListener("click", () => {
    console.log('clicked');
    filterBox.reset();
})