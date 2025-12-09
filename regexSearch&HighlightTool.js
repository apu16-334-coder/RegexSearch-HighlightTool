(function () {
    // Get All needed DOM Reference
    const regex = document.getElementById("regex")
    const text = document.getElementById("text")
    const highlightBtn = document.getElementById("highlight")
    const clearBtn = document.getElementById("clear")
    const result = document.getElementById("result")

    highlightBtn.addEventListener("click", () => {
        if (regex.value!=="" && text.value!=="") {
            showingResultBox();
        }
    })

    function showingResultBox(){
        let pattern = regex.value
        const regexObj = new RegExp(pattern);

        const highlighted = text.value.replace(regexObj, match => `<span class="highlight">${match}</span>`);

        console.log(text.value.replace(regex, match => `<span class="highlight">${match}</span>`))

        result.innerHTML= highlighted || "No Match Found"

    }
})()

