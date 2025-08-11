let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("student-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let rollno = document.getElementById("rollno").value;
    let className = document.getElementById("class").value;
    let contact = document.getElementById("contact").value;

    let student = { name, rollno, className, contact };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    this.reset();

    displayStudents();
});

function displayStudents() {
    let tablebody = document.querySelector("#studentTable tbody");
    tablebody.innerHTML = "";
    students.forEach((student, index) => {
        let row = `
           <tr>
             <td>${student.name}</td>
             <td>${student.rollno}</td>
             <td>${student.className}</td>
             <td>${student.contact}</td>
             <td>
               <button onclick="editStudent(${index})">Edit</button>
               <button onclick="deleteStudent(${index})">Delete</button>
             </td>
           </tr>
        `;
        tablebody.innerHTML += row;
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function editStudent(index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("rollno").value = student.rollno;
    document.getElementById("class").value = student.className;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

// Initial display
displayStudents();
