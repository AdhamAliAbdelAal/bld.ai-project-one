let Run = async function () {
    //data retrieving
    const response = await fetch("http://localhost:3000/courses");
    let data = await response.json();
    const sectionOne=document.querySelector(".sec1");
    for (let cnt=0;cnt<data.length;++cnt) {

        //topic div
        const topicsDiv=document.createElement('div');
        topicsDiv.classList.add("topics-div");
        topicsDiv.classList.add(data[cnt]['courses topic']);
        const intermediateDiv=document.createElement('div');
        if(cnt)
        {
            topicsDiv.style.display='none';
        }

        //caption
        const caption=document.createElement("h2");
        caption.appendChild(document.createTextNode(data[cnt]['caption']));
        intermediateDiv.appendChild(caption);
        
        //tip
        const tip=document.createElement("p");
        tip.appendChild(document.createTextNode(data[cnt]['tip']));
        intermediateDiv.appendChild(tip);

        //explore button
        const exploreButton=document.createElement("div");
        exploreButton.classList.add("explore-button");
        const exploreLink=document.createElement("a");
        exploreLink.appendChild(document.createTextNode(`explore ${data[cnt]['courses topic']}`));
        exploreButton.appendChild(exploreLink);
        intermediateDiv.appendChild(exploreButton);
        topicsDiv.appendChild(intermediateDiv);

        //coures div
        const coursesDiv=document.createElement('div');
        coursesDiv.classList.add("courses-div");
        topicsDiv.appendChild(coursesDiv);

        //course div
        const courses=data[cnt]['courses details'];
        courses.forEach(element => {
            let courseCard = document.createElement("div");
            courseCard.classList.add("course-card");

            //course image
            let courseImage = document.createElement("img");
            courseImage.setAttribute('src', element['img']);
            courseImage.setAttribute('alt', "course image");
            courseCard.appendChild(courseImage);

            //course details
            let courseDetails = document.createElement("div");
            courseDetails.classList.add("course-details");

            //course name
            let courseName = document.createElement("h4");
            courseName.appendChild(document.createTextNode(element['name']));
            courseDetails.appendChild(courseName);

            //course author
            let courseAuthor = document.createElement("span");
            courseAuthor.appendChild(document.createTextNode(element['author']));
            courseAuthor.classList.add("author-span");
            courseDetails.appendChild(courseAuthor);

            //rating div
            let courseRating = document.createElement("div");
            courseRating.classList.add("rating");
            courseRating.appendChild(document.createTextNode(element['rating']))
            let rating = parseFloat(element['rating']);
            for (let i = 0; i < Math.floor(rating); ++i) {
                let starIcon = document.createElement("i");
                starIcon.className = "bi bi-star-fill";
                courseRating.appendChild(starIcon);
            }
            if (Math.floor(rating) != rating) {
                let starIcon = document.createElement("i");
                starIcon.className = "bi bi-star-half";
                courseRating.appendChild(starIcon);
            }
            for (let i = 0; i < (5 - Math.ceil(rating)); ++i) {
                let starIcon = document.createElement("i");
                starIcon.className = "bi bi-star";
                courseRating.appendChild(starIcon);
            }
            let courseRatingSpan = document.createElement('span');
            courseRatingSpan.classList.add("coures-rating-span");
            courseRatingSpan.appendChild(document.createTextNode(`(${element["number of ratings"]})`));
            courseRating.appendChild(courseRatingSpan);
            courseDetails.appendChild(courseRating);

            //coures price  
            let coursePrice = document.createElement('span');
            coursePrice.classList.add("price-span");
            coursePrice.appendChild(document.createTextNode(`${element["current price"]}`));
            coursePrice.innerHTML += `&nbsp;&nbsp;`;
            courseDetails.appendChild(coursePrice);

            let courseOldPrice = document.createElement('span');
            courseOldPrice.classList.add("old-price-span");
            courseOldPrice.appendChild(document.createTextNode(`${element["old price"]}`));
            courseDetails.appendChild(courseOldPrice);

            courseCard.appendChild(courseDetails);
            coursesDiv.appendChild(courseCard);
        });
        sectionOne.appendChild(topicsDiv);
    }    
}
Run();

const searchButton = document.querySelector(".search-div button");
const searchFunction = (event) => {
    event.preventDefault();
    const searchFor = document.querySelector(".search-div input").value;
    console.log(searchFor);
    const activeTopic=document.querySelector(".active-topic");
    const allCoursesTitles = document.querySelectorAll(`${activeTopic.dataset.topic} .course-details h4`);
    console.log(allCoursesTitles);
    for (let i = 0; i < allCoursesTitles.length; ++i) {
        console.log(allCoursesTitles[i]);
        if (!allCoursesTitles[i].textContent.includes(searchFor)) {
            allCoursesTitles[i].parentElement.parentElement.style.display = 'none';
        }
        else {
            allCoursesTitles[i].parentElement.parentElement.style.display = 'block';
        }
    }
}
searchButton.addEventListener("click", searchFunction);

const tabs=document.querySelectorAll(".tabs li");

const removeActivation=()=>{
    const contents=document.querySelectorAll(".topics-div");
    console.log(contents);
    for(let i=0;i<contents.length;++i)
    {
        tabs[i].classList.remove("active-topic");
        tabs[i].style.color="#6a6f73";
        contents[i].style.display="none";
    }
}

const activate=(e)=>{
    removeActivation();
    e.target.classList.add("active-topic");
    console.log(e.target.dataset.topic);
    document.querySelector(e.target.dataset.topic).style.display="block";
}

document.querySelector("ul").addEventListener("click",activate);