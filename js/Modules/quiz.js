

export class Quiz {
    constructor(allData) {
        this.allData = allData;
        this.currentQ = 0;
        this.numOfQuestions = this.allData.length;
        this.score = 0;
        this.showQ();

        document.getElementById("next").addEventListener("click", this.checkAnswer.bind(this));
    }

    showQ() {

        document.getElementById("question").innerHTML = this.allData[this.currentQ].question;
        document.getElementById("qNum").innerHTML = `Q${this.currentQ + 1}: `
        document.getElementById("currentQuestion").innerHTML = this.currentQ + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numOfQuestions;
        this.showA();
    }


    showA() {

        // Putting 2 NodeList Elements Inside One Array
        this.answers = [...this.allData[this.currentQ].incorrect_answers, this.allData[this.currentQ].correct_answer];

        // Rondomize Answers
        this.shuffle(this.answers);


        this.str = "";

        for (let i = 0; i < this.answers.length; i++) {
            this.str += `
                <div class="form-check">
                    
                    <label class = "answerLabel">
                        <input type="radio" class="form-check-input" name="answer" id="a${i}"value="${this.answers[i]}">
                        ${this.answers[i]}
                    </label>

                </div>
            `;
        }

        console.log(this.allData[this.currentQ].correct_answer);
        document.getElementById("rowAnswer").innerHTML = this.str;

    }



    checkAnswer() {
        this.answersInp = document.getElementsByName("answer");

        this.userAnswer = [...this.answersInp].filter(value => value.checked)[0].value;
        this.correctAnswer = this.allData[this.currentQ].correct_answer;

        if (this.correctAnswer == this.userAnswer) {
            this.score++;
            $("#Correct").fadeIn(500, ()=> {
                $("#Correct").fadeOut(500);
            });
        } else {
            $("#inCorrect").fadeIn(500, ()=> {
                $("#inCorrect").fadeOut(500);
            });
        }
        this.currentQ++;

        this.currentQ < this.numOfQuestions ?
        this.showQ() :
        this.showScore();
    }


    showScore() {
        $("#quiz").fadeOut(500, ()=> {
            $("#finish").fadeIn(500);
        });

        document.getElementById("score").innerHTML = `${this.score}/${this.numOfQuestions}`;

        document.getElementById("tryBtn").addEventListener("click", function() {
            $("#finish").fadeOut(500, ()=> {
                $("#setting").fadeIn(500);
            });
        });
    }




    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}