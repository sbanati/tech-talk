const newCommentForm = document.querySelectorAll('#new-comment-form');

const displayOptions = async ()=>{
    const cardOptions = document.querySelector('.card-options')
    // Get username from the comment box
    const cardUsername = document.querySelector('#username').innerHTML;
    // Get the req.session.username
    const sessionUsername = document.querySelector('.card-options').dataset.currentuser;

    console.log('Card Options:', cardOptions);
    console.log('Card Username:', cardUsername);
    console.log('Session Username:', sessionUsername);



    // If card username and req.session.username match, display edit and delete buttons
    if(cardUsername===sessionUsername){
        cardOptions.style.display = 'flex';
    }
}


// Create new comment
const commentHandler = async (event) =>{
    event.preventDefault();

    const comment = document.querySelector('#new-comment').value.trim();
    const post_id = event.target.dataset.id;


    if(comment){
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({comment, post_id}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            
            document.location.reload();
        }else{
            // When unsuccessful, show alert
            alert('Failed to create a comment.'); 
        }
    }
};

displayOptions();
if(newCommentForm){
    newCommentForm.forEach(element => addEventListener('submit', commentHandler));
}