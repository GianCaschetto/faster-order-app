import type { Order } from "@/app/admin/orders/page"
import type { Customer } from "@/app/admin/customers/page"
import type { Branch, Extra } from "@/components/restaurant-menu"
import { ExtraGroup } from "@/app/admin/extras/page";
import { GalleryImage } from "@/app/admin/gallery/page";
import { StockItem } from "@/components/stock-management";

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ORD-5123",
    customerName: "Juan Pérez",
    customerEmail: "juan@ejemplo.com",
    customerPhone: "+34 612 345 678",
    customerAddress: "Calle Principal 123, Madrid",
    branchId: "branch-1",
    items: [
      {
        id: "1",
        productName: "Pan de Ajo",
        quantity: 2,
        price: 5.99,
        extras: ["Queso Extra", "Hierbas Italianas"],
      },
      {
        id: "2",
        productName: "Ensalada César",
        quantity: 1,
        price: 8.99,
        extras: ["Pollo a la Parrilla"],
      },
    ],
    subtotal: 20.97,
    deliveryFee: 3.99,
    total: 24.96,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-15T11:15:00Z",
  },
  {
    id: "ORD-31474-B",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "(234) 567-8901",
    customerAddress: "456 High St, Uptown",
    branchId: "2",
    items: [
      { id: "1", productName: "Spaghetti Bolognese", quantity: 1, price: 14.99 },
      { id: "2", productName: "Tiramisu", quantity: 1, price: 7.99 },
      { id: "3", productName: "Soft Drink", quantity: 2, price: 2.99 },
    ],
    subtotal: 28.96,
    deliveryFee: 3.99,
    total: 32.95,
    status: "preparing",
    paymentMethod: "cash",
    paymentStatus: "pending",
    createdAt: "2023-05-15T16:45:00Z",
    updatedAt: "2023-05-15T17:00:00Z",
  },
  {
    id: "ORD-5121",
    customerName: "Robert Johnson",
    customerEmail: "robert@example.com",
    customerPhone: "(345) 678-9012",
    customerAddress: "789 West Blvd, Westside",
    branchId: "3",
    items: [
      { id: "1", productName: "Grilled Salmon", quantity: 1, price: 18.99 },
      { id: "2", productName: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    subtotal: 27.98,
    deliveryFee: 3.99,
    total: 31.97,
    status: "confirmed",
    paymentMethod: "card",
    paymentStatus: "paid",
    createdAt: "2023-05-14T19:15:00Z",
    updatedAt: "2023-05-14T19:30:00Z",
  },
  {
    id: "ORD-5120",
    customerName: "Emily Davis",
    customerEmail: "emily@example.com",
    customerPhone: "(456) 789-0123",
    customerAddress: "101 Park Ave, Downtown",
    branchId: "1",
    items: [
      { id: "1", productName: "Chocolate Cake", quantity: 2, price: 6.99 },
      { id: "2", productName: "Fresh Juice", quantity: 2, price: 4.99 },
    ],
    subtotal: 23.96,
    deliveryFee: 3.99,
    total: 27.95,
    status: "cancelled",
    paymentMethod: "card",
    paymentStatus: "paid",
    createdAt: "2023-05-14T12:00:00Z",
    updatedAt: "2023-05-14T12:30:00Z",
  },
  {
    id: "ORD-5119",
    customerName: "Michael Brown",
    customerEmail: "michael@example.com",
    customerPhone: "(567) 890-1234",
    customerAddress: "202 Lake St, Uptown",
    branchId: "2",
    items: [
      { id: "1", productName: "Margherita Pizza", quantity: 1, price: 12.99, extras: ["Extra Cheese", "Mushrooms"] },
    ],
    subtotal: 12.99,
    deliveryFee: 3.99,
    total: 16.98,
    status: "ready",
    paymentMethod: "cash",
    paymentStatus: "pending",
    createdAt: "2023-05-13T18:30:00Z",
    updatedAt: "2023-05-13T19:00:00Z",
  },
  {
    id: "ORD-5118",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    customerPhone: "(678) 901-2345",
    customerAddress: "303 River Rd, Westside",
    branchId: "3",
    items: [
      { id: "1", productName: "Spaghetti Bolognese", quantity: 2, price: 14.99 },
      { id: "2", productName: "Garlic Bread", quantity: 1, price: 5.99 },
      { id: "3", productName: "Soft Drink", quantity: 2, price: 2.99 },
    ],
    subtotal: 41.95,
    deliveryFee: 3.99,
    total: 45.94,
    status: "pending",
    paymentMethod: "card",
    paymentStatus: "pending",
    createdAt: "2023-05-13T20:15:00Z",
    updatedAt: "2023-05-13T20:15:00Z",
  },
]

// Default branches - will be used if no branches are found in localStorage
export const defaultBranches: Branch[] = [
  { id: "1", name: "Downtown", address: "123 Main St, Downtown" },
  { id: "2", name: "Uptown", address: "456 High St, Uptown" },
  { id: "3", name: "Westside", address: "789 West Blvd, Westside" },
];

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "María García",
    email: "maria@ejemplo.com",
    phone: "+34 623 456 789",
    address: "Avenida Central 456, Barcelona",
    totalOrders: 12,
    totalSpent: 458.50,
    status: "vip",
    lastOrderDate: "2024-03-14",
    createdAt: "2022-08-05T09:20:00Z",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "+34 634 567 890",
    address: "Plaza Mayor 789, Valencia",
    totalOrders: 5,
    totalSpent: 187.25,
    status: "active",
    lastOrderDate: "2024-03-10",
    createdAt: "2022-08-05T09:20:00Z",
  },
  {
    id: "CUST-1003",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "(345) 678-9012",
    address: "789 West Blvd, Westside",
    status: "active",
    totalOrders: 5,
    totalSpent: 187.45,
    lastOrderDate: "2023-05-14T19:15:00Z",
    createdAt: "2022-08-05T09:20:00Z",
  },
  {
    id: "CUST-1004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(456) 789-0123",
    address: "101 Park Ave, Downtown",
    status: "inactive",
    totalOrders: 3,
    totalSpent: 89.85,
    lastOrderDate: "2023-03-14T12:00:00Z",
    createdAt: "2022-12-10T16:45:00Z",
  },
  {
    id: "CUST-1005",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(567) 890-1234",
    address: "202 Lake St, Uptown",
    status: "active",
    totalOrders: 8,
    totalSpent: 276.4,
    lastOrderDate: "2023-05-13T18:30:00Z",
    createdAt: "2022-06-22T11:10:00Z",
    notes: "Prefers pickup. Frequently orders for office lunches.",
  },
  {
    id: "CUST-1006",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "(678) 901-2345",
    address: "303 River Rd, Westside",
    status: "vip",
    totalOrders: 32,
    totalSpent: 1567.2,
    lastOrderDate: "2023-05-13T20:15:00Z",
    createdAt: "2021-09-15T08:30:00Z",
    notes: "VIP customer. Prefers gluten-free options. Has corporate account.",
  },
  {
    id: "CUST-1007",
    name: "David Miller",
    email: "david@example.com",
    phone: "(789) 012-3456",
    address: "404 Hill St, Downtown",
    status: "active",
    totalOrders: 15,
    totalSpent: 523.75,
    lastOrderDate: "2023-05-10T13:45:00Z",
    createdAt: "2022-03-28T15:20:00Z",
  },
  {
    id: "CUST-1008",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "(890) 123-4567",
    address: "505 Valley Rd, Uptown",
    status: "inactive",
    totalOrders: 2,
    totalSpent: 45.98,
    lastOrderDate: "2023-02-20T17:30:00Z",
    createdAt: "2023-01-05T10:15:00Z",
  },
  {
    id: "CUST-1009",
    name: "Christopher Anderson",
    email: "chris@example.com",
    phone: "(901) 234-5678",
    address: "606 Mountain Ave, Westside",
    status: "active",
    totalOrders: 7,
    totalSpent: 198.45,
    lastOrderDate: "2023-05-08T19:00:00Z",
    createdAt: "2022-10-12T14:30:00Z",
    notes: "Prefers spicy food. Usually orders on weekends.",
  },
  {
    id: "CUST-1010",
    name: "Jessica Martinez",
    email: "jessica@example.com",
    phone: "(012) 345-6789",
    address: "707 Ocean Dr, Downtown",
    status: "vip",
    totalOrders: 22,
    totalSpent: 876.3,
    lastOrderDate: "2023-05-12T12:15:00Z",
    createdAt: "2022-02-18T09:45:00Z",
    notes: "VIP customer. Frequently hosts parties. Prefers seafood options.",
  },
]

