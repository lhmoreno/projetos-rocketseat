import axios from "axios"

export const coffeeDeliveryApi = axios.create({
  baseURL: 'http://localhost:4000',
})

export const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
})
