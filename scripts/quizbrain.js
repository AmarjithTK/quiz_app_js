class Quizbrain {

    constructor() {
        this.accesskey = localStorage.getItem('access')
        this.correctAnswer
        this.questionIndex = 0
        this.Questiondata
        this.Question
        this.ScoreKeeper = 0
        this.Choices
        this.data
        this.QuestionKeeper = new Array()


    }

    async TriggerConnection() {
        const response = await fetch(this.accesskey)
        this.data = await response.json()
        console.log(this.data);
        return this.data
    }


    generateQuestions(data) {

        // console.log(data)



        this.correctAnswer = data.results[this.questionIndex].correct_answer;
        this.Choices = data.results[this.questionIndex].incorrect_answers
        this.Question = data.results[this.questionIndex].question
        this.Choices.push(this.correctAnswer);
        this.generateInputField(this.Choices, data)
        questiontracker.innerHTML = `Question ${this.questionIndex + 1}&nbsp;/&nbsp;${this.data.results.length}`
        QuestionSpace.innerHTML = `${this.Question} `
        console.log(this.Choices);
        


    }

    generateInputField(Choices) {


        var numbers = [0, 1, 2, 3];

        let random = shuffle(numbers)
        let Shuffleindex = 0

        QButton.forEach(Button => {

            Button.innerHTML = Choices[random[Shuffleindex]]
            Shuffleindex++
        })

    }

    CheckAnswer(GivenAnswer) {

        if (this.correctAnswer == GivenAnswer.innerHTML) {
            GivenAnswer.classList.add('right_answer')
            this.ScoreKeeper++

        }
        else
            GivenAnswer.classList.add('wrong_answer')


        this.QuestionKeeper.push({ Qnumber: this.questionIndex + 1, Qn: this.Question, CA: this.correctAnswer, GA: GivenAnswer.innerHTML })

        this.questionIndex++



        console.log(this.QuestionKeeper, this.questionIndex)


        if (this.questionIndex != this.data.results.length) {
            setTimeout(() => {


                GivenAnswer.classList.remove('wrong_answer')
                GivenAnswer.classList.remove('right_answer')

                setTimeout(() => {
                    this.generateQuestions(this.data, this.questionIndex)
                }, 100)




            }, 500)
        }
        else {


            setTimeout(() => {
                showResult(this.ScoreKeeper, this.QuestionKeeper)
            }, 1000)




        }


    }

}