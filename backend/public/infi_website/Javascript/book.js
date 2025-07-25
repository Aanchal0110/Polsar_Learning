const row_info = `<tr>
            <td>
              <img
                src="/infi_website/image/book1 Arthur P. Cracknell.jpg"
                alt="Introduction to Remote Sensing"
              />
            </td>
            <td><a href="#">Introduction to Remote Sensing</a></td>
            <td>Arthur P. Cracknell</td>
            <td>
              Comprehensive introduction with applications across multiple
              scientific domains.
            </td>
          </tr>`

const table_body = document.getElementById("table_body");

function addBooks(title, author, info, image, link) {
    table_body.innerHTML += `<tr>
            <td>
              <img
                src="${image}"
                alt="Introduction to Remote Sensing"
              />
            </td>
            <td><a href="${link}">${title}</a></td>
            <td>${author}</td>
            <td>
              ${info}
            </td>
          </tr>`
}

async function get_resource() {
    const res = await fetch(`${window.location.origin}/resource`);
    const data = await res.json();
    return data
}

async function update_data() {
    const data = await get_resource();
    console.log(data)
    data.map((data, index) => {
        // table_body.innerHTML += row_info;
        let url = data.Images.replace("uploads\\", "");
        addBooks(data.Title, data.Auth_Name, data.Description, url, data.Contain_Link);
    })
}

update_data();