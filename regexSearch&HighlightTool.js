(function () {
    // Get All needed DOM Reference
    const regex = document.getElementById("regex")
    const text = document.getElementById("text")
    const highlightBtn = document.getElementById("highlight")
    const clearBtn = document.getElementById("clear")
    const result = document.getElementById("result")
    const flagBtn=document.getElementById("flags")

    text.value="thiss iss it"

    highlightBtn.addEventListener("click", () => {
        if (regex.value !== "" && text.value !== "") {
            showingResultBox();
        }
    })

    function showingResultBox() {
        let pattern = regex.value;
        let flag=(flagBtn.value==="flags")? "d": flagBtn.value+"d";
        console.log(flag)
        const regexObj = new RegExp(pattern,flag);
        
        // try {
            const highlighted = text.value.replace(regexObj, match => `<span class="highlight">${match}</span>`);

            result.innerHTML = highlighted || "No Match Found"

            let myArray;
            if(flag.includes("g")){
                console.log("hello")
            }else{
                myArray =regexObj.exec(text.value)
                console.log(myArray)
                const matchSection=document.createElement("h4");
                matchSection.style.color="rgba(2, 188, 2, 1)";
                matchSection.textContent= `Match 1  (${myArray.indices[0][0]} – ${myArray.indices[0][1]})  |  '${myArray[0]}'`
                result.appendChild(matchSection);

                console.log(myArray.length)

                for(let i=1; myArray.length>1 && i<myArray.length; i++){
                    console.log("hello")
                    const groupSection = document.createElement("span")
                    groupSection.style.color="rgba(51, 29, 250, 1)"
                    groupSection.textContent = `    Group ${i}  ${myArray.indices[i][0]} – ${myArray.indices[i][1]}  |  '${myArray[i]}'`;

                    matchSection.appendChild(groupSection)
                }
                


            }
            
        

        // } catch (error) {
        //     result.innerHTML = "Invalid Regex Pattern"
        //     result.style.color="red";
        // }
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
