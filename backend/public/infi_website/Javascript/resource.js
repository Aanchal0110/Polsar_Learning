document.getElementById("submit_btn_1").addEventListener("click", async (e) => {
    e.preventDefault()

    const fileinput = document.getElementById("image");
    const formData = new FormData();
    formData.append("image", fileinput.files[0]);


    const res_1 = await fetch(`${window.location.origin}/resource/insert`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
                UserID: "1234567890",
                Auth_Name: document.getElementById("author").value,
                Title: document.getElementById("title").value,
                Contain_Link: document.getElementById("link").value,
                Content_Type: document.getElementById("type").value,
                Description: document.getElementById("description").value,
                Resource_Keyword: document.getElementById("keyword").value,
                UserName: document.getElementById("username").value,
            })
    })
    const data_1 = await res_1.json();
    if (res_1.status == 200) {
        const res_2 = await fetch(`${window.location.origin}/resource/upload_images`, {
                method: 'POST',
                body: formData
        })
        
        const data_2 = await res_2.json();
        if (res_2.status == 200) {
            const res_3 = await fetch(`${window.location.origin}/resource/add_images`,{
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            path: data_2.filePath,
            var_1: data_1.data[0].Trans_Id
            })
        })
            if (res_3.status == 200) {
                console.log(await res_3.json())
                window.location.reload();
            }
        }
    }
})