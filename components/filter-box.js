import Component from '../lib/component.js';
import store from '../store/index.js';
import ProjectItem from './project-item.js';
import ProjectList from './project-list.js';

export default class FilterBox extends Component {
    constructor(project) {
        super({
            store,
            element: document.querySelector('.filter-wrapper')
        });
        this.project = project;
    }

    shouldRerender() { return false; }

    filterByPeriod() { }

    render() {
        let filterBox = `
       <form class="filter-content">
                <ul class="filter-list">
                    <li class="filter-item-group price-filter">
                        <p class="filter-tag">Price</p>
                        <div id="slider-range"></div>

                        <div class="price__range-value">
                            <span class="price__min-value"></span>
                            -
                            <span class="price__max-value"></span>
                        </div>
                        </div>
                    </li>
                    <li class="filter-item-group">
                        <p class="filter-tag">Stack</p>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="JavaScript" name="JavaScript"><span
                                class="geekmark"></span><label for="JavaScript">JavaScript</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="CSS" name="CSS"><span class="geekmark"></span><label
                                for="CSS">CSS</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="HTML" name="HTML"><span class="geekmark"></span><label
                                for="HTML">HTML</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="React" name="React"><span class="geekmark"></span><label
                                for="React">React.js</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="Vue" name="Vue"><span class="geekmark"></span><label
                                for="Vue">Vue.js</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="Angular" name="Angular"><span class="geekmark"></span><label
                                for="Angular">AngularJS</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="Bootstrap" name="Bootstrap"><span class="geekmark"></span><label
                                for="Bootstrap">Bootstrap</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" class="stack-checkbox" id="jQuery" name="jQuery"><span class="geekmark"></span><label
                                for="jQuery">jQuery</label>
                        </div>


                    </li>
                    <li class="filter-item-group">
                        <p class="filter-tag">Period</p>
                        <div class="radio-item">
                            <input type="radio" class="period-radio" id="today" name="period" value="today"><span class="radio-geekmark"></span><label
                                for="today">Today</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" class="period-radio" id="three-days" name="period" value="three-days"><span
                                class="radio-geekmark"></span><label for="three-days">3 days</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" class="period-radio" id="week" name="period" value="week"><span class="radio-geekmark"></span><label
                                for="week">Week</label>
                        </div>
                    </li>
                    <li class="filter-item-group reset-filter-wrapper">
                        <button id="resetBtn" type="reset" value="Reset">Reset Filter</button>
                    </li>
                </ul>
            </form>
       `;


        this.element.innerHTML = filterBox;

        $('.geekmark').on("click", event => {
            let checkboxArea = $(event.target).siblings().get(0);
            let checkBox = $(event.target).siblings().get(1);
            let domResultsList = document.querySelector('.results-list');
            let projectsArray = store.state.projects;
            let userStackArray = store.state.filter.stack;

            checkboxArea.checked = !checkboxArea.checked;

            if (checkboxArea.checked === true && checkboxArea.classList.contains('stack-checkbox')) {
                store.dispatch('storeUserStack', checkBox.textContent);
                domResultsList.innerHTML = "";
                for (let i = 0; i < projectsArray.length; i++) {
                    let storeProjectsJobsArray = projectsArray[i].jobsList;

                    if (userStackArray.every(val => storeProjectsJobsArray.includes(val)) === true) {

                        new ProjectItem(projectsArray[i]).render();

                    }

                }

            } else {

                for (let i = 0; i < userStackArray.length; i++) {

                    if (userStackArray[i] === checkBox.textContent) {

                        store.dispatch('deleteUserStack', userStackArray[i]);

                    }

                }

                domResultsList.innerHTML = "";
                for (let j = 0; j < projectsArray.length; j++) {

                    let storeProjectsJobsArray = projectsArray[j].jobsList;

                    if (userStackArray.every(val => storeProjectsJobsArray.includes(val)) === true) {


                        new ProjectItem(projectsArray[j]).render();

                    }
                }

                console.log(userStackArray);

            }

        });

        $('.radio-geekmark').on("click", event => {
            let radioButtonArea = $(event.target).siblings().get(0);
            let radioButton = $(event.target).siblings().get(1);
            let domResultsList = document.querySelector('.results-list');
            let allRadioButtons = document.querySelectorAll('.period-radio');
            let projectsArray = store.state.projects;
            let storeFilterPeriod = store.state.filter.period;
            let todayRadio = $('#today');
            let threeDayRadio = $('#three-days');
            let weekRadio = $('#week');



            for (let radioBtn of allRadioButtons) {
                if (radioButtonArea === radioBtn) {
                    radioButtonArea.checked = true;
                    
                    
                }
            }
            

            if (radioButtonArea.checked === true && radioButtonArea.classList.contains('period-radio')) {
                store.dispatch('storeUserPeriod', radioButton.textContent);

                domResultsList.innerHTML = "";
                let filteredToday = store.state.filter.period['Today'];
                let filteredThreeDays = store.state.filter.period['3 days'];
                let filteredWeek = store.state.filter.period['Week'];
                let today = new Date();
                let todayTimeStamp = today.setDate(today.getDate());
                let todaysMonth = today.getMonth() + 1;
                let todaysDay = today.getDate();
                let yesterday = new Date(today);
                let yesterdaysDayAsTimeStamp = yesterday.setDate(yesterday.getDate() - 1);
                let yesterdaysFullDate = new Date(yesterdaysDayAsTimeStamp);
                let yesterdaysDate = yesterdaysFullDate.getDate();
                let yesterdaysMonth = yesterdaysFullDate.getMonth() + 1;
                let threeDaysFromNow = new Date(today);
                let threeDaysFromNowStamp = threeDaysFromNow.setDate(threeDaysFromNow.getDate() - 3);
                let fullthreeDaysFromNowDate = new Date(threeDaysFromNowStamp);

                for (let i = 0; i < projectsArray.length; i++) {
                    let projectDate = new Date(projectsArray[i].projectDate * 1000);
                    let projectMonth = projectDate.getMonth() + 1;
                    let projectDay = projectDate.getDate();
                    if (`${projectDay}, ${projectMonth}` === `${todaysDay}, ${todaysMonth}` && filteredToday === true) {

                        new ProjectItem(projectsArray[i]).render();

                    } else if (projectDate <= todayTimeStamp && projectDate >= threeDaysFromNowStamp && filteredThreeDays === true) {
                        new ProjectItem(projectsArray[i]).render();
                    } else if (filteredWeek === true) {
                        new ProjectItem(projectsArray[i]).render();
                    }

                }

            } 

        });

        $(function () {
            $("#slider-range").slider({
                range: true,
                step: 1,
                min: 1,
                max: 5000,
                values: [1, 5000],
                slide: function (event, ui) {
                    $(".price__min-value").val("$" + ui.values[0]);
                    $(".price__max-value").val("$" + ui.values[1]);


                },
                change: function (event, ui) {
                    store.dispatch('storeUserPrice', { min: ui.values[0], max: ui.values[1] });
                    let minPrice = store.state.filter.price.min;
                    let maxPrice = store.state.filter.price.max;
                    let projectsArray = store.state.projects;
                    let domResultsList = document.querySelector('.results-list');
                    domResultsList.innerHTML = "";

                    for (let i = 0; i < projectsArray.length; i++) {

                        if (projectsArray[i].budgetMinimum >= minPrice && projectsArray[i].budgetMaximum <= maxPrice) {

                            new ProjectItem(projectsArray[i]).render();

                        }

                    }
                }

            });

            $("#slider-range").on("slide", function (event, ui) {
                $(".price__min-value").html("$" + ui.values[0]);
                $(".price__max-value").html("$" + ui.values[1]);
            });


            $(".price__min-value").html("$" + $("#slider-range").slider("values", 0));
            $(".price__max-value").html("$" + $("#slider-range").slider("values", 1));



        });

        $("#resetBtn").on("click", () => {
            $("#slider-range").slider("option", "values", [1, 5000]);
            $(".price__min-value").html("$" + $("#slider-range").slider("values", 0));
            $(".price__max-value").html("$" + $("#slider-range").slider("values", 1));
        })

    }
}