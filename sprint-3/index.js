var diff , token = "eae808a7ff8715c6260e3f701b93d0b1e9440896fd7fdddb874c249272871fa0" , amt , cat

window.onload = function (){

    // var xhr = new XMLHttpRequest();
    // xhr.open('GET','https://opentdb.com/api_token.php?command=request')
    // xhr.send()
    // xhr.onload = function(){
    //     var res = xhr.response
    //     res = JSON.parse(res)
    //     token = res.token
    // }
    
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET','https://opentdb.com/api_category.php')
    // xhr.send()
    // xhr.onload = function(){
    //     var res = xhr.response
    //     res = JSON.parse(res)

    //     var category = document.getElementById('category')
        
    //     for (var x in res.trivia_categories){
    //         var opt = document.createElement('option')
    //         opt.setAttribute('value',res.trivia_categories[x].id)
    //         opt.innerText = 'Category : '+res.trivia_categories[x].name
    //         category.append(opt)
    //     }            
    // }            
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
    var amt = amount.value

    document.getElementById('amount_label').innerText = 'Questions Chosen: '+ amt + ' per Quiz!!'
}

