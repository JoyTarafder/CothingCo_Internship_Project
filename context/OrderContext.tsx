"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  type:
    | "card"
    | "cod"
    | "bkash"
    | "nagad"
    | "mobile"
    | "paypal"
    | "applepay"
    | "googlepay";
  savePaymentMethod?: boolean;
  cardLast4?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  shipping: {
    address: ShippingAddress;
    method: string;
    cost: number;
    tracking?: string;
    estimatedDelivery?: string;
    deliveredOn?: string;
  };
  payment: {
    method: PaymentMethod;
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    giftWrapping: number;
    total: number;
  };
  isGiftOrder: boolean;
  giftMessage?: string;
  timeline: {
    status: string;
    date: string;
  }[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  deleteOrder: (id: string) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  getOrderStats: () => {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Sample orders for testing
const sampleOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15T10:30:00Z",
    status: "Shipped",
    items: [
      {
        id: "1",
        name: "Classic Cotton T-Shirt",
        price: 29.99,
        image: "/images/products/1-classic-cotton-tshirt.jpg",
        color: "Navy Blue",
        size: "M",
        quantity: 2,
      },
      {
        id: "4",
        name: "Premium Hoodie",
        price: 79.99,
        image: "/images/products/4-premium-hoodie.jpg",
        color: "Gray",
        size: "L",
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        address: "123 Main Street",
        apartment: "Apt 4B",
        city: "New York",
        postalCode: "10001",
        country: "United States",
      },
      method: "Standard Shipping",
      cost: 9.99,
      tracking: "TRK123456789",
      estimatedDelivery: "2024-01-20",
    },
    payment: {
      method: { type: "card", cardLast4: "4242" },
      subtotal: 139.97,
      discount: 14.0,
      tax: 11.2,
      shipping: 9.99,
      giftWrapping: 0,
      total: 147.16,
    },
    isGiftOrder: false,
    timeline: [
      { status: "Order Placed", date: "2024-01-15T10:30:00Z" },
      { status: "Payment Confirmed", date: "2024-01-15T10:31:00Z" },
      { status: "Processing", date: "2024-01-15T14:00:00Z" },
      { status: "Shipped", date: "2024-01-16T09:15:00Z" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-18T14:20:00Z",
    status: "Processing",
    items: [
      {
        id: "6",
        name: "Floral Print Blouse",
        price: 49.99,
        image: "/images/products/6-floral-print-blouse.jpg",
        color: "White",
        size: "S",
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1987654321",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        postalCode: "90210",
        country: "United States",
      },
      method: "Express Shipping",
      cost: 19.99,
      tracking: "TRK987654321",
      estimatedDelivery: "2024-01-22",
    },
    payment: {
      method: { type: "bkash" },
      subtotal: 49.99,
      discount: 0,
      tax: 4.0,
      shipping: 19.99,
      giftWrapping: 5.0,
      total: 78.98,
    },
    isGiftOrder: true,
    giftMessage: "Happy Birthday!",
    timeline: [
      { status: "Order Placed", date: "2024-01-18T14:20:00Z" },
      { status: "Payment Confirmed", date: "2024-01-18T14:21:00Z" },
      { status: "Processing", date: "2024-01-18T16:30:00Z" },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-20T11:45:00Z",
    status: "Delivered",
    items: [
      {
        id: "5",
        name: "Slim Fit Jeans",
        price: 89.99,
        image: "/images/products/5-slim-fit-jeans.jpg",
        color: "Dark Blue",
        size: "32",
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@example.com",
        phone: "+1555123456",
        address: "789 Pine Street",
        city: "Chicago",
        postalCode: "60601",
        country: "United States",
      },
      method: "Standard Shipping",
      cost: 9.99,
      tracking: "TRK456789123",
      estimatedDelivery: "2024-01-25",
      deliveredOn: "2024-01-24T15:30:00Z",
    },
    payment: {
      method: { type: "cod" },
      subtotal: 89.99,
      discount: 9.0,
      tax: 7.2,
      shipping: 9.99,
      giftWrapping: 0,
      total: 98.18,
    },
    isGiftOrder: false,
    timeline: [
      { status: "Order Placed", date: "2024-01-20T11:45:00Z" },
      { status: "Payment Confirmed", date: "2024-01-20T11:46:00Z" },
      { status: "Processing", date: "2024-01-20T15:00:00Z" },
      { status: "Shipped", date: "2024-01-21T10:30:00Z" },
      { status: "Out for Delivery", date: "2024-01-24T08:00:00Z" },
      { status: "Delivered", date: "2024-01-24T15:30:00Z" },
    ],
  },
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders([...sampleOrders, ...parsedOrders]);
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error);
        setOrders(sampleOrders);
      }
    } else {
      setOrders(sampleOrders);
    }
    setIsInitialized(true);
  }, []);

  // Save orders to localStorage whenever they change (excluding sample orders)
  useEffect(() => {
    if (isInitialized) {
      const userOrders = orders.filter(
        (order) => !order.id.startsWith("ORD-2024")
      );
      localStorage.setItem("orders", JSON.stringify(userOrders));
    }
  }, [orders, isInitialized]);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const cancelOrder = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "Cancelled",
              timeline: [
                ...order.timeline,
                {
                  status: "Order Cancelled",
                  date: new Date().toISOString(),
                },
              ],
            }
          : order
      )
    );
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
              timeline: [
                {
                  status: status,
                  date: new Date().toISOString(),
                },
                ...order.timeline,
              ],
            }
          : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, ...updates } : order
      )
    );
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      processing: orders.filter((o) => o.status === "Processing").length,
      shipped: orders.filter((o) => o.status === "Shipped").length,
      delivered: orders.filter((o) => o.status === "Delivered").length,
      cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        cancelOrder,
        updateOrderStatus,
        deleteOrder,
        updateOrder,
        getOrderStats,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
