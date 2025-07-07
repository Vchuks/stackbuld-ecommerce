# Mini Ecommerce

A lightweight ecommerce application built with React, featuring modern state management and data fetching patterns.

## Features

- **Product Catalog**: Browse through products
- **Shopping Cart**: Add/remove items with quantity management
- **State Persistence**: Cart data persists across browser sessions
- **Responsive Design**: Mobile-friendly interface
- **Performance Optimized**: Efficient state management with Zustand

## Tech Stack

- **React** - UI framework
- **React Query (TanStack Query)** - Server state management and caching
- **Zustand** - Client state management
- **localStorage** - Data persistence
- **Tailwind** - Styling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Vchuks/stackbuld-ecommerce.git
cd stackbuld-ecommerce
```

2. Install dependencies:
npm install
# or
yarn install


3. Start the development server:

npm run dev
# or
yarn start


4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Key Implementation Details

### State Management
- **Zustand**: Manages cart state (items, quantities, totals)
- **React Query**: Handles product data fetching, caching, and synchronization
- **localStorage**: Persists cart data between sessions

### Core Stores

**Cart Store (Zustand)**
- addItem(product)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- getCartTotal()
