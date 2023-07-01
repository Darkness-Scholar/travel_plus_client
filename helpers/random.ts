export default function random () {
    let math1 = Math.random() * 1234567890
    let math2 = Math.random() * 9876543210
    let math3 = Math.random() * 4321001234
    let rounded = (number) => Math.round(number)
    return `${rounded(math1)}-${rounded(math2)}-${rounded(math3)}`
}