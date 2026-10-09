export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  // =========================
  // TANKS
  // =========================

  {
    id: 1,
    name: "M1 Abrams",
    category: "Tanks",
    price: 24000000,
    rating: 4.9,
    stock: 12,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/M-1%20Abrams%20Tank.jpg",
    description:
      "Detailed M1 Abrams military tank display model.",
  },

  {
    id: 2,
    name: "Leopard 2",
    category: "Tanks",
    price: 10000000,
    rating: 4.8,
    stock: 11,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Leopard%202%20tank.JPG",
    description:
      "Detailed Leopard 2 main battle tank display model.",
  },

  {
    id: 9,
    name: "T-90 Tank",
    category: "Tanks",
    price: 4500000,
    rating: 4.8,
    stock: 14,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/T-90%20Tank.jpg",
    description:
      "Detailed T-90 tank collectible display model.",
  },

  {
    id: 10,
    name: "Challenger 2",
    category: "Tanks",
    price: 6800000,
    rating: 4.9,
    stock: 9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Challenger%202%20tank.JPEG",
    description:
      "Detailed Challenger 2 tank display model.",
  },

  // =========================
  // HELICOPTERS
  // =========================

  {
    id: 3,
    name: "AH-64 Apache",
    category: "Helicopters",
    price: 127000000,
    rating: 4.9,
    stock: 6,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/AH-64%20Apache.jpg",
    description:
      "Detailed AH-64 Apache helicopter display model.",
  },

  {
    id: 4,
    name: "UH-60 Black Hawk",
    category: "Helicopters",
    price: 20000000,
    rating: 4.7,
    stock: 9,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/UH-60%20Black%20Hawk%20helicopter%20%284981087121%29.jpg",
    description:
      "Detailed UH-60 Black Hawk helicopter display model.",
  },

  {
    id: 11,
    name: "CH-47 Chinook",
    category: "Helicopters",
    price: 40000000,
    rating: 4.8,
    stock: 6,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/CH-47%20Chinook%20Helicopter%20170418-A-IY962-001.jpg",
    description:
      "Detailed CH-47 Chinook helicopter display model.",
  },

  {
    id: 12,
    name: "Mi-24 Hind",
    category: "Helicopters",
    price: 12000000,
    rating: 4.8,
    stock: 7,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mil%20Mi-24%20Hind%20Helicopter%20%2851326364451%29.jpg",
    description:
      "Detailed Mi-24 Hind helicopter display model.",
  },

  // =========================
  // FIGHTER JETS
  // =========================

  {
    id: 5,
    name: "F-22 Raptor",
    category: "Fighter Jets",
    price: 150000000,
    rating: 5.0,
    stock: 3,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/F-22%20Raptor.JPG",
    description:
      "Detailed F-22 Raptor fighter aircraft display model.",
  },

  {
    id: 6,
    name: "F-35 Lightning II",
    category: "Fighter Jets",
    price: 80000000,
    rating: 4.9,
    stock: 5,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/F-35%20Lightning%20II.jpg",
    description:
      "Detailed F-35 Lightning II fighter aircraft display model.",
  },

  {
    id: 13,
    name: "F-16 Fighting Falcon",
    category: "Fighter Jets",
    price: 60000000,
    rating: 4.8,
    stock: 8,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/F-16%20fighting%20falcon.jpg",
    description:
      "Detailed F-16 Fighting Falcon display model.",
  },

  {
    id: 14,
    name: "F/A-18 Super Hornet",
    category: "Fighter Jets",
    price: 70000000,
    rating: 4.9,
    stock: 6,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/SuperHornet.jpg",
    description:
      "Detailed F/A-18 Super Hornet display model.",
  },

  // =========================
  // VEHICLES
  // =========================

  {
    id: 7,
    name: "Military Transport Truck",
    category: "Vehicles",
    price: 500000,
    rating: 4.8,
    stock: 15,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Military%20truck%20of%20Singapore%202011-05-28.jpg",
    description:
      "Detailed military transport truck display model.",
  },

  {
    id: 8,
    name: "Armored Vehicle",
    category: "Vehicles",
    price: 1000000,
    rating: 4.9,
    stock: 10,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Armored%20vehicle%20in%20Kandahar.jpg",
    description:
      "Detailed armored military vehicle display model.",
  },

  {
    id: 15,
    name: "Military Humvee",
    category: "Vehicles",
    price: 220000,
    rating: 4.7,
    stock: 20,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/HMMWV%20Peruvian%20Army.jpg",
    description:
      "Detailed HMMWV Humvee military vehicle display model.",
  },

  {
    id: 16,
    name: "MRAP Vehicle",
    category: "Vehicles",
    price: 500000,
    rating: 4.8,
    stock: 2,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/An%20MRAP%20vehicle%20of%20the%20532d%20Expeditionary%20Security%20Forces%20Squadron%20at%20Joint%20Base%20Balad.jpg",
    description:
      "Detailed MRAP armored vehicle display model.",
  },
];