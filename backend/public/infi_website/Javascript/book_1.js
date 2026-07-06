const table_body = document.getElementById("table_body");

function addBooks(title, author, info, link) {
    table_body.innerHTML += `<tr>
            <td>
              <img
                src="/infi wesbite/image/earth.png"
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

async function get_data() {
    const res = await fetch("/data/data.json");
    const data = res.json();
    return data
}

async function set_data() {
    const data = await get_data();
    data.map((data, index) => {
        addBooks(data.title, data.Author, data.info, data.link)
    })
}

set_data();