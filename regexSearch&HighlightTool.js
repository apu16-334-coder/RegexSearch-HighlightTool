(function () {
    // Get All needed DOM Reference
    const regex = document.getElementById("regex")
    const text = document.getElementById("text")
    const highlightBtn = document.getElementById("highlight")
    const clearBtn = document.getElementById("clear")
    const result = document.getElementById("result")

    highlightBtn.addEventListener("click", () => {
        if (regex.value !== "" && text.value !== "") {
            showingResultBox();
        }
    })



    function showingResultBox() {
        let pattern = regex.value
        console.log(pattern)
        const regexObj = new RegExp(pattern);
        console.log(text.value.match(regexObj))

        const highlighted = text.value.replace(regexObj, match => `<span class="highlight">${match}</span>`);

        result.innerHTML = highlighted || "No Match Found"

    }

    // 
    const flagBtn=document.getElementById("flags")
    const dropdownContent = document.querySelector(".dropdown-content")
    dropdownContent.addEventListener("click", markFlags)

    function markFlags(e){

        const flag=e.target
        if(flag.classList.contains("mark")){           
            flag.textContent=flag.textContent.replace(" ✓","");
            flag.classList.remove("mark")
        }else{
            flag.textContent+=" ✓";
            flag.classList.add("mark")
        }
        
        
    }
    


})()

