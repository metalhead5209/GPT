const input = document.querySelector(".input");
const btn = document.querySelector("#btn");
const link = "https://swapi.dev/api/people?search=";

const charSearch = async (char) => {
    char = input.value;
    try {
        await fetch(`${link}${char}`)
        .then((res) => res.json())
        .then(async (data) => {
            console.log(data.results[0].name)
            let obj = data;
            await fetch('/api', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(obj),
            })
            .then((r) => r.json())
            .then((res) => console.log(res));
            console.log(obj);
            if(data) {
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        });
        } catch (error) {
            console.error(error, "I find your lack of star wars knowledge disturbing");
        }
        input.value = "";
    
}

btn.addEventListener("click", () => {
    // if the input is an empty string or less than 3 characters, alert
    if (input.value == "" || input.selectionEnd < 3) {
      alert("Please Enter Name");
    } else {
      charSearch();
    }
  });
  