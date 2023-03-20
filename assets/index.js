document.addEventListener('DOMContentLoaded', function(){
  var btn = document.querySelector('#form-button'),
      loader = document.querySelector('.loader'),
      check = document.querySelector('.check');
      
  

    const projectArray = [
      {name:"Blabber",video: "https://www.youtube.com/embed/JAmw-TTG2Ds",
        image: "assets/blabber.png",
        code: "https://github.com/JoeyF92/CS50-Blabber",
       content: "This is Twitter Style App called Blabber - Where users are able to make posts, follow users and like and edit posts. There was a strong focus on using fetch calls and pagination to create a more dynamic site",
       skills: "JS, Python, Django, SQL, HTML, CSS"},
      {name:"Mail",
      video: "https://www.youtube.com/embed/AjWgaVptTZ0", 
      image: "assets/mail.png",
      code: "https://github.com/JoeyF92/CS50W-Mail",
      content: "Here I created single page Mail App. There was a strong focus on Javascript and making Api calls in order to send and recieve mail without directing to another page.",
      skills: "Javascript, Python, Django, HTML, CSS"},
      {name:"eCommerce",
      video: "https://www.youtube.com/embed/gBcI2R5hiSI",
      image: "assets/ecommerce.png",
      code: "https://github.com/JoeyF92/CS50W-eCommerce",
       content: "This is an Mock Ebay style App, where users are able to create and bid on listings. There was a strong focus on consolidating Django knowledge", 
       skills: "Django, Python, SQL"},
       {name:"Album Club",
       image: "assets/albumclub.png",
       code: "https://github.com/JoeyF92/Album-Club",
      video: "https://www.youtube.com/embed/-rCJeGRuk6o",
       content: "Here I create an Album Club Website - a place where people can start music groups, they can share and recieve recommendations for albums to listen to, and then rank them", 
       skills: "Python, SQL, Flask, Javascript, HTML, CSS"},
       {name:"Finance",
       image: "assets/finance.png",
       code: "https://github.com/JoeyF92/Project-Work-CS50X/tree/main/finance",
      video: "https://www.youtube.com/embed/dIfEHzQNWrE",
       content: "This is a mock investment app - It allows people to add 'cash', search for stocks on the iex api and purchase, sell and view history of transactions",
       skills: "Javascript, Flask, Python"},
       {name:"Wiki",
       image: "assets/wiki.png",
       code: "https://github.com/JoeyF92/CS50W-Wiki",
      video: "https://www.youtube.com/embed/m_k16k3ZyRo",
       content: "This is a mock Wiki style Page - A a simple site made as an introduction the front-end side of Django Templating",
       skills: "Django, HTML, CSS"},
       {name:"AJs",
       image: "assets/ajs.png",
       code: "http://ajsdanceparty.co.uk/",
      video: "https://www.youtube.com/embed/zx3JEl67gdA",
       content: "This was one of the first web pages I made for an electronic music event and radio show series", 
       skills: "HTML, CSS, Javascript"}
    ]

 

    function main(){
        //function for typing my name
        typeSentence("Hi, I'm Joe...");
        //listen to email form being sent
        document.querySelector('#email-form').addEventListener('submit', e => emailFetch(e));
        //listen for user attemping to expand other projects
        expand();
      

    }

    function expand(){
      document.querySelectorAll('.expand').forEach(item => item.addEventListener('click', e => swapProject(e)));
    }


    function typeSentence(sentence) {
        var i = 0;
        var container = document.getElementById("typing-effect");
        var timer = setInterval(function() {
          if (i < sentence.length) {
            container.innerHTML += sentence.charAt(i);
            i++;
          } else {
            clearInterval(timer);
          }
        }, 100);
      }

    function swapProject(e){
      //get the requested project from the dataset and then locate the array entry with that name
      const requestedProject = e.currentTarget.dataset.project;
      const target = e.currentTarget
      const indexNew = projectArray.findIndex(obj => obj.name === requestedProject);
     
      //animate to hide, then remove the project card
      target.classList.add('hide-project');
      target.addEventListener('animationend', function() {
        target.remove();
        
        //work out what was the previously the main project- to add back to the grid
        const oldProject = document.querySelector('.project-info').dataset.project;
        const indexOld = projectArray.findIndex(obj => obj.name === oldProject);
      
        //create new card, to display what was previously expanded
        const projectGrid = document.querySelector('.project-grid');
        const projectInstance = document.createElement('div');
        
        //add classes and datasets
        projectInstance.classList = "proj-instance reveal-project expand";
        projectInstance.dataset.project = projectArray[indexOld].name;

        //add content
        const image = document.createElement('img');
        image.alt = "Example of project" + projectArray[indexOld].name;
        image.src = projectArray[indexOld].image;
        const p1 = document.createElement('p');
        p1.innerHTML = projectArray[indexOld].name;
        
        //append to the project section
        projectInstance.append(image, p1);
        projectGrid.append(projectInstance);
        //once animation complete, remove 'reveal-project' class
        projectInstance.addEventListener('animationend', function(){
          projectInstance.classList = "proj-instance expand";
          //add event listener to new div
          projectInstance.addEventListener('click', e => swapProject(e));        
        });
       
        
        //update main video, with project selected's information
        document.querySelector('#main-video').src = projectArray[indexNew].video;

         //select the main project being displayed and replace with the requested project
        const video = document.querySelector('#main-video');
        video.src = projectArray[indexNew].video;
        
        //document.querySelector('.project-info').removeAttribute('data-project');
        document.querySelector('.project-info').dataset.project = projectArray[indexNew]['name'];
        document.querySelector('.main-proj-title').innerHTML = projectArray[indexNew]['name'] + ":";
        document.querySelector('.main-proj-info').innerHTML = projectArray[indexNew]['content'];
        document.querySelector('.main-proj-skills').innerHTML = "Skills: " + projectArray[indexNew]['skills'];
        document.querySelector('.main-proj-check').innerHTML = "GitHub Code";
        if (projectArray[indexNew]['name'] === 'AJs'){
          document.querySelector('.main-proj-check').innerHTML = "Live Site"
        }
        document.querySelector('.main-proj-check').href = projectArray[indexNew]['code'];
        //add click listener
        
      
      });      
     
    }
  
    function emailFetch(e){
        e.preventDefault();
        loader.classList.add('active');     
        const form = e.target.elements;
        const emailName = form.name.value;
        const emailAdd = form.email.value;
        const emailBody = form.body.value;
        fetch("https://formsubmit.co/ajax/4eafabc9f99d9374feb22901e14da745", {
        method: "POST",
        headers: 
        { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify
        ({
            name: emailName,
            email: emailAdd,
            message: emailBody
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.success == 'true'){
                  loader.addEventListener('animationend', function() {
                  check.classList.add('active'); 
                  setTimeout(function() {
                    loader.classList.remove('active');
                    document.getElementById("email-form").reset();
                  }, 5000);
                  
                });
                
            }
        })
        .catch(error => {
          console.log(error);
          const message = document.querySelector('#error');
          loader.addEventListener('animationend', function() {
            loader.classList.remove('active');
            error.animationPlayState = "running";
          });
        });
        
        return false;
    }



    main()

})
