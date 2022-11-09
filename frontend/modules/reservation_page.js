import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await res.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length !== 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    let table_body = document.getElementById("reservation-table");
    reservations.forEach((row) => {
      let date = new Date(row.date).toLocaleDateString("en-IN");
      //console.log(date)
      let item = document.createElement("tr");
      //console.log(row.adventure)
      item.innerHTML = `<td><b>${row.id}</b></td>
    <td>${row.name}</td>
    <td>${row.adventureName}</td>
    <td>${row.person}</td>
    <td>${date}</td>
    <td>${row.price}</td>
    <td>${new Date(row.time).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${new Date(row.time).toLocaleString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}</td>
    <td><div id=${
      row.id
    } class="reservation-visit-button" ><a href="../detail/?adventure=${row.adventure}">Visit Adventure</a></div></td>`;
      table_body.append(item);
    });
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  // <td><button id=${
  //     row.id
  //   } class="reservation-visit-button"  onclick="handlebtnclick('${row.adventure}')" >Visit Adventure</button></td>
}


export { fetchReservations, addReservationToTable };
