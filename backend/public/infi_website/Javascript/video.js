const video_space = document.getElementById("videoSlider1")

function add_video(link, author, title) {
    const temp_1 = `<div class="video-item">
          <iframe
            src="${link}"
            allowfullscreen
          ></iframe>
          <div class="video-info">
            <a href="${link}" target="_blank">${title}</a>
            <p>By ${author}r</p>
          </div>
        </div>`
    
    video_space.innerHTML += temp_1;
}

async function set_data() {
    const res = await fetch("/data/data_3.json")
    const data_1 = await res.json();
    data_1.map((data, index) => {
        add_video(data.link, data.author, data.title)
    })
}

set_data();