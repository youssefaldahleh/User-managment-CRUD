const table = document.querySelector(".table");
const create = document.querySelector(".create");
const form = document.querySelector("form");
const textinput = document.querySelectorAll(".text-input");
const close = document.querySelector(".close");
const submit = document.querySelector(".submit");
const inputName = document.getElementById("name");
const loader = document.querySelector(".loader");
// loader.style.visibility = "visible";

// async function getUsers() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();
//   console.log(users);
// }

fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    loader.style.visibility = "hidden";
    let template = "";
    data.forEach((info) => {
      // another way
      template += `
        <tr class = "id" data-id="${info.id}">
          <td class = "name">${info.name}</td>
          <td class = "email">${info.email}</td>
          <td class = "website">${info.website}</td>
          <td class = "phone">${info.phone}</td>
          <td>
            <button onclick="deleteUser(${info.id})">Delete</button>
            <button onclick="editUser(${info.id})">Edit</button>
            <button onclick="viewUser(${info.id})">View</button>
          </td>
        </tr>
      `;
    });
    table.querySelector("tbody").innerHTML = template;

  
  })
  .catch((error) => {
    document.body.innerHTML = "";
    const errorDiv = document.createElement("div");
    const errorMsg = document.createTextNode(error);
    errorDiv.appendChild(errorMsg);
    document.body.appendChild(errorDiv);
  });

create.addEventListener("click", (e) => {
  form.style.visibility = "visible";
  // table.style.visibility = "hidden";
});
close.addEventListener("click", (e) => {
  form.style.visibility = "hidden";
  table.style.visibility = "visible";
  form.reset(); 
});

function deleteUser(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((Response) => {
      console.log(Response);
      return Response.json();
    })
    .then((data) => {
      // console.log(data);
      // const del = e.target;
      // del.closest("tr").remove();
      // this.remove();
      document.querySelector(`[data-id="${userId}"]`).remove();
    });
}
function viewUser(userId) {
  submit.style.visibility = "hidden";
  form.style.visibility = "visible";

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.style.visibility = "visible";
      // table.style.visibility = "hidden";
      close.style.width = "100%";

      for (var key of textinput.values()) {
        if (key.name === "name") {
          key.value = data.name;
        } else if (key.name === "email") {
          key.value = data.email;
        } else if (key.name === "phone") {
          key.value = data.phone;
        } else if (key.name === "website") {
          key.value = data.website;
        }

        key.disabled = true;
      }
    });
}
function editUser(userId) {
  submit.innerHTML = "Up date";
  form.style.visibility = "visible";
  form.setAttribute("data-edit", userId);
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: "get",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.style.visibility = "visible";

      //   Object.keys(temp1).forEach(key => {
      //     const input = document.querySelector(`[name=${key}]`);
      //     if(input)
      //         input.value = temp1[key];
      // });

      for (var key of textinput.values()) {
        if (key.name === "name") {
          key.value = data.name;
        } else if (key.name === "email") {
          key.value = data.email;
        } else if (key.name === "phone") {
          key.value = data.phone;
        } else if (key.name === "website") {
          key.value = data.website;
        }
      }
    

    });
    document.contact - form.reset();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  table.style.visibility = "visible";
  form.style.visibility = "hidden";
  const formData = new FormData(e.target);
  const pay = new URLSearchParams(formData);
  console.log([...pay]);
  const userId= form.getAttribute("data-edit")
  if (userId) {
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT",
      body: pay,
    })
      .then((Response) => {
        console.log(Response);
        return Response.json();
      })
      .then((data) => {
        console.log(data);
       
        
       document.querySelector(`[data-id="${userId}"]`).querySelector('.name').innerHTML = data.name;
       document.querySelector(`[data-id="${userId}"]`).querySelector('.email').innerHTML = data.email;
       document.querySelector(`[data-id="${userId}"]`).querySelector('.website').innerHTML = data.website;
       document.querySelector(`[data-id="${userId}"]`).querySelector('.phone').innerHTML = data.phone;

       
      });
  } else {
    e.preventDefault()
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: pay,
    })
    .then((Response) => {
      console.log(Response);
      return Response.json();
    })
    .then((data) => {
       let template = table.querySelector("tbody").innerHTML
      template +=`
          <tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.website}</td>
            <td>
              <button onclick = "deleteUser(${data.id})">Delete</button>
              <button onclick = "viewUser(${data.id})">View</button>
              <button onclick = "editUser(${data.id})">Edit</button>
            </td>
          </tr>
        `;
        table.querySelector('tbody').innerHTML = template;
      
      });

      document.contact - form.reset();
    }
  });
  




