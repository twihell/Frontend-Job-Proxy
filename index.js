
import ProjectList from './components/project-list.js';
import FilterBox from './components/filter-box.js';

const filterForm = document.querySelector(".filter-wrapper");
const newProjectList = new ProjectList();
const newFilterBox = new FilterBox();



newProjectList.render();
newFilterBox.render();

