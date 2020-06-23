 //added navigation scripts



 var inputfield = Array.from(document.querySelectorAll('input[type="number"]'))
 var select = document.querySelector('select')

 console.log(inputfield, select)

 var forms = document.querySelector('form')

 forms.addEventListener('keypress', (e) => {
     if (e.which == 13)
         e.preventDefault()


 })


 const callback = (input) => {
     console.log(input.target);


     if (input.which == 13 || input.target == select) {
         const abc = input.target
         abc.nextElementSibling.focus();

         //    input.target.nextSibling.focus()
     }
 }




 inputfield.forEach(inputs => {
     inputs.addEventListener('keyup', (input) => callback(input))
 })


 select.addEventListener('change', (e) => {
     console.log(e);

     callback(e)
 })

 console.log(inputfield);



 const category = document.querySelector('.category');
 const difficulty = document.querySelector('.difficulty');
 const amount = document.querySelector('#trivia_amount');
 const form = document.querySelector('.js__form')


 form.addEventListener('submit', (e) => {
     e.preventDefault()

     const Category = category.options[category.selectedIndex].value
     const Difficulty = difficulty.options[difficulty.selectedIndex].text.toLowerCase();
     const Amount = amount.value
     console.log(Difficulty)
     generateLink(Category, Difficulty, Amount)


 })


 const generateLink = (Category, Difficulty, Amount) => {


     let accesskey
     if (Category > 8)
         accesskey = `https://opentdb.com/api.php?amount=${Amount}&category=${Category}&difficulty=${Difficulty}&type=multiple`
     else
         accesskey = `https://opentdb.com/api.php?amount=${Amount}&difficulty=${Difficulty}&type=multiple`



     localStorage.setItem('access', accesskey)
         //   localStorage.setItem('no',accesskey)

     console.log(localStorage.getItem('access'))

     redirect()

 }


 const redirect = () => {

     window.location = "quiz.html"
 }