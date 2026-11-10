let ip = document.querySelector('#input');
let search = document.querySelector('#search');
let picture = document.querySelector('#avatar');
let errorMessage = document.querySelector('#errorMessage');
errorMessage.textContent = "";
let repository = document.querySelector('.repository');
errorMessage.textContent = "";

search.addEventListener('click',()=>{
    fetch(`https://api.github.com/users/${ip.value}`)
    .then((response)=>{
           if (!response.ok) {
            throw new Error("User not found");
        }
        else{
            return response.json()
        }
        
    })
    .then((data)=>{
        repository.innerHTML = "";
        console.log(data)
        picture.src = data.avatar_url;
        let name = document.querySelector('#naam')
        name.textContent = data.login;
        let userId = document.querySelector('#namegit')
        userId.textContent = `@${data.login}`;
        let bio = document.querySelector('#bio')
        bio.textContent = data.bio;
        let followers = document.querySelector('#followers');
        followers.textContent = data.followers;
        let following = document.querySelector('#following');
        following.textContent = data.following;
        let location = document.querySelector('.location');
        location.textContent = `📍${data.location}`;
        let totalRepo = document.querySelector('#totalRepo');
        totalRepo.textContent = data.public_repos;
        let joinedDate = document.querySelector('#joinedDate');
        joinedDate.textContent = `📅 Joined ${new Date(data.created_at).toLocaleDateString()}`;
        let viewProfile = document.querySelector('#viewProfile');
        viewProfile.href = data.html_url;
        fetch(data.repos_url)
        .then((response)=>{
            return response.json()
        })
        .then((repose)=>{
            console.log(repose)
            repose.forEach((element) => {
                console.log(element);
                let div = document.createElement('div');
                div.classList.add('repo');
                let reponame = document.createElement('a');
                reponame.style.textDecoration = 'none';
                reponame.style.color = '#fff';
                reponame.style.fontSize = "25px";
                reponame.textContent = element.name;
                reponame.href = element.html_url;
                reponame.target = "_blank";
                reponame.rel = "noopener noreferrer";
                let p = document.createElement('p');
                p.classList.add('repobio')
                p.textContent = element.description || "No description available";
                let repoStats = document.createElement('div');
                repoStats.classList.add('repo-stats');
                let span1 = document.createElement('span')
                span1.textContent = element.language || "Not specified";
                let span2 = document.createElement('span');
                span2.textContent = `★${element.stargazers_count}`;
                let span3 = document.createElement('span');
                span3.textContent = `⑂${element.forks_count}`
                repoStats.append(span1,span2,span3);
                div.append(reponame, p, repoStats);
                repository.appendChild(div);
                
            });
        })
    })
    .catch((error) => {
    errorMessage.textContent = error.message;
});
})
