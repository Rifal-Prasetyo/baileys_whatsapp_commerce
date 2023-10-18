export function katabijak(result) {
    fetch('https://api.akuari.my.id/randomtext/katabijak')
    .then(res => res.json())
    .then(res => result([res.hasil.quotes, res.hasil.author]))
}