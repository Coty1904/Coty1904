// Función genérica para cambiar la visibilidad de una carpeta
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = element.style.display === "block" ? "none" : "block";
}

// Función genérica para cerrar una carpeta
function closeFolder(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = "none";
}

// Función genérica para abrir una imagen o video en un modal
function openMedia(mediaSrc, mediaName, modalId, mediaElementId, nameElementId) {
    const modal = document.getElementById(modalId);
    const mediaElement = document.getElementById(mediaElementId);
    const nameElement = document.getElementById(nameElementId);

    mediaElement.src = mediaSrc;
    nameElement.innerText = mediaName;
    modal.style.display = "flex";
}

// Función genérica para cerrar un modal de imagen o video
function closeMedia(modalId, mediaElementId) {
    const modal = document.getElementById(modalId);
    const mediaElement = document.getElementById(mediaElementId);

    modal.style.display = "none";
    if (mediaElement.tagName.toLowerCase() === "video") {
        mediaElement.pause();
    }
}

// Fotos
function toggleFotos() {
    toggleVisibility("carpeta-fotos");
}

function cerrarFotos() {
    closeFolder("carpeta-fotos");
}

function openImage(imageSrc, imageName) {
    openMedia(imageSrc, imageName, "image-modal", "modal-image", "modal-image-name");
}

function closeImage() {
    closeMedia("image-modal", "modal-image");
}

// Videos
function toggleVideos() {
    toggleVisibility("carpeta-videos");
}

function cerrarVideos() {
    closeFolder("carpeta-videos");
}

function openVideo(videoSrc, videoName) {
    openMedia(videoSrc, videoName, "video-modal", "video-player", "video-name");
}

function closeVideo() {
    closeMedia("video-modal", "video-player");
}

// Planes
function togglePlanes() {
    toggleVisibility("carpeta-planes");
}

function cerrarPlanes() {
    closeFolder("carpeta-planes");
}
