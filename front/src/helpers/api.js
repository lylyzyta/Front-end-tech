export default async function getProducts (url) {
    const response = await fetch(url)
    return await response.json()
  }