
document.getElementById("form_Submit").addEventListener('click', async (e) => {
    e.preventDefault();

    const fileinput = document.getElementById("image");
    const formData = new FormData();
    formData.append("image", fileinput.files[0]);

    const data = {
        User_Name: document.getElementById("name").value,
        ExpertEmail: document.getElementById("email").value,
        Description: document.getElementById("description").value,
        Expert_Type: document.getElementById("expert_type").value,
    }

    const res_1 = await fetch(`${window.location.origin}/domainExpert/insert`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })

    const data_1 = await res_1.json();
    if (res_1.status == 200) {
        const res_2 = await fetch(`${window.location.origin}/domainExpert/upload_images`, {
            method: "POST",
            body: formData
        })
        const data_2 = await res_2.json();
        console.log(data_2)
        if (res_2.status == 200) {
            const res_2 = await fetch(`${window.location.origin}/domainExpert/add_image`, {
                method: "POST",
                headers: {
            'Content-Type':'application/json'
        },
                body: JSON.stringify({
                    card_id: data_1[0].card_id,
                    path:data_2.filePath
            })
        })
        }
    }
})