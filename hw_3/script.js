const photoContainer = document.getElementById("photo-container");
let page = Math.ceil(Math.random() * 100);

async function fetchPhotos() {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=eSHK0mFBMlKQJyWyORXyA9dcdXvuGtfMSxE5X2yTB3s`
        );
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error("Ошибка при загрузке фотографий:", error);
        return [];
    }
}

async function loadMorePhotos() {
    const photos = await fetchPhotos();
    console.log(photos);

    const fotoEl = photos[0].urls.small;
    const imgEl = document.createElement("img");
    imgEl.src = fotoEl;
    photoContainer.append(imgEl);

    const nameUser = photos[0].user.first_name;
    const h4El = document.createElement("h4");
    h4El.textContent = `Автор фотографии: ${nameUser}`;
    photoContainer.append(h4El);

    let liksEl = photos[0].likes;
    const pEl = document.createElement("p");
    pEl.textContent = `Лайки: ${liksEl}`;
    photoContainer.append(pEl);

    const btnEl = document.createElement("button");
    btnEl.textContent = `Лайк`;
    photoContainer.append(btnEl);

    btnEl.addEventListener("click", () => {
        liksEl = liksEl + 1;
        pEl.textContent = `Лайки: ${liksEl}`;
    });
}

loadMorePhotos();