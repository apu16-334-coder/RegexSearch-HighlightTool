(function () {
    // Get All needed DOM Reference
    const regex = document.getElementById("regex")
    const text = document.getElementById("text")
    const highlightBtn = document.getElementById("highlight")
    const clearBtn = document.getElementById("clear")
    const result = document.getElementById("result")
    const flagBtn = document.getElementById("flags")

    // adding event listener to highlight matches button
    highlightBtn.addEventListener("click", () => {
        if (regex.value !== "" && text.value !== "") {
            showingResultBox();
        }
    })

    // showing result box content
    function showingResultBox() {
        // getting regex pattern and text to match
        let pattern = regex.value;
        let flag = (flagBtn.value === "flags") ? "d" : flagBtn.value + "d";

        // getting regex as a object of RegExp
        const regexObj = new RegExp(pattern, flag);

        // try catch block to detect the inavlid regex or any kind of error
        try {
            // adding span elemt with highlight class to all matching string using replace method
            const highlighted = text.value.replace(regexObj, match => `<span class="highlight">${match}</span>`);

            // showing the highlight test to result box if matches
            result.innerHTML = highlighted || "No Match Found"

            // Showing matching history
            let myArray;

            // if g flag is included
            if (flag.includes("g")) {
                // setting count variable to count the matches
                let count = 1;

                // while loop to iterate each matches 
                while ((myArray = regexObj.exec(text.value)) !== null) {
                    // creating element for showing match information
                    const matchSection = document.createElement("h4");
                    matchSection.style.color = "rgba(2, 188, 2, 1)";
                    matchSection.textContent = `Match ${count}  (${myArray.indices[0][0]} – ${myArray.indices[0][1]})  |  '${myArray[0]}'`

                    // showing matches
                    result.appendChild(matchSection);
                    count++;

                    // iterate array if there are capture group matches
                    for (let i = 1; myArray.length > 1 && i < myArray.length; i++) {
                        // creating span element for group matches
                        const groupSection = document.createElement("span")
                        groupSection.style.color = "rgba(51, 29, 250, 1)"
                        groupSection.textContent = `    Group ${i}  (${myArray.indices[i][0]} – ${myArray.indices[i][1]})  |  '${myArray[i]}'`;

                        // showing group matches
                        matchSection.appendChild(groupSection)
                    }
                }
                // if g flag is not included
            } else {
                myArray = regexObj.exec(text.value)
                // creating element for showing match information
                const matchSection = document.createElement("h4");
                matchSection.style.color = "rgba(2, 188, 2, 1)";
                matchSection.textContent = `Match 1  (${myArray.indices[0][0]} – ${myArray.indices[0][1]})  |  '${myArray[0]}'`
                
                // showing matches
                result.appendChild(matchSection);

                // iterate array if there are capture group matches
                for (let i = 1; myArray.length > 1 && i < myArray.length; i++) {
                    // creating span element for group matches
                    const groupSection = document.createElement("span")
                    groupSection.style.color = "rgba(51, 29, 250, 1)"
                    groupSection.textContent = `    Group ${i}  (${myArray.indices[i][0]} – ${myArray.indices[i][1]})  |  '${myArray[i]}'`;

                    // showing group matches
                    matchSection.appendChild(groupSection)
                }
            }



        } catch (error) {
            // showing error
            result.innerHTML = "Invalid Regex Pattern"
            result.style.color = "red";
        }
    }

    // adding event listener to falgs dropdwon menu
    document.querySelector(".dropdown-content").addEventListener("click", markingFlags)

    // marking flags to use regex flag
    function markingFlags(e) {
        const flag = e.target
        // toggle the mark class 
        if (flag.classList.contains("mark")) {
            flag.innerHTML = flag.innerHTML.replace(" ✓", "");
            flag.classList.remove("mark")
        } else {
            flag.innerHTML += " ✓";
            flag.classList.add("mark")
        }

        // getting all the marked flags
        const divs = document.querySelectorAll(".dropdown-content div")
        let result = ""
        for (const div of divs) {
            if (div.classList.contains("mark")) {
                result += div.firstElementChild.textContent;
            }
        }

        // if user does not choose any flag
        if (result === "") {
            flagBtn.value = "flags"
            
        // if user choose flags
        } else {
            flagBtn.value = result;
        }

    }

    // adding event listenre to reset button
    document.getElementById("clear").addEventListener("click",clearAll)

    // clear the page
    function clearAll() {
        regex.value="";
        text.value="";
        result.innerHTML="";
    }


})()
