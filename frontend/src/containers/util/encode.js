// convert byte array to image
export default pic => {
    var str =pic.Body.data.reduce(function (a, b) {
        return a + String.fromCharCode(b)
    }, '');
    return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
}