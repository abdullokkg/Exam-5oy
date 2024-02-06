async function fetchMedia() {
    const mediaType = document.getElementById('mediaType').value;
    const searchInput = document.getElementById('searchInput').value
    let apiUrl = '';
    if (mediaType === 'image') {
        apiUrl = "https://api.pexels.com/v1/search?query=" + searchInput + "&per_page=15";
    } else if (mediaType === 'video') {
        apiUrl = "https://api.pexels.com/videos/search?query=" + searchInput + "&per_page=15";
    }

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: 'QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq'
        }
    });
    const data = await response.json();
    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.innerHTML = '';

    if (mediaType === 'image') {
        data.photos.forEach(photo => {
            const h1 = document.getElementById("h1")
            h1.innerHTML = `Фото на тему ${searchInput}`
            const img = document.createElement('img');
            img.src = photo.src.medium;
            img.alt = photo.photographer;
            mediaContainer.appendChild(img);
            img.onclick = function () {
                window.open(photo.src.original);
            };
        });
    } else if (mediaType === 'video') {
        data.videos.forEach(video => {
            const h1 = document.getElementById("h1")
            h1.innerHTML = `Видео на тему ${searchInput}`
            const videoElement = document.createElement('video');
            videoElement.src = video.video_files[0].link;
            videoElement.controls = true;
            videoElement.width = 320;
            videoElement.height = 240;
            mediaContainer.appendChild(videoElement);
        });
    }
}


document.getElementById('mediaType').addEventListener('change', fetchMedia);


fetchMedia(); 