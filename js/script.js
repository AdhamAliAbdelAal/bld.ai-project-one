let Run=async function()
{
    //data retrieving
    const response=await fetch("http://localhost:3000/courses");
    const courses=await response.json();
    console.log(courses);
    let coursesDiv=document.querySelector(".courses-div");
    courses.forEach(element => {
        let courseCard=document.createElement("div");
        courseCard.classList.add("course-card");
        let courseImage=document.createElement("img");
        courseImage.setAttribute('src',element['img']);
        courseImage.setAttribute('alt',"course image");
        courseCard.appendChild(courseImage);
        coursesDiv.appendChild(courseCard);

    });
}

Run();
