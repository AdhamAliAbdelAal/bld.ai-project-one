let Run=async function()
{
    //data retrieving
    const response=await fetch("http://localhost:3000/courses");
    const courses=await response.json();
    console.log(courses);

    //course div
    let coursesDiv=document.querySelector(".courses-div");
    courses.forEach(element => {
        let courseCard=document.createElement("div");
        courseCard.classList.add("course-card");

        //course image
        let courseImage=document.createElement("img");
        courseImage.setAttribute('src',element['img']);
        courseImage.setAttribute('alt',"course image");
        courseCard.appendChild(courseImage);

        //course details
        let courseDetails=document.createElement("div");
        courseDetails.classList.add("course-details");
        
        //course name
        let courseName=document.createElement("h4");
        courseName.appendChild(document.createTextNode(element['name']));
        courseDetails.appendChild(courseName);

        //course author
        let courseAuthor=document.createElement("span");
        courseAuthor.appendChild(document.createTextNode(element['author']));
        courseAuthor.classList.add("author-span");
        courseDetails.appendChild(courseAuthor);

        courseCard.appendChild(courseDetails);
        coursesDiv.appendChild(courseCard);

    });
}

Run();
