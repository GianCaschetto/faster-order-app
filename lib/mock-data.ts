import type { Order } from "@/app/admin/orders/page"
import type { Customer } from "@/app/admin/customers/page"
import type { Product } from "@/components/restaurant-menu"

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ORD-31474-A",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "(123) 456-7890",
    customerAddress: "123 Main St, Downtown",
    branchId: "1",
    items: [
      { id: "1", productName: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: "2", productName: "Garlic Bread", quantity: 1, price: 5.99, extras: ["Extra Cheese"] },
    ],
    subtotal: 31.97,
    deliveryFee: 3.99,
    total: 35.96,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    createdAt: "2023-05-15T14:30:00Z",
    updatedAt: "2023-05-15T15:45:00Z",
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

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: "CUST-1001",
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St, Downtown",
    status: "active",
    totalOrders: 12,
    totalSpent: 432.85,
    lastOrderDate: "2023-05-15T14:30:00Z",
    createdAt: "2022-01-15T10:30:00Z",
    notes: "Prefers delivery during evening hours. Allergic to nuts.",
  },
  {
    id: "CUST-1002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    address: "456 High St, Uptown",
    status: "vip",
    totalOrders: 28,
    totalSpent: 1245.5,
    lastOrderDate: "2023-05-15T16:45:00Z",
    createdAt: "2021-11-20T14:15:00Z",
    notes: "Regular customer. Prefers vegetarian options. Birthday on November 14.",
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
export const products: Product[] = [
  {
    id: "1",
    name: "Garlic Bread",
    description: "Freshly baked bread with garlic butter",
    price: 5.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "starters",
    stockId: "garlic-bread",
    extras: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
      { id: "herbs", name: "Italian Herbs", price: 0.75 },
    ],
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "starters",
    stockId: "caesar-salad",
    extras: [
      { id: "chicken", name: "Grilled Chicken", price: 2.5 },
      { id: "croutons", name: "Extra Croutons", price: 0.5 },
      { id: "parmesan", name: "Parmesan Cheese", price: 1.0 },
    ],
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce and mozzarella",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
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
    name: "Spaghetti Bolognese",
    description: "Spaghetti with rich meat sauce",
    price: 14.99,
    image: "/placeholder.svg?height=100&width=100",
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
    name: "Grilled Salmon",
    description: "Fresh salmon fillet with lemon butter",
    price: 18.99,
    image: "/placeholder.svg?height=100&width=100",
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
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "desserts",
    stockId: "chocolate-cake",
    extras: [
      { id: "ice-cream", name: "Vanilla Ice Cream", price: 1.99 },
      { id: "whipped-cream", name: "Whipped Cream", price: 0.75 },
      { id: "chocolate-sauce", name: "Extra Chocolate Sauce", price: 0.5 },
    ],
  },
  {
    id: "7",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "desserts",
    stockId: "tiramisu",
    extras: [
      { id: "cocoa-powder", name: "Extra Cocoa Powder", price: 0.25 },
      { id: "coffee-shot", name: "Espresso Shot", price: 1.5 },
    ],
  },
  {
    id: "8",
    name: "Soft Drink",
    description: "Choice of cola, lemon-lime, or orange",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "drinks",
    stockId: "soft-drink",
    extras: [
      { id: "ice", name: "Extra Ice", price: 0.0 },
      { id: "lemon", name: "Lemon Slice", price: 0.25 },
    ],
  },
  {
    id: "9",
    name: "Fresh Juice",
    description: "Freshly squeezed orange or apple juice",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "drinks",
    stockId: "fresh-juice",
    extras: [
      { id: "ginger", name: "Ginger", price: 0.5 },
      { id: "mint", name: "Fresh Mint", price: 0.5 },
    ],
  },
]

