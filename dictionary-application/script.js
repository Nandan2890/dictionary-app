const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const API = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

searchButton.addEventListener('click', () => {
    const word = searchInput.value.trim();

    if (!word) {
        showErr('Please enter a word')
        return
    }

    getData(word)
});

function getData(word) {
    fetch(API + word)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Word not found')
            }

            return res.json()
        })
        .then((data) => {
            showData(data);
        })
        .catch((err) => {
            showErr(err)
        });
}

function showData(data) {

    const wordResult = document.querySelector('.word-result');
    wordResult.innerHTML = '';

    const html = `
        <div class="word-header">

                    <div>
                        <h3 id="word-display">${data[0].word}</h3>
                        <span id="phonetic-display">${data[0].phonetic || "N/A"}</span>
                    </div>

                    <button id="speaker">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
                        </svg>
                    </button>

                    <audio id="audio">
                       <source src="${data[0].phonetics[0].audio || ''}" type="audio/mpeg">
                    </audio>
                </div>

                <p id="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition || 'No definition found'}
                </p>

                <p id="word-example">
                    <b>Example: </b> ${data[0].meanings[0].definitions[0].example || 'No example'}
                </p>
    `;

    wordResult.innerHTML = html;
    document.querySelector('.result-section').classList.toggle('hide');

    const speaker = document.querySelector('#speaker');
    speaker.removeEventListener('click', playAudio)
    speaker.addEventListener('click', playAudio)

    function playAudio() {
        document.querySelector('#audio').play();
    }

    document.querySelector('#arrow-icon').addEventListener('click', () => {
        document.querySelector('.result-section').classList.toggle('hide');
    })
}

function showErr(text) {
    document.querySelector('#error-msg').textContent = text;
    searchInput.value = '';
}