function customFormDataSelim(formData, key, value) {
    if(!formData.__entries) {
        formData.__entries = []
    }

    if(value instanceof File) {
        formData.__entries.push([key,value])
    }else {
        formData.__entries.push([key, String(value)])
    }
}

FormData.prototype.selim = (key, value) => {
    customFormDataSelim(this, key, value)
}

export default customFormDataSelim