let Run = async function () {
    //data retrieving
    const response = await fetch("http://localhost:3000/courses");
    const courses = await response.json();
    console.log(courses);

    //course div
    let coursesDiv = document.querySelector(".courses-div");
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
        let courseRatingSpan=document.createElement('span');
        courseRatingSpan.classList.add("coures-rating-span");
        courseRatingSpan.appendChild(document.createTextNode(`(${element["number of ratings"]})`));
        courseRating.appendChild(courseRatingSpan);
        courseDetails.appendChild(courseRating);

        //coures price  
        let coursePrice=document.createElement('span');
        coursePrice.classList.add("price-span");
        coursePrice.appendChild(document.createTextNode(`${element["current price"]}`));
        coursePrice.innerHTML+=`&nbsp;&nbsp;`;
        courseDetails.appendChild(coursePrice);

        let courseOldPrice=document.createElement('span');
        courseOldPrice.classList.add("old-price-span");
        courseOldPrice.appendChild(document.createTextNode(`${element["old price"]}`));
        courseDetails.appendChild(courseOldPrice);

        courseCard.appendChild(courseDetails);
        coursesDiv.appendChild(courseCard);

    });
}
Run();

const searchButton=document.querySelector(".search-div button");
const searchFunction=(event)=>{
    event.preventDefault();
    const searchFor=document.querySelector(".search-div input").value;
    console.log(searchFor);
    const allCoursesTitles=document.querySelectorAll(".course-details h4");
    console.log(allCoursesTitles);
    for(let i=0;i<allCoursesTitles.length;++i)
    {
        console.log(allCoursesTitles[i]);
        if(!allCoursesTitles[i].textContent.includes(searchFor))
        {
            allCoursesTitles[i].parentElement.parentElement.style.display='none';
        }
        else{
            allCoursesTitles[i].parentElement.parentElement.style.display='block';
        }
    }
}
searchButton.addEventListener("click",searchFunction);