import axios from "axios"

export const fetchBooksAPI = (searchTerm: string) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
}