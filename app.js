
const accesskey = localStorage.getItem('access')

console.log(accesskey)

const loader = document.querySelector('.loader')



const RemoveLoader = () => {
    setTimeout(()=>{
        loader.style.display = 'none'
    },
    1000)
}


const TriggerConnection = (callback) => {

    const connect = new XMLHttpRequest()



    connect.addEventListener('readystatechange', () => {

        if (connect.readyState === 4 && connect.status === 200) {
            Questiondata = JSON.parse(connect.responseText)
            callback(undefined, Questiondata)
            console.log(Questiondata)
            RemoveLoader()
        } else if (connect.readyState === 4) {
            callback('The connection established but no data collected', connect.responseText)
        }





    })
    // 'https://opentdb.com/api.php?amount=10&type=multiple'

    connect.open('GET', accesskey)

    connect.send()


}








TriggerConnection((err, data) => {

    // console.log('callback function fired')

    if (err) {
        console.log(err)
  
        
    } else (
        generateQuestions(data, 0)
    )

})


const buttons = document.querySelectorAll('button')

const question = document.querySelector('h2')

const questiontracker = document.querySelector('.question_tracker')



var correctAnswer
var questionIndex
var Questiondata
var questions
var ScoreKeeper = 0

let QuestionKeeper = new Array()

button = Array.from(buttons)


button.forEach(button => {
    button.addEventListener('click', (e) => {

        CheckAnswer(button)



    })
})












const generateQuestions = (data, questionnumber) => {

    // console.log(data)


    questionIndex = questionnumber


    // console.log(data,'this is the data')
    correctAnswer = data.results[questionIndex].correct_answer;
    const AllOptions = data.results[questionIndex].incorrect_answers
    questions = data.results[questionIndex].question

    AllOptions.push(correctAnswer);

    generateInputField(AllOptions, data)

    questiontracker.innerHTML = `Question ${questionIndex+1}&nbsp;/&nbsp;${Questiondata.results.length}`
  
    question.innerHTML = `${questions} `



}


const CheckAnswer = (GivenAnswer) => {

    if (correctAnswer == GivenAnswer.innerHTML){
        GivenAnswer.classList.add('right_answer')
        ScoreKeeper++

    }
    else
        GivenAnswer.classList.add('wrong_answer')


    QuestionKeeper.push({ Qnumber: questionIndex + 1, Qn: questions, CA: correctAnswer, GA: GivenAnswer.innerHTML })
    questionIndex++

    

    console.log(QuestionKeeper,questionIndex)


    if (questionIndex != Questiondata.results.length) {
        setTimeout(() => {


            GivenAnswer.classList.remove('wrong_answer')
            GivenAnswer.classList.remove('right_answer')

            setTimeout(() => {
                generateQuestions(Questiondata, questionIndex)
            }, 100)




        }, 500)
    }
    else{


        setTimeout(() => {
            showResult(ScoreKeeper,QuestionKeeper)
        }, 1000)

      


    }


}


const showResult = (ScoreKeeper,QuestionKeeper) => {
    

const ScoreTemplate = `<div class="container" style="min-height:100vh;">
<div class="wrapper">
    <div class="card text-center" style="max-width: 25rem;">

        <div class="card-body">
            <h4 class="card-title text-primary my-4"  style="font-family: 'Montserrat', sans-serif; font-weight:900">You have scored</h4>
            <h1 class="card-text text-primary my-1"  style="font-family: 'Montserrat', sans-serif; font-weight:900">${ScoreKeeper} &nbsp;/ &nbsp;${Questiondata.results.length}</h1>

        </div>
        <div class="card-body">
            <button type="button" class="btn btn-primary mx-1 show_answer"  style="font-family: 'Montserrat', sans-serif; font-weight:900">Show Answers</button>
            <a href="index.html"><button type="button" class="btn btn-primary mx-1"  style="font-family: 'Montserrat', sans-serif; font-weight:900">play again</button></a>
        </div>
    </div>
</div>
</div>

<style>
body{
    background-color:#007bff;
}

.container{
    min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
`

document.body.innerHTML = ScoreTemplate;


const show_answer = document.querySelector('.show_answer')

show_answer.addEventListener( 'click',()=> {
    ShowAnswer(QuestionKeeper,ScoreKeeper)
}

)

}



const ShowAnswer = (ScoreKeeper) => {

document.body.innerHTML= `
<nav class="navbar navbar-expand-lg navbar-light bg-primary text-light">

<h3 class="text-light my-5 mx-4"  style="font-family: 'Montserrat', sans-serif; font-weight:900"> <a href="index.html"><i class="fas fa-long-arrow-alt-left mx-4"
            style="color: white; vertical-align: middle;"></i></a> Quizee <span
        class="badge badge-dark">Trivia</span></h2>


</nav>`


document.body.style.backgroundColor = '#007bff'
    for (let index = 0; index < QuestionKeeper.length; index++) {
        const ActualQuestion = QuestionKeeper[index].Qn;
        const ActualAnswer = QuestionKeeper[index].CA;
        const ActualChoice = QuestionKeeper[index].GA;
        
        if(ActualAnswer==ActualChoice){
            document.body.innerHTML+= `

            <div class="container my-2 justify-content-center d-flex">
            <div class="results_content w-100" style="border-color:green;">
            
                <h6 class="qn_number"> Question ${index+1} </h6>
                <h4 class="qn">${ActualQuestion}</h4>
                <h5 class="canswer">Correct Answer &nbsp;-&nbsp ${ActualAnswer}</h5>
               
            </div>
          </div
            `
        }
        else{
            document.body.innerHTML+= `

            <div class="container my-2 justify-content-center d-flex">
            <div class="results_content w-100" style="border-color:red;">
            
                <h6 class="qn_number"> Question ${index+1} </h6>
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


const generateInputField = (AllOptions, data) => {


    var numbers = [0, 1, 2, 3];

    let random = shuffle(numbers)
    let index = 0

    button.forEach(button => {
        // console.log(random)
        // console.log(AllOptions)


        button.innerHTML = AllOptions[random[index]]
        index++

    })

}
































