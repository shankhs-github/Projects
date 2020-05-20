
var sodoku =   '520006000\n000000701\n300000000\n000400800\n600000050\n000000000\n041800000\n000030020\n008700000'
var solution = '527316489\n896542731\n314987562\n172453896\n689271354\n453698217\n941825673\n765134928\n238769145'

var org = sodoku.split('\n')
for (var c = 0 ; c < 9 ; c++){
    org[c] = org[c].split('')
}
var arr = sodoku.split('\n')
for (var c = 0 ; c < 9 ; c++){
    arr[c] = arr[c].split('')
}


var main_box = document.getElementById('main_box')
var body = document.querySelector('body')

fill_box(org)

function fill_box(array){   
    for (var i = 1 ; i <=9 ; i ++){
        for (var j = 1 ; j <=9 ; j ++){
            if ( array[i-1][j-1] != 0 ){
                var temp = document.createElement('div')
                temp.setAttribute('class','capsule')
                temp.setAttribute('id','box_'+i+'_'+j)
                temp.innerText = array[i-1][j-1]
                main_box.appendChild(temp)
            }else {
                var temp = document.createElement('div')
                temp.setAttribute('class','capsule')
                temp.setAttribute('id','box_'+i+'_'+j)
                var temp_input = document.createElement('input')
                temp_input.setAttribute('class','input')
                temp_input.setAttribute('min','1')
                temp_input.setAttribute('max','9')
                temp_input.setAttribute('id','input_'+i+'_'+j)
                temp_input.innerText = ''
                temp.appendChild(temp_input)
                main_box.appendChild(temp)
                document.getElementById('input_'+i+'_'+j).addEventListener('change',update)
            }
            
        }
    }
}

function save() {
    alert('All the entries will be saved, make sure that there are no red figures')
    var div = document.querySelectorAll('#main_box  div')
    for (var i = 0 ; i < 81 ; i++){
        main_box.removeChild(div[i])
    }
    fill_box(arr)  
    
}

function restart() {
    alert('The Game will be restarted')
    var div = document.querySelectorAll('#main_box  div')
    for (var i = 0 ; i < 81 ; i++){
        main_box.removeChild(div[i])
    }
    fill_box(org)  
    arr = [] 
    arr = sodoku.split('\n')
    for (var c = 0 ; c < 9 ; c++){
        arr[c] = arr[c].split('')
    }
}

function submit() {
    var temp = []
    for (var i = 0 ; i < 9 ; i++){
        temp[i] = arr[i].join('')
    }
    var sub_arr = temp.join('\n')

    var sol_arr = solution.split('\n')
    for (var c = 0 ; c < 9 ; c++){
        sol_arr[c] = sol_arr[c].split('')
    }


    if ( sub_arr === solution){
        alert('YAAY !! You solved this PUZZLE, Congrats !!! Press OK to see final solution ')    
    }else {
        alert('OOOPSSSS !! The solution you provided is wrong !!! Press OK to see final solution ')
    }

    var div = document.querySelectorAll('#main_box  div')
    for (var i = 0 ; i < 81 ; i++){
        main_box.removeChild(div[i])
    }
    fill_box(sol_arr)

}

function update(){

    var event_id = this.id
    var temp = document.getElementById(event_id).value
    
    var m = Number(event_id[6])
    var n = Number(event_id[8])
    var check = false

    for (var i = 1 ; i <= 9 ; i++){

        if (temp == arr[m-1][i-1]){ 
            check = true
            break
        }
        if (temp == arr[i-1][n-1]){ 
            check = true
            break
        }
    }
    
    var x = Math.floor((m-1)/3)*3
    var y = Math.floor((n-1)/3)*3

    for (var i = 0 ; i < 3 ; i++){
        if ( temp == arr[x+i][y] || temp == arr[x+i][y+1] || temp == arr[x+i][y+2]){
            check = true
            break
        }
    }

    if (check == true){
        document.getElementById(event_id).setAttribute('class','input red')

    } else {
        document.getElementById(event_id).setAttribute('class','input')
    }

    arr[m-1][n-1] = temp

}
