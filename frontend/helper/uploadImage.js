const url = `https://api.cloudinary.com/v1_1/dlshacwo5/image/upload`

const uploadImage = async(image) =>{
    const formdata = new FormData()
    formdata.append("file", image)
    formdata.append("upload_preset", "ecommerce_product")
    const res = await fetch(url,{
        method : "POST",
        body : formdata
    })

    return res.json()
}

export default uploadImage