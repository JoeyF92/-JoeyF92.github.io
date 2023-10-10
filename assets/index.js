document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector("#form-button"),
    loader = document.querySelector(".loader"),
    check = document.querySelector(".check");
  var navbarLinks = document.querySelectorAll(".navbar-nav a");
  navbarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Check if the navbar is expanded
      var navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        // If it's expanded, toggle the collapse state
        var navbarToggler = document.querySelector(".navbar-toggler");
        navbarToggler.click();
      }
    });
  });

  const projectArray = [
    {
      name: "TravelMate",
      video: "https://www.youtube.com/watch?v=sRbVIqNWMXc",
      image: "assets/travelmate.png",
      code: "https://github.com/JoeyF92/TravelMate",
      content:
        "My culminating project at La Fosse Academy, I developed a sophisticated group travel planning application that leverages AI to curate tailored holiday itineraries.",
      skills: "React, Python, SQL, HTML, CSS",
    },
    {
      name: "YourVote",
      video: "https://www.youtube.com/embed/DYPOM17suRE?si=O2A7uGBTT-I8ciIp",
      image: "assets/yourvote.png",
      code: "https://github.com/JoeyF92/local-council-app",
      content:
        "As part of my coursework at La Fosse Academy, I collaborated on a project aimed at addressing community engagement challenges for the Florin Council. We designed and developed a dedicated platform that empowers residents to propose and vote on enhancements for their local area.",
      skills: "Node, JavaScript, SQL, HTML, CSS, Jest",
    },
    {
      name: "BrainBoost",
      video: "x",
      image: "assets/BrainBoost.png",
      code: "https://github.com/JoeyF92/CrammerEducation",
      content:
        "A flashcard revision app designed for Crammer Education with the intention of building a learning community for students.",
      skills: "React, JavaScript, Node, SQL, HTML, CSS, Jest, Vitest",
    },
    {
      name: "Blabber",
      video: "https://www.youtube.com/embed/JAmw-TTG2Ds",
      image: "assets/blabber.png",
      code: "https://github.com/JoeyF92/CS50-Blabber",
      content:
        "During CS50W, I created 'Blabber,' a Twitter-style web application that allows users to create posts, follow other users, and interact with posts by liking and editing them. The project prominently emphasized the implementation of fetch calls and pagination to enhance the site's dynamic user experience.",
      skills: "JavaScript, Python, Django, SQL, HTML, CSS",
    },
    {
      name: "Mail",
      video: "https://www.youtube.com/embed/AjWgaVptTZ0",
      image: "assets/mail.png",
      code: "https://github.com/JoeyF92/CS50W-Mail",
      content:
        "I designed a single-page Mail App that places a strong emphasis on JavaScript functionality. The app facilitates seamless sending and receiving of emails without the need to navigate to separate pages through efficient API calls.",
      skills: "Javascript, Python, Django, HTML, CSS",
    },
    {
      name: "eCommerce",
      video: "https://www.youtube.com/embed/gBcI2R5hiSI",
      image: "assets/ecommerce.png",
      code: "https://github.com/JoeyF92/CS50W-eCommerce",
      content:
        "I developed a mock eBay-style web application, enabling users to create listings and participate in bidding. The project's primary objective was to solidify my knowledge of Django, a powerful web framework.",
      skills: "Django, Python, SQL",
    },
    {
      name: "Album Club",
      image: "assets/albumclub.png",
      code: "https://github.com/JoeyF92/Album-Club",
      video: "https://www.youtube.com/embed/-rCJeGRuk6o",
      content:
        "For my final project in CS50x, I created an Album Club Website, a unique platform where users can initiate music groups, share and receive album recommendations, and collectively rank their listening experiences.",
      skills: "Python, SQL, Flask, Javascript, HTML, CSS",
    },
    {
      name: "Finance",
      image: "assets/finance.png",
      code: "https://github.com/JoeyF92/Project-Work-CS50X/tree/main/finance",
      video: "https://www.youtube.com/embed/dIfEHzQNWrE",
      content:
        "I developed a simulated investment application that enables users to manage their virtual funds, search for stocks using the IEX API, and execute buy and sell transactions, all while maintaining a comprehensive transaction history.",
      skills: "Javascript, Flask, Python",
    },
    {
      name: "Wiki",
      image: "assets/wiki.png",
      code: "https://github.com/JoeyF92/CS50W-Wiki",
      video: "https://www.youtube.com/embed/m_k16k3ZyRo",
      content:
        "I created a mock Wiki-style webpage, designed as an introductory project to explore the front-end aspects of Django templating.",
      skills: "Django, HTML, CSS",
    },
    {
      name: "AJs",
      image: "assets/ajs.png",
      code: "http://ajsdanceparty.co.uk/",
      video: "https://www.youtube.com/embed/zx3JEl67gdA",
      content:
        "This web page marked one of my initial projects for an electronic music events and radio show series I co-run.",
      skills: "HTML, CSS, Javascript",
    },
  ];

  function main() {
    //function for typing my name
    typeSentence("Hi, I'm Joe");
    //listen to email form being sent
    document
      .querySelector("#email-form")
      .addEventListener("submit", (e) => emailFetch(e));
    //listen for user attemping to expand other projects
    expand();
  }

  function expand() {
    document
      .querySelectorAll(".expand")
      .forEach((item) => item.addEventListener("click", (e) => swapProject(e)));
  }

  function typeSentence(sentence) {
    var i = 0;
    var container = document.getElementById("typing-effect");
    var timer = setInterval(function () {
      if (i < sentence.length) {
        container.innerHTML += sentence.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
  }

  function swapProject(e) {
    //get the requested project from the dataset and then locate the array entry with that name
    const requestedProject = e.currentTarget.dataset.project;
    const target = e.currentTarget;
    const indexNew = projectArray.findIndex(
      (obj) => obj.name === requestedProject
    );

    //animate to hide, then remove the project card
    target.classList.add("hide-project");
    target.addEventListener("animationend", function () {
      target.remove();

      //work out what was the previously the main project- to add back to the grid
      const oldProject =
        document.querySelector(".project-info").dataset.project;
      const indexOld = projectArray.findIndex((obj) => obj.name === oldProject);

      //create new card, to display what was previously expanded
      const projectGrid = document.querySelector(".project-grid");
      const projectInstance = document.createElement("div");

      //add classes and datasets
      projectInstance.classList = "proj-instance reveal-project expand";
      projectInstance.dataset.project = projectArray[indexOld].name;

      //add content
      const image = document.createElement("img");
      image.alt = "Example of project" + projectArray[indexOld].name;
      image.src = projectArray[indexOld].image;
      const p1 = document.createElement("p");
      p1.innerHTML = projectArray[indexOld].name;

      //append to the project section
      projectInstance.append(image, p1);
      projectGrid.append(projectInstance);
      //once animation complete, remove 'reveal-project' class
      projectInstance.addEventListener("animationend", function () {
        projectInstance.classList = "proj-instance expand";
        //add event listener to new div
        projectInstance.addEventListener("click", (e) => swapProject(e));
      });

      //update main video, with project selected's information
      document.querySelector("#main-video").src = projectArray[indexNew].video;

      //select the main project being displayed and replace with the requested project
      const video = document.querySelector("#main-video");
      video.src = projectArray[indexNew].video;

      //document.querySelector('.project-info').removeAttribute('data-project');
      document.querySelector(".project-info").dataset.project =
        projectArray[indexNew]["name"];
      document.querySelector(".main-proj-title").innerHTML =
        projectArray[indexNew]["name"];
      document.querySelector(".main-proj-info").innerHTML =
        projectArray[indexNew]["content"];

      //extract the skills - remove the commas and wrap each skill in a span
      const skillsString = projectArray[indexNew]["skills"];
      const skillsArray = skillsString.split(", ");
      const skillsWithSpans = skillsArray.map(
        (skill) => `<span>${skill}</span>`
      );
      const skillsHTML = skillsWithSpans.join(" ");
      // Set the HTML content with the skills
      document.querySelector(".main-proj-skills").innerHTML =
        "Skills Developed: " + skillsHTML;

      const buttonElement = document.querySelector(".main-proj-check");

      // Set the innerHTML based on project name
      buttonElement.innerHTML = "Github Code";
      if (projectArray[indexNew]["name"] === "AJs") {
        buttonElement.innerHTML = "Check out Site";
      }

      // Set the href attribute to the code URL
      buttonElement.onclick = function () {
        window.location.href = projectArray[indexNew]["code"];
      };
    });
  }

  function emailFetch(e) {
    e.preventDefault();
    loader.classList.add("active");
    const form = e.target.elements;
    const emailName = form.name.value;
    const emailAdd = form.email.value;
    const emailBody = form.body.value;
    fetch("https://formsubmit.co/ajax/4eafabc9f99d9374feb22901e14da745", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: emailName,
        email: emailAdd,
        message: emailBody,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == "true") {
          loader.addEventListener("animationend", function () {
            check.classList.add("active");
            // setTimeout(function () {
            //   loader.classList.remove("active");
            //   document.getElementById("email-form").reset();
            // }, 5000);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const message = document.querySelector("#error");
        loader.addEventListener("animationend", function () {
          loader.classList.remove("active");
          error.animationPlayState = "running";
        });
      });

    return false;
  }
  main();
});
