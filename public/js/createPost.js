const postHandler = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#new-post').value.trim();

    if(content){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.replace('/dashboard');
        }else{
            // Show alert if unsuccessful
            alert('New Post Failed to Create.'); 
        }
    }
};

document.querySelector('#new-post-form').addEventListener('submit', postHandler);