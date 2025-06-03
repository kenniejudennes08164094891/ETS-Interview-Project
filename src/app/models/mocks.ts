export class Mocks {
}

export interface SellableItem {
  name?: string,
  price?: number,
  image?: string
}

export interface User{
  email: string | any,
  password: string | any
}

export const sellableItems = [
  { name: 'Anova Syrup', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
  { name: 'Classic Footwares', price: 7000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
  { name: 'Broil Bags', price: 8000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
  { name: 'Keena Vase', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
  { name: 'Classic Watches', price: 9000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
  { name: 'Umbro Boots', price: 10000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
  { name: 'Vanilla Creame', price: 4000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
  { name: 'Veeena Bags', price: 6000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
  { name: 'Amanda Lights', price: 7000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
  { name: 'Svanna Oysters', price: 3000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
  { name: 'PS5 Gamepads', price: 12000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg' },
  { name: 'Classic Tee Bags', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' }
];

export const imageIcons = {
  atmCards: 'assets/images/atm-card.png',
}

export const loginCredentials = {
  email: "test@airlabs.com",
  password: "password"
}