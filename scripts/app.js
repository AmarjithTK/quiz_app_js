const loader = document.querySelector('.loader')

const QuestionSpace = document.querySelector('h2')

const questiontracker = document.querySelector('.question_tracker')

const QButton = Array.from(document.querySelectorAll('button'))

const QuizBrain = new Quizbrain()


QuizBrain.TriggerConnection()
    .then(data => {
        QuizBrain.generateQuestions(data)
        RemoveLoader()
    })
    .catch(err => console.log(err))



const RemoveLoader = () => {
    setTimeout(() => {
        loader.style.display = 'none'
    },
        1000)
}


QButton.forEach(button => {
    button.addEventListener('click', (e) => {

        QuizBrain.CheckAnswer(button)



    })
})




const showResult = (ScoreKeeper, QuestionKeeper) => {


    const ScoreTemplate = `<div class="score__template" style="min-height:100%;">
    <div class="wrapper">
        <div class="card text-center" style="max-width: 25rem;">

            <div class="card-body">
                <h4 class="card-title text-primary my-4"
                    style="font-family: 'Montserrat', sans-serif; font-weight:900">You have scored</h4>
                <h1 class="card-text text-primary my-1"
                    style="font-family: 'Montserrat', sans-serif; font-weight:900">${ScoreKeeper} &nbsp;/ &nbsp;
                    ${QuizBrain.data.results.length} </h1>

            </div>
            <div class="card-body">
                <button type="button" class="btn btn-primary mx-1 show_answer"
                    style="font-family: 'Montserrat', sans-serif; font-weight:900">Show Answers</button>
                <a href="index.html"><button type="button" class="btn btn-primary mx-1"
                        style="font-family: 'Montserrat', sans-serif; font-weight:900">play again</button></a>
            </div>
        </div>
    </div>
</div>

<style>
body{
    background-color:#007bff;
}
</style>

`

    document.body.innerHTML = ScoreTemplate;

    const show_answer = document.querySelector('.show_answer')

    show_answer.addEventListener('click', () => { ShowAnswer(QuestionKeeper, ScoreKeeper) })

}



const ShowAnswer = (ScoreKeeper) => {

    document.body.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-primary text-light">

<h3 class="text-light my-5 mx-4"  style="font-family: 'Montserrat', sans-serif; font-weight:900"> <a href="index.html"><i class="fas fa-long-arrow-alt-left mx-4"
            style="color: white; vertical-align: middle;"></i></a> Quizee <span
        class="badge badge-dark">Trivia</span></h2>


</nav>`;



    document.body.style.backgroundColor = '#007bff'
    for (let index = 0; index < QuizBrain.QuestionKeeper.length; index++) {
        const ActualQuestion = QuizBrain.QuestionKeeper[index].Qn;
        const ActualAnswer = QuizBrain.QuestionKeeper[index].CA;
        const ActualChoice = QuizBrain.QuestionKeeper[index].GA;

        if (ActualAnswer == ActualChoice) {
            document.body.innerHTML += `

            <div class="container my-2 justify-content-center d-flex">
            <div class="results_content w-100" style="border-color:green;">
            
                <h6 class="qn_number"> Question ${index + 1} </h6>
                <h4 class="qn">${ActualQuestion}</h4>
                <h5 class="canswer">Correct Answer &nbsp;-&nbsp ${ActualAnswer}</h5>
               
            </div>
          </div
            `
        }
        else {
            document.body.innerHTML += `

            <div class="container my-2 justify-content-center d-flex">
            <div class="results_content w-100" style="border-color:red;">
            
                <h6 class="qn_number"> Question ${index + 1} </h6>
                <h4 class="qn">${ActualQuestion}</h4>
                <h5 class="ganswer">Your Answer &nbsp;-&nbsp ${ActualChoice}</h5>
                <h5 class="canswer">Correct Answer &nbsp;-&nbsp ${ActualAnswer}</h5>
               
            </div>
          </div
            `

        }






    }






}






function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// const generateInputField = (AllOptions, data) => {


//     var numbers = [0, 1, 2, 3];

//     let random = shuffle(numbers)
//     let index = 0

//     QButton.forEach(Button => {
//         // console.log(random)
//         // console.log(AllOptions)


//         Button.innerHTML = AllOptions[random[index]]
//         index++

//     })

// }
































