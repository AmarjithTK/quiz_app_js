
const accesskey = localStorage.getItem('access')

console.log(accesskey)



const TriggerConnection = (callback) => {

    const connect = new XMLHttpRequest()



    connect.addEventListener('readystatechange', () => {

        if (connect.readyState === 4 && connect.status === 200) {
            Questiondata = JSON.parse(connect.responseText)
            callback(undefined, Questiondata)
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

const question = document.querySelector('h1')





var correctAnswer
var questionIndex
var Questiondata
var questions

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

    question.innerHTML = questions


}


const CheckAnswer = (GivenAnswer) => {

    if (correctAnswer == GivenAnswer.innerHTML)
        GivenAnswer.classList.add('right_answer')
    else
        GivenAnswer.classList.add('wrong_answer')


    QuestionKeeper.push({ Qnumber: questionIndex + 1, Qn: questions, CA: correctAnswer, GA: GivenAnswer.innerHTML })
    questionIndex++

    

    console.log(QuestionKeeper,questionIndex)


    if (questionIndex != 25) {
        setTimeout(() => {


            GivenAnswer.classList.remove(GivenAnswer.classList[GivenAnswer.classList.length - 1])

            setTimeout(() => {
                generateQuestions(Questiondata, questionIndex)
            }, 100)




        }, 500)
    }
    else{


        // DisplayResults(QuestionKeeper)
        document.body.innerHTML = ''


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
































// form.addEventListener('submit', event => {
//     event.preventDefault()

//     let score = 0

//     const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value]


//     userAnswers.forEach((answer, index) => {

//         if (answer == correctAnswer[index])
//             score += 25;




//     })

//     scrollTo(0, 0)

//     resultDiv.classList.remove('d-none')




//     let output = 0;

//     const timer = setInterval(() => {

//         resultSpan.textContent = `${output} %`;

//         if (output == score)
//             clearInterval(timer)
//         else {
//             output++
//         }

//     }, 30)




// })



// set timeout

setInterval(() => {

}, 2000)