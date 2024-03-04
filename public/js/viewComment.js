const newCommentForm = document.querySelectorAll('#new-comment-form');

const displayOptions = async ()=>{
    const cardOptions = document.querySelector('.card-options')
    // Get username from the comment box
    const cardUsername = document.querySelector('#username').innerHTML;
    // Get the req.session.username
    const sessionUsername = document.querySelector('.card-options').dataset.currentuser;

    // If card username and req.session.username match, display edit and delete buttons
    if(cardUsername===sessionUsername){
        cardOptions.style.display = 'flex';
    }
}


// Create new comment
const commentHandler = async (event) =>{
    event.preventDefault();

    const newComment = document.querySelector('#new-comment').value.trim();
    const dataId = document.querySelector('.card').dataset.id;

    if(newComment){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({newComment, dataId}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.reload();
        }else{
            // Redirect to an error page
            document.location.replace('/error');
        }
    }
};

displayOptions();
if(newCommentForm){
    newCommentForm.forEach(element => addEventListener('submit', commentHandler));
}