// Export products for analytics
export const products: LocalProduct[] = [
  {
    id: "1",
    name: "Pan de Ajo",
    description: "Pan recién horneado con mantequilla de ajo",
    price: 5.99,
    image: {
      src: "/pictures/pan-de-ajo.webp",
      width: 600,
      height: 400
    },
    categoryId: "starters",
    stockId: "pan-ajo",
    extras: [
      { id: "extra-queso", name: "Queso Extra", price: 1.5, min: 0, max: 3 },
      { id: "hierbas", name: "Hierbas Italianas", price: 0.75, min: 0, max: 2 },
    ],
  },
  {
    id: "2",
    name: "Ensalada César",
    description: "Lechuga romana fresca con aderezo César",
    price: 8.99,
    image: {
      src: "/pictures/ensalada-cesar.webp",
      width: 600,
      height: 400
    },
    categoryId: "starters",
    stockId: "ensalada-cesar",
    extras: [
      { id: "pollo", name: "Pollo a la Parrilla", price: 2.5, min: 0, max: 2 },
      { id: "crutones", name: "Crutones Extra", price: 0.5, min: 0, max: 2 },
      { id: "parmesano", name: "Queso Parmesano", price: 1.0, min: 0, max: 2 },
    ],
  },
  {
    id: "3",
    name: "Pizza Margarita",
    description: "Pizza clásica con salsa de tomate y mozzarella",
    price: 12.99,
    image: {
      src: "/pictures/pizza-margarita.webp",
      width: 600,
      height: 400
    },
    categoryId: "mains",
    stockId: "margherita-pizza",
    extras: [
      { id: "extra-cheese-pizza", name: "Extra Cheese", price: 2.0 },
      { id: "mushrooms", name: "Mushrooms", price: 1.5 },
      { id: "pepperoni", name: "Pepperoni", price: 2.0 },
      { id: "olives", name: "Olives", price: 1.0 },
    ],
  },
  {
    id: "4",
    name: "Spaghetti Boloñesa",
    description: "Spaghetti con salsa de carne rica",
    price: 14.99,
    image: {
      src: "/pictures/spaghetti-boloñesa.webp",
      width: 600,
      height: 400
    },
    categoryId: "mains",
    stockId: "spaghetti-bolognese",
    extras: [
      { id: "extra-sauce", name: "Extra Sauce", price: 1.5 },
      { id: "parmesan-pasta", name: "Parmesan Cheese", price: 1.0 },
      { id: "garlic-bread-side", name: "Side of Garlic Bread", price: 3.99 },
    ],
  },
  {
    id: "5",
    name: "Salmón a la Parrilla",
    description: "Salmón fresco con mantequilla de limón",
    price: 18.99,
    image: {
      src: "/pictures/salmon-parrilla.webp",
      width: 600,
      height: 400
    },
    categoryId: "mains",
    stockId: "grilled-salmon",
    extras: [
      { id: "extra-sauce-salmon", name: "Extra Lemon Butter", price: 1.0 },
      { id: "asparagus", name: "Side of Asparagus", price: 3.5 },
      { id: "mashed-potatoes", name: "Mashed Potatoes", price: 2.99 },
    ],
  },
  {
    id: "6",
    name: "Pastel de Chocolate",
    description: "Pastel de chocolate con ganache",
    price: 6.99,
    image: {
      src: "/pictures/pastel-de-chocolate.webp",
      width: 600,
      height: 400
    },
    categoryId: "desserts",
    stockId: "pastel-chocolate",
    extras: [
      { id: "ice-cream", name: "Helado de Vainilla", price: 1.99 },
      { id: "whipped-cream", name: "Crema Batida", price: 0.75 },
      { id: "chocolate-sauce", name: "Salsa de Chocolate Extra", price: 0.5 },
    ],
  },
  {
    id: "7",
    name: "Tiramisu",
    description: "Postre italiano clásico con café y mascarpone",
    price: 7.99,
    image: {
      src: "/pictures/tiramisu.webp",
      width: 600,
      height: 400
    },
    categoryId: "desserts",
    stockId: "tiramisu",
    extras: [
      { id: "cocoa-powder", name: "Extra Cocoa Powder", price: 0.25 },
      { id: "coffee-shot", name: "Espresso Shot", price: 1.5 },
    ],
  },
  {
    id: "8",
    name: "Refresco",
    description: "Coca-Cola, Limonada o Naranja",
    price: 2.99,
    image: {
      src: "/pictures/refresco.webp",
      width: 600,
      height: 400
    },
    categoryId: "drinks",
    stockId: "refresco",
    extras: [
      { id: "ice", name: "Extra Ice", price: 0.0 },
      { id: "lemon", name: "Lemon Slice", price: 0.25 },
    ],
  },
  {
    id: "9",
    name: "Jugo Fresco",
    description: "Jugo de naranja o manzana recién exprimido",
    price: 4.99,
    image: {
      src: "/pictures/jugo-fresco.webp",
      width: 600,
      height: 400
    },
    categoryId: "drinks",
    stockId: "jugo-fresco",
    extras: [
      { id: "ginger", name: "Ginger", price: 0.5 },
      { id: "mint", name: "Fresh Mint", price: 0.5 },
    ],
  },
  {
    id: "10",
    name: "Hamburguesa de carne",
    description: "Hamburguesa de carne con queso y lechuga",
    price: 7.99,
    image: {
      src: "/pictures/burguer.webp",
      width: 600,
      height: 400
    },
    categoryId: "mains",
    stockId: "brguer",
    extras: [
      { id: "extra-cheese-burguer", name: "Extra Cheese", price: 1.0 },
      { id: "bacon", name: "Bacon", price: 1.5 },
      { id: "onion", name: "Onion Rings", price: 1.0 },
    ],
  },
]

