let records = JSON.parse(localStorage.getItem("fitnessData")) || [];

displayData();

function addData() {

    let exercise = document.getElementById("exercise").value;
    let duration = document.getElementById("duration").value;
    let steps = document.getElementById("steps").value;
    let calories = document.getElementById("calories").value;

    if (
        exercise === "" ||
        duration === "" ||
        steps === "" ||
        calories === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    let record = {
        exercise,
        duration: Number(duration),
        steps: Number(steps),
        calories: Number(calories)
    };

    records.push(record);

    localStorage.setItem("fitnessData", JSON.stringify(records));

    document.getElementById("exercise").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("steps").value = "";
    document.getElementById("calories").value = "";

    displayData();
}

function displayData() {

    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    let totalSteps = 0;
    let totalCalories = 0;
    let totalDuration = 0;

    records.forEach((record, index) => {

        totalSteps += record.steps;
        totalCalories += record.calories;
        totalDuration += record.duration;

        tableBody.innerHTML += `
        <tr>
            <td>${record.exercise}</td>
            <td>${record.duration} min</td>
            <td>${record.steps}</td>
            <td>${record.calories}</td>
            <td>
                <button class="delete-btn" onclick="deleteRecord(${index})">
                    Delete
                </button>
            </td>
        </tr>`;
    });

    document.getElementById("totalSteps").textContent = totalSteps;
    document.getElementById("totalCalories").textContent = totalCalories;
    document.getElementById("totalDuration").textContent = totalDuration;

    document.getElementById("stepProgress").value =
        Math.min(totalSteps, 10000);

    document.getElementById("calorieProgress").value =
        Math.min(totalCalories, 500);

    document.getElementById("stepValue").textContent =
        totalSteps + " / 10000";

    document.getElementById("calorieValue").textContent =
        totalCalories + " / 500";
}

function deleteRecord(index) {

    records.splice(index, 1);

    localStorage.setItem("fitnessData", JSON.stringify(records));

    displayData();
}