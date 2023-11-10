// Folder Foto
function toggleFotos() {
    var carpetaFotos = document.getElementById("carpeta-fotos");
    if (carpetaFotos.style.display === "block") {
        carpetaFotos.style.display = "none";
    } else {
        carpetaFotos.style.display = "block";
    }
}

function cerrarFotos() {
    var carpetaFotos = document.getElementById("carpeta-fotos");
    carpetaFotos.style.display = "none";
}


function openImage(imageSrc, imageName) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalImageName = document.getElementById("modal-image-name");

    modalImage.src = imageSrc;
    modalImageName.innerText = imageName; // Establece el nombre de la imagen
    modal.style.display = "block";
}

function closeImage() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

//videos

// Folder video
function toggleVideos() {
    var carpetaVideos = document.getElementById("carpeta-videos");
    if (carpetaVideos.style.display === "block") {
        carpetaVideos.style.display = "none";
    } else {
        carpetaVideos.style.display = "block";
    }
}

function cerrarVideos() {
    var carpetaVideos = document.getElementById("carpeta-videos");
    carpetaVideos.style.display = "none";
}

function openVideo(videoSrc, videoName) {
    const videoModal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");
    const videoNameElement = document.getElementById("video-name");

    videoPlayer.src = videoSrc;
    videoNameElement.innerText = videoName;
    videoModal.style.display = "block";
}

function closeVideo() {
    const videoModal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");

    videoModal.style.display = "none";
    videoPlayer.pause();
}

//Planes
function togglePlanes(){
    var carpetaPlanes = document.getElementById("carpeta-planes");
    if (carpetaPlanes.style.display === "block") {
        carpetaPlanes.style.display = "none";
    } else {
        carpetaPlanes.style.display = "block";
    }
}


function cerrarPlanes() {
    var carpetaPlanes = document.getElementById("carpeta-planes");
    carpetaPlanes.style.display = "none";
}