// Mock categories
export const categories = [
  { id: "starters", name: "Entrantes" },
  { id: "mains", name: "Platos Principales" },
  { id: "desserts", name: "Postres" },
  { id: "drinks", name: "Bebidas" },
  { id: "sides", name: "Guarniciones" },
  { id: "specials", name: "Especiales" },
]

// Mock schedule data
export const defaultSchedule = [
  { dayOfWeek: 0, hours: "12:00 - 22:00", isOpen: true }, // Domingo
  { dayOfWeek: 1, hours: "11:00 - 23:00", isOpen: true }, // Lunes
  { dayOfWeek: 2, hours: "11:00 - 23:00", isOpen: true }, // Martes
  { dayOfWeek: 3, hours: "11:00 - 23:00", isOpen: true }, // Miércoles
  { dayOfWeek: 4, hours: "11:00 - 23:00", isOpen: true }, // Jueves
  { dayOfWeek: 5, hours: "11:00 - 00:00", isOpen: true }, // Viernes
  { dayOfWeek: 6, hours: "11:00 - 00:00", isOpen: true }, // Sábado
]

export const initialExtraGroups: ExtraGroup[] = [
  {
    id: "ingredientes-pizza",
    name: "Ingredientes de Pizza",
    description: "Ingredientes adicionales para pizzas",
    categoryIds: ["mains"],
    extras: [
      { id: "queso-extra", name: "Queso Extra", price: 2.0, min: 0, max: 3 },
      { id: "champiñones", name: "Champiñones", price: 1.5, min: 0, max: 2 },
      { id: "pepperoni", name: "Pepperoni", price: 2.0, min: 0, max: 2 },
      { id: "aceitunas", name: "Aceitunas", price: 1.0, min: 0, max: 2 },
      { id: "tocino", name: "Tocino", price: 2.5, min: 0, max: 2 },
    ],
  },
  {
    id: "acompañamientos",
    name: "Opciones de Acompañamiento",
    description: "Acompañamientos adicionales para platos principales",
    categoryIds: ["mains", "starters"],
    extras: [
      { id: "papas-fritas", name: "Papas Fritas", price: 3.99, min: 0, max: 1 },
      { id: "ensalada", name: "Ensalada", price: 4.99, min: 0, max: 1 },
      {
        id: "pure-papas",
        name: "Puré de Papas",
        price: 3.99,
        min: 0,
        max: 1,
      },
      { id: "pan-ajo", name: "Pan de Ajo", price: 3.99, min: 0, max: 1 },
    ],
  },
  {
    id: "adiciones-bebidas",
    name: "Adiciones para Bebidas",
    description: "Complementos para bebidas",
    categoryIds: ["drinks"],
    extras: [
      { id: "hielo", name: "Hielo Extra", price: 0.0, min: 0, max: 1 },
      { id: "limon", name: "Rodaja de Limón", price: 0.25, min: 0, max: 2 },
      { id: "menta", name: "Menta Fresca", price: 0.5, min: 0, max: 1 },
      {
        id: "crema-batida",
        name: "Crema Batida",
        price: 1.0,
        min: 0,
        max: 1,
      },
      {
        id: "shot-espresso",
        name: "Shot de Espresso",
        price: 1.5,
        min: 0,
        max: 2,
      },
    ],
  },
  {
    id: "toppings-postres",
    name: "Toppings para Postres",
    description: "Toppings para postres",
    categoryIds: ["desserts"],
    extras: [
      {
        id: "salsa-chocolate",
        name: "Salsa de Chocolate",
        price: 0.75,
        min: 0,
        max: 3,
        required: false,
      },
      {
        id: "salsa-caramelo",
        name: "Salsa de Caramelo",
        price: 0.75,
        min: 0,
        max: 3,
      },
      {
        id: "salsa-fresa",
        name: "Salsa de Fresa",
        price: 0.75,
        min: 0,
        max: 3,
      },
      { id: "nueces", name: "Nueces Mixtas", price: 1.25, min: 0, max: 1 },
      {
        id: "crema-batida-postre",
        name: "Crema Batida",
        price: 0.75,
        min: 0,
        max: 1,
      },
      {
        id: "helado-vainilla",
        name: "Helado de Vainilla",
        price: 1.99,
        min: 1,
        max: 2,
        required: true,
      },
    ],
  },
];

