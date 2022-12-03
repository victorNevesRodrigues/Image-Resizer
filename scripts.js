const uploadContainer = document.querySelector(".uploadImage")
const fileInput = uploadContainer.querySelector("input")
const previewImg = uploadContainer.querySelector("img")
const widthInput = document.querySelector(".width input")
const heightInput = document.querySelector(".height input")
const aspectInput = document.querySelector(".lockAspect input")
const button = document.querySelector('button')
const qualityInput = document.querySelector('.reduceQuality input')
const containerImgResizer = document.querySelector('.imageResize')

let ogImageRatio

function containerFileInput () {
    fileInput.click()
}

function loadFile (e) {
    const file = e.target.files[0]
    if(!file) return
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener('load', () => {
        widthInput.value = previewImg.naturalWidth
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        uploadContainer.classList.add('active')
        containerImgResizer.classList.add('activeContent')
    })    
}

function widthAspectRatioDefinition () {
    const height = aspectInput.checked ? widthInput.value / ogImageRatio : heightInput.value
    heightInput.value = Math.floor(height)
}

function heightAspectRatioDefinition () {
    const width = aspectInput.checked ? heightInput.value * ogImageRatio : widthInput.value
    widthInput.value = Math.floor(width)
}

function resizeAndDownload () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const a = document.createElement('a')
    const imgQuality = qualityInput.checked ? 0.7 : 1.0
    
    canvas.width = widthInput.value
    canvas.height = heightInput.value

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)
    
    a.href = canvas.toDataURL('image/jpeg', imgQuality)
    a.download = new Date().getTime()
    a.click()
}

button.addEventListener('click', resizeAndDownload)
widthInput.addEventListener('keyup', widthAspectRatioDefinition)
heightInput.addEventListener('keyup', heightAspectRatioDefinition)
fileInput.addEventListener('change', loadFile)
uploadContainer.addEventListener('click', containerFileInput)
