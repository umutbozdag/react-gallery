export default function getRandomPhoto(count) {
    for (let i = 0; i <= count; i++) {
        fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => console.log(data));
    }
}