export const sampleImages: GalleryImage[] = [
  {
    id: "img-1",
    url: "/public/pictures/2151431747.jpg",
    name: "Sample Image 1",
    uploadedAt: new Date().toISOString(),
    size: "12 KB",
    dimensions: "200x200",
    type: "JPG",
    usedIn: [],
  },
  {
    id: "img-2",
    url: "/faster-order-app/app/admin/public/pictures/2151431747.jpg",
    name: "Pizza Image",
    uploadedAt: new Date().toISOString(),
    size: "15 KB",
    dimensions: "300x300",
    type: "jpg",
    usedIn: ["3"], // Used in Margherita Pizza
  },
  {
    id: "img-3",
    url: "/public/pictures/2151431747.jpg",
    name: "Pasta Image",
    uploadedAt: new Date().toISOString(),
    size: "14 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["4"], // Used in Spaghetti Bolognese
  },
  {
    id: "img-4",
    url: "/app/admin/public/pictures/2151431747.jpg",
    name: "Dessert Image",
    uploadedAt: new Date().toISOString(),
    size: "13 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["6", "7"], // Used in desserts
  },
  {
    id: "img-5",
    url: "/app/admin/public/pictures/2151431747.jpg",
    name: "Drink Image",
    uploadedAt: new Date().toISOString(),
    size: "12 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["8", "9"], // Used in drinks
  },
];

export const defaultStock: StockItem[] = [
  // Downtown branch
  {
    id: "1-pan-ajo",
    productId: "pan-ajo",
    productName: "Pan de Ajo",
    branchId: "1",
    quantity: 25,
  },
  {
    id: "1-ensalada-cesar",
    productId: "ensalada-cesar",
    productName: "Ensalada César",
    branchId: "1",
    quantity: 15,
  },
  {
    id: "1-pizza-margarita",
    productId: "pizza-margarita",
    productName: "Pizza Margarita",
    branchId: "1",
    quantity: 20,
  },
  {
    id: "1-espagueti-bolonesa",
    productId: "espagueti-bolonesa",
    productName: "Espagueti a la Boloñesa",
    branchId: "1",
    quantity: 18,
  },
  {
    id: "1-salmon-asado",
    productId: "salmon-asado",
    productName: "Salmón Asado",
    branchId: "1",
    quantity: 12,
  },
  {
    id: "1-pastel-chocolate",
    productId: "pastel-chocolate",
    productName: "Pastel de Chocolate",
    branchId: "1",
    quantity: 10,
  },
  {
    id: "1-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisú",
    branchId: "1",
    quantity: 8,
  },
  {
    id: "1-refresco",
    productId: "refresco",
    productName: "Refresco",
    branchId: "1",
    quantity: 50,
  },
  {
    id: "1-jugo-natural",
    productId: "jugo-natural",
    productName: "Jugo Natural",
    branchId: "1",
    quantity: 20,
  },

  // Uptown branch
  {
    id: "2-pan-ajo",
    productId: "pan-ajo",
    productName: "Pan de Ajo",
    branchId: "2",
    quantity: 18,
  },
  {
    id: "2-ensalada-cesar",
    productId: "ensalada-cesar",
    productName: "Ensalada César",
    branchId: "2",
    quantity: 12,
  },
  {
    id: "2-pizza-margarita",
    productId: "pizza-margarita",
    productName: "Pizza Margarita",
    branchId: "2",
    quantity: 15,
  },
  {
    id: "2-espagueti-bolonesa",
    productId: "espagueti-bolonesa",
    productName: "Espagueti a la Boloñesa",
    branchId: "2",
    quantity: 10,
  },
  {
    id: "2-salmon-asado",
    productId: "salmon-asado",
    productName: "Salmón Asado",
    branchId: "2",
    quantity: 8,
  },
  {
    id: "2-pastel-chocolate",
    productId: "pastel-chocolate",
    productName: "Pastel de Chocolate",
    branchId: "2",
    quantity: 15,
  },
  {
    id: "2-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisú",
    branchId: "2",
    quantity: 12,
  },
  {
    id: "2-refresco",
    productId: "refresco",
    productName: "Refresco",
    branchId: "2",
    quantity: 40,
  },
  {
    id: "2-jugo-natural",
    productId: "jugo-natural",
    productName: "Jugo Natural",
    branchId: "2",
    quantity: 15,
  },

  // Westside branch
  {
    id: "3-pan-ajo",
    productId: "pan-ajo",
    productName: "Pan de Ajo",
    branchId: "3",
    quantity: 22,
  },
  {
    id: "3-ensalada-cesar",
    productId: "ensalada-cesar",
    productName: "Ensalada César",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-pizza-margarita",
    productId: "pizza-margarita",
    productName: "Pizza Margarita",
    branchId: "3",
    quantity: 18,
  },
  {
    id: "3-espagueti-bolonesa",
    productId: "espagueti-bolonesa",
    productName: "Espagueti a la Boloñesa",
    branchId: "3",
    quantity: 15,
  },
  {
    id: "3-salmon-asado",
    productId: "salmon-asado",
    productName: "Salmón Asado",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-pastel-chocolate",
    productId: "pastel-chocolate",
    productName: "Pastel de Chocolate",
    branchId: "3",
    quantity: 12,
  },
  {
    id: "3-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisú",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-refresco",
    productId: "refresco",
    productName: "Refresco",
    branchId: "3",
    quantity: 45,
  },
  {
    id: "3-jugo-natural",
    productId: "jugo-natural",
    productName: "Jugo Natural",
    branchId: "3",
    quantity: 18,
  },
];

type LocalProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    src: string;
    width: number;
    height: number;
  };
  categoryId: string;
  extras?: Extra[];
  stockId?: string;
  extraGroupIds?: string[];
};