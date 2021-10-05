import { Quiz } from "./quiz.js";

export class Setting {
    constructor () {
        this.categoryInp = document.getElementById("category");
        this.difficultyInp = document.getElementsByName("difficulty");
        this.numOfQuesInp = document.getElementById("numberOfQuestions");

        document.getElementById("startBtn").addEventListener("click", this.getInpValues.bind(this));



    }

    async getInpValues() {
        this.category = this.categoryInp.value;
        this.difficulty = [...this.difficultyInp].filter(value => value.checked)[0].value;
        this.numOfQues = this.numOfQuesInp.value;

        if (this.numOfQues) {
            await this.fetchUrl(`https://opentdb.com/api.php?amount=${this.numOfQues}&category=${this.category}&difficulty=${this.difficulty}`);
        }
    }

    async fetchUrl (url) {
        this.reqData = await (await fetch(url)).json();

        this.allData = this.reqData.results;

        $("#setting").fadeOut(500,()=>
        {
            $("#quiz").fadeIn(500)
        });

        new Quiz (this.allData);
    }

}