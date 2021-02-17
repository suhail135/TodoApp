

var loading = document.getElementById('Loading')
var container = document.getElementById('home')

var totalValue = document.getElementById('totalValue')
var completedValue = document.getElementById('completedValue')
var pendingvalue = document.getElementById('pendingvalue')
var todaysvalue = document.getElementById('todaysvalue')


var alllist = document.getElementById('alltasksList');

var completedTasks = [];
var pendingTasks = [];
var currentOpendModal = null
var Alltasks = [];
var TodaysTasks = [];
var tempArray = []

window.onload = function () {
    if (localStorage.getItem('token')) {
        loading.removeAttribute('hidden');
        container.setAttribute('hidden', 'true');
        load()
    } else {
        window.location.href = "./index.html";
    }

}

load = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log('success', JSON.parse(this.response))
            Alltasks = JSON.parse(this.response);
            completedTasks = Alltasks.filter(task => {
                if (task.completed) {
                    return task
                }
            })
            pendingTasks = Alltasks.filter(task => {
                if (!task.completed) {
                    return task
                }
            })
            renderTasks(Alltasks, alllist)
            calculateCardValues()
            renderTasks(pendingTasks, document.getElementById('PendingTasksList'))
            renderTasks(completedTasks, document.getElementById('ComepletedTaskList'))
            loading.setAttribute('hidden', 'true');
            container.removeAttribute('hidden');
        }
    }

    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhttp.send()
}

oncheck = (value) => {
    // console.log('dd', value);
    currentOpendModal = value;
    document.getElementById('exampleModalCenter').classList.add('show')


}

renderTasks = (list, roottag) => {

    let innerContent = ''

    list.forEach(item => {

        if (item.completed) {
            innerContent += `<a id="Link${item.id}" class="list-group-item list-group-item-action flex-row d-flex align-items-center  align-items-start list-group-item-success ">
            <img class="mr-2" src="https://suhail135.github.io/TodoApp/assets/complete.png" height="40"  />
            <div class="d-flex w-100 justify-content-between">
                
                <h6 class="mb-1 text-capitalize">${item.title}</h6>
                <div class="custom-control custom-checkbox">
                    <input value="${item.id}" type="checkbox"  disabled="true"  onchange="oncheck(value)" checked  class="custom-control-input" id="all${item.id}">
                </div>
            </div>
            </a>`
        } else {
            innerContent += `<a id="Link${item.id}" class="list-group-item list-group-item-action  flex-row d-flex align-items-center  align-items-start ">
            <img class="mr-2" src="https://suhail135.github.io/TodoApp/assets/list.png" height="40"  />
            <div class="d-flex w-100 justify-content-between">
               
                <h6 class="mb-1 text-capitalize">${item.title}</h6>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" value="${item.id}" onchange="oncheck(value)" class="custom-control-input"id="all${item.id}">
                </div>
            </div>
            </a>`
        }


    });
    roottag.innerHTML = innerContent;
}

colseModal = () => {
    if (currentOpendModal) {
        document.getElementById('all' + currentOpendModal).checked = false;
        hideModal()
    }
}

onConfirm = () => {
    //console.log(currentOpendModal + ' => completed');
    document.getElementById('all' + currentOpendModal).disabled = 'true';
    document.getElementById('Link' + currentOpendModal).classList.add('list-group-item-success')
    Alltasks = Alltasks.filter(task => {
        if (currentOpendModal == task.id) {
            task.completed = true;
            completedTasks.push(task)
            TodaysTasks.push(task)
            tempArray.push(task)
            removeFromPending(task.id);
            checkFiveTaskCompleted().then(() => {
                // console.log('5 tasks completed');
                document.getElementById('CompletedModal').classList.add('show');
                tempArray = []
            }).catch(() => {
                // console.log('5 tasks not completed');
            })
        }
        return task
    })
    renderTasks(pendingTasks, document.getElementById('PendingTasksList'))
    renderTasks(completedTasks, document.getElementById('ComepletedTaskList'))
    calculateCardValues()
    currentOpendModal = null
    hideModal('exampleModalCenter')
}

hideModal = (id) => {
    document.getElementById(id).classList.remove('show')
}


calculateCardValues = () => {
    pendingvalue.innerText = pendingTasks.length;
    totalValue.innerText = Alltasks.length;
    completedValue.innerText = completedTasks.length;
    todaysvalue.innerText = TodaysTasks.length;

}
removeFromPending = (id) => {
    pendingTasks = pendingTasks.filter(item => {
        if (item.id != id) {
            return item
        }
    })
}

checkFiveTaskCompleted = () => {
    return new Promise((resolve, reject) => {
        if (tempArray.length == 5) {
            resolve()
        } else {
            reject()
        }
    })
}

logOut = () => {
    localStorage.removeItem('token')
    window.location.href = "./index.html";
}