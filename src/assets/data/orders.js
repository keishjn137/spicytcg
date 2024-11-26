const orders = [
  {
    userId: 1,
    products: [
      {
        id: 1,
        name: "Yu-Gi-Oh! Starter Deck",
        price: 10,
        category: "Yu-Gi-Oh!",
        image: "/images/yugioh-starter.jpg",
        quantity: 1,
      },
      {
        id: 2,
        name: "Yu-Gi-Oh! Booster Pack",
        price: 15,
        category: "Yu-Gi-Oh!",
        image: "/images/yugioh-booster.jpg",
        quantity: 2,
      },
    ],
    totalPrice: 40,
    createdAt: "2024-11-27T10:00:00Z",
    status: "Pending",
  },
  {
    userId: 2,
    products: [
      {
        id: 5,
        name: "Pokemon Booster Pack",
        price: 20,
        category: "Pokemon",
        image: "/images/pokemon-booster.jpg",
        quantity: 1,
      },
      {
        id: 6,
        name: "Pokemon Trainer Box",
        price: 40,
        category: "Pokemon",
        image: "/images/yugioh-starter.jpg",
        quantity: 1,
      },
    ],
    totalPrice: 60,
    createdAt: "2024-11-26T15:30:00Z",
    status: "Completed",
  },
  {
    userId: 3,
    products: [
      {
        id: 3,
        name: "Yu-Gi-Oh! Duel Disk",
        price: 50,
        category: "Yu-Gi-Oh!",
        image: "/images/yugioh-dueldisk.jpg",
        quantity: 1,
      },
    ],
    totalPrice: 50,
    createdAt: "2024-11-25T08:45:00Z",
    status: "Cancelled",
  },
];

export default orders;
