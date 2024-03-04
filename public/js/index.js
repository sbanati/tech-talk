// connect buttons 
const dashBtn = document.querySelector('#dashboardbtn');
const homeBtn = document.querySelector('#homebtn');
const loginBtn = document.querySelector('#loginbtn');
const deleteBtn = document.querySelector('#deletebtn');
const editBtn = document.querySelector('#editbtn');
const postBtn = document.querySelector('#postbtn');
const postCard = document.querySelectorAll('.card-title');


// Go to home page 
const homeHandler = (event) => {
    event.preventDefault();

    document.location.replace('/');
}

// Go to dashboard
const dashboardHandler = (event) => {
    event.preventDefault();

    document.location.replace('/dashboard');
}

// Go to a new page to create a post 
const newPostHandler = (event) => {
    event.preventDefault();

    document.location.replace('/createPost');

}

// Go to a new page to view a post and comment
const postCardHandler = (event) => {
    event.preventDefault();

    console.log(event.path[0].attributes[1].value);
    if(cardId !== ''){
        document.location.replace(`/post/${cardId}`);
    }
}

// Edit post handler
const editBtnHandler = (event) =>{
    event.preventDefault();

    const cardId = event.path[1].dataset.editid;
    document.location.replace(`/edit/${cardId}`);
}

// Delete post handler
const deleteBtnHandler = (event) =>{
    event.preventDefault();

    const cardId = event.path[1].dataset.deleteid;
    const confirmed = confirm("Are you sure you want to delete?");

    if(confirmed){
        fetch(`/api/posts/${cardId}`, {
            method: 'DELETE',
            headers: ({'Content-Type': 'application/json'})
        });
        document.location.reload();
    }
}

// Go to login page
const loginBtnHandler = (event) =>{
    event.preventDefault();
    
    document.location.replace('/login');
}




// Assign elements to handlers
homeBtn.addEventListener('click', homeHandler);
dashBtn.addEventListener('click', dashboardHandler);
if(postBtn){
    postBtn.addEventListener('click', newPostHandler);
}
if(loginBtn){
    loginBtn.addEventListener('click', loginBtnHandler);
}
postCard.forEach(element =>{
    element.addEventListener('click', postCardHandler);
});
if(editBtn){
    editBtn.forEach(element=>{
        element.addEventListener('click', editBtnHandler);
    })
}
if(deleteBtn){
    deleteBtn.forEach(element=>{
        element.addEventListener('click', deleteBtnHandler);
    })
}