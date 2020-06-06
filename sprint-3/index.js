var diff = 'easy' , token = "eae808a7ff8715c6260e3f701b93d0b1e9440896fd7fdddb874c249272871fa0" 
var amt = 10 , cat = 9 , count = 0 , score = 0

window.onload = function (){

    // var xhr = new XMLHttpRequest();
    // xhr.open('GET','https://opentdb.com/api_token.php?command=request')
    // xhr.send()
    // xhr.onload = function(){
    //     var res = xhr.response
    //     res = JSON.parse(res)
    //     token = res.token
    // }
    
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET','https://opentdb.com/api_category.php')
    xhr1.send()
    xhr1.onload = function(){
        var res1 = xhr1.response
        res1 = JSON.parse(res1)

        var category = document.getElementById('category')
        
        for (var x in res1.trivia_categories){
            var opt = document.createElement('option')
            opt.setAttribute('value',res1.trivia_categories[x].id)
            opt.innerText = 'Category : '+res1.trivia_categories[x].name
            category.append(opt)
        }            
    }  
    
    var temp = document.querySelectorAll('#answer_options > div')
    for (var y = 0 ; y < 4 ; y++){
        temp[y].addEventListener('mouseenter',color_change)
        temp[y].addEventListener('mouseleave',color_org)
    }

}

function difficulty_label(){
    var difficulty = document.getElementById('difficulty')
    var temp = difficulty.value
    if (temp == 1 ){ 
        diff = 'easy'
    } else if (temp == 2){
        diff = 'medium'
    }else {
        diff = 'hard'
    }
    document.getElementById('difficulty_label').innerText = 'Difficulty: '+ diff
}

function amount_label(){
    var  amount = document.getElementById('amount')
    amt = amount.value

    document.getElementById('amount_label').innerText = 'Questions Chosen: '+ amt + ' per Quiz!!'
}

function color_change(){
    var temp = event.target
    temp.style.backgroundColor = 'rgb(50, 229, 20 , 0.7)'
}

function color_org(){
    var temp = event.target
    temp.style.backgroundColor = 'rgb(174, 205, 206)'
}

function quiz_time(){
    var category = document.getElementById('category')
    cat = category.value

    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://opentdb.com/api.php?amount='+amt+'&category='+cat+'&difficulty='+diff+'&type=multiple')
    xhr.send()
    xhr.onload = function(){
        var res = xhr.response
        localStorage.setItem('current_quiz',res)
    } 
    play_quiz() 
}

function play_quiz(){

    var temp = localStorage.getItem('current_quiz')
    quiz = JSON.parse(temp)  

    if (count < amt) {
        var ques = document.getElementById('question')
        ques.innerText = quiz.results[count].question

        var start = Math.floor(Math.random()*4)

        var opt_1 = document.getElementById((start+1)%4)
        var opt_2 = document.getElementById((start+2)%4)
        var opt_3 = document.getElementById((start+3)%4)
        var opt_4 = document.getElementById((start+4)%4)
        
        opt_1.innerText = quiz.results[count].correct_answer
        opt_2.innerText = quiz.results[count].incorrect_answers[0]
        opt_3.innerText = quiz.results[count].incorrect_answers[1]
        opt_4.innerText = quiz.results[count].incorrect_answers[2]
    } else {
        alert('The Quiz is over !!! \n You can restart with a new category and difficulty level .. \n Do not forget to remember your score!!!! ')
    }
}

function check_answers(){

    

    var temp = localStorage.getItem('current_quiz')
    quiz = JSON.parse(temp)

    var check = event.target
    var answered = document.getElementById('answer')
    answered.innerText = check.innerText


    if (check.innerText == quiz.results[count].correct_answer){
        alert('YAAAY!!! Correct Answer.')
        score += 10
    }else {
        alert('OOPS!!! Wrong Answer.')
        score -= 5
    }
    count++
    answered.innerText = ''
    play_quiz()
}

