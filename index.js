const peopleCountElement = document.querySelector('[data-js="peopleCount"]');
const peopleListElement = document.querySelector('[data-js="peopleList"]');
const allButton = document.querySelector('[data-js="allButton"]');
const issButton = document.querySelector('[data-js="issButton"]');
const tiangongButton = document.querySelector('[data-js="tiangongButton"]');

async function fetchData() {
  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    console.log(data);

    peopleCountElement.textContent = data.number;

    updatePeopleList(data.people);

    allButton.addEventListener("click", () => updatePeopleList(data.people));
    issButton.addEventListener("click", () =>
      filterBySpacecraft(data.people, "ISS")
    );
    tiangongButton.addEventListener("click", () =>
      filterBySpacecraft(data.people, "Tiangong")
    );
  } catch (error) {
    console.error("Error can not load the page", error);
  }
}

function updatePeopleList(people) {
  peopleListElement.innerHTML = "";
  people.forEach((person) => {
    const listItem = document.createElement("li");
    listItem.textContent = person.name;
    peopleListElement.appendChild(listItem);
  });
}

function filterBySpacecraft(people, spacecraft) {
  const filteredPeople = people.filter((person) => person.craft === spacecraft);
  updatePeopleList(filteredPeople);
}

fetchData();
