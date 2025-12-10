(function () {
    // Get All needed DOM Reference
    const regex = document.getElementById("regex")
    const text = document.getElementById("text")
    const highlightBtn = document.getElementById("highlight")
    const clearBtn = document.getElementById("clear")
    const result = document.getElementById("result")
    const flagBtn=document.getElementById("flags")

    highlightBtn.addEventListener("click", () => {
        if (regex.value !== "" && text.value !== "") {
            showingResultBox();
        }
    })



    function showingResultBox() {
        let pattern = regex.value;
        let flag=(flagBtn.value==="flags")? "": flagBtn.value;
        const regexObj = new RegExp(pattern,flag);
        console.log(text.value.match(regexObj))

        const highlighted = text.value.replace(regexObj, match => `<span class="highlight">${match}</span>`);

        result.innerHTML = highlighted || "No Match Found"

    }

    
    const dropdownContent = document.querySelector(".dropdown-content")
    dropdownContent.addEventListener("click", markFlags)
    
    function markFlags(e){
        const flag=e.target
        if(flag.classList.contains("mark")){           
            flag.innerHTML=flag.innerHTML.replace(" ✓","");
            flag.classList.remove("mark")
        }else{
            flag.innerHTML+=" ✓";
            flag.classList.add("mark")
        }

        const divs = document.querySelectorAll(".dropdown-content div")
        let result=""
        for (const div of divs) {
            if(div.classList.contains("mark")){
                result+=div.firstElementChild.textContent;
            }
        }
        if(result===""){
            flagBtn.value="flags"
        }else{
            flagBtn.value=result;
        }

    }
        

})()

