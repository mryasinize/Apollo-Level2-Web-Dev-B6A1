type FormatValueReturnType<T> = T extends string ? string : T extends number ? number : boolean

function formatValue<T extends string | number | boolean>(arg: T): FormatValueReturnType<T> {
    if (typeof arg === 'string') {
        return arg.toUpperCase() as FormatValueReturnType<T>
    } else if (typeof arg === 'number') {
        return arg * 10 as FormatValueReturnType<T>
    } else {
        return !arg as FormatValueReturnType<T>
    }
}

function getLength<T>(arg: string | Array<T>): number {
    if (typeof arg === 'string') {
        return arg.length
    } else {
        return arg.length
    }
}

class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }

    getDetails(): string {
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}

type Item = {
    title: string;
    rating: number;
}

function filterByRating(items: Array<Item>): Array<Item> {
    return items.filter(item => item.rating >= 4)
}

type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

function filterActiveUsers(users: Array<User>): Array<User> {
    return users.filter(user => user.isActive)
}

interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

function printBookDetails(book: Book) {
    console.log(`Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable ? 'Yes' : 'No'}`)
}

type ValType = string | number

function getUniqueValues(arr1: Array<ValType>, arr2: Array<ValType>): Array<ValType> {
    const result: Array<ValType> = []
    const lookup: { [key: string]: boolean } = {}

    for (let i = 0; i < arr1.length; i++) {
        const item = arr1[i]!
        const key = `${typeof item}-${item}`
        if (!lookup[key]) {
            lookup[key] = true
            result.push(item)
        }
    }

    for (let i = 0; i < arr2.length; i++) {
        const item = arr2[i]!
        const key = `${typeof item}-${item}`
        if (!lookup[key]) {
            lookup[key] = true
            result.push(item)
        }
    }

    return result
}

type Product = {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
    const totalPrice = products.reduce((total, item) => {
        const subtotal = item.price * item.quantity
        if (item.discount && item.discount > 0) {
            return total + subtotal - (subtotal * (item.discount / 100))
        } else {
            return total + subtotal
        }
    }, 0)
    return totalPrice
}