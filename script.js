const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".container .seat");
const notOccupiedSeats = document.querySelector(".container .seat:not(.occupied)");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const movieSelectBox = document.getElementById("movie");

// first go LocalStorage and later selectBox
// initialValue == movieSelectBox.value
// movieSelectBox.option[movieSelectBox.selectedIndex].value == movieSelectBox.value

let currentTicketPrice = localStorage.getItem("selectedMoviePrice") ? localStorage.getItem("selectedMoviePrice") : movieSelectBox.options[movieSelectBox.selectedIndex].value;

//movie index
let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ? localStorage.getItem("SelectedMovieIndex") : movieSelectBox.selectedIndex;


window.onload = () => {
   
    displaySeats();
    updateMovieInfo();
}

movieSelectBox.addEventListener("change", (e) => {

    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    console.log(movieIndex);
    updateMovieInfo();
    setMovieDataToLocalStorage(ticketPrice, movieIndex);

});

const setMovieDataToLocalStorage = (ticketPrice, movieIndex) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice)
};

container.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        console.log(e.target.classList);
    }

    updateMovieInfo()
})

const  updateMovieInfo = () => {
    let selectedSeats = document.querySelectorAll(".row .seat.selected")

    let selectedSeatIndexArray = [...selectedSeats].map(seat =>[...allSeats].indexOf(seat));
    // console.log(selectedSeatIndexArray);
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatIndexArray));

    count.innerText = selectedSeatIndexArray.length;
    total.innerText = selectedSeatIndexArray.length* movieSelectBox.value;

    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
}

const displaySeats =() => {
    movieSelectBox.selectedIndex = currentMovieIndex;
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeatsFromStorage);
    if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length>0) {
        allSeats.forEach((seat,index) => {
            if (selectedSeatsFromStorage.indexOf(index) > -1) {
                seat.classList.add("selected")
                
            }
        })
        
    }
}