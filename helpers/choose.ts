export default function choose<Type>(arr: Array<Type>):Type {
    let result = arr[Math.floor((Math.random() * arr.length))]
    return result
}