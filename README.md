# Addis Eats
Addis Eats is a React food delivery application for ordering Ethiopian and international dishes in Addis Ababa. Customers can browse meals, add items to a cart, submit orders with TeleBirr payment proof, and track order history. Administrators can manage dishes and update order statuses.

## Features
### Customer Experience
- Home page with featured dishes
- Menu search with debounced filtering
- Category filtering and dish detail pages
- Add dishes to cart from the menu or home page
- Cart quantity controls and calculated totals
- Checkout with delivery information
- TeleBirr transaction ID or receipt upload
- Automatic order total calculation
- Order confirmation page
- Persistent order history
- Reorder and favorite dish support
- About page and contact form
- Light and dark themes
- Responsive desktop and mobile layouts

### Admin Experience
- First-time admin account setup
- Persisted admin username and password in the browser
- Admin dashboard with order and revenue statistics
- Add, edit, and delete dishes
- Search dishes in menu management
- Upload an image from the computer or paste a public image path
- Customer menu updates when admin dishes change
- Order management table
- Order search and status management
- Payment amount and transaction/receipt information in order details

## Technology
- React 19
- Vite
- React Router
- Zustand
- ESLint
- PropTypes

## Requirements
- Node.js 24
- npm

## Installation
From this directory:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Open the URL shown in the terminal, normally:

```text
http://localhost:5173
```
## Production Build
Create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```
## Main Routes

### Customer Routes
| Route                 | Purpose                    |
| --------------------- | -------------------------- |
| `/`                   | Home page                  |
| `/about`              | About Addis Eats           |
| `/contact`            | Contact form               |
| `/menu`               | Browse all dishes          |
| `/menu/:id`           | Dish details               |
| `/cart`               | Shopping cart              |
| `/checkout`           | Checkout and payment proof |
| `/order-confirmation` | Successful order details   |
| `/orders`             | Customer order history     |
| `/favorites`          | Favorite dishes            |

### Admin Routes

| Route           | Purpose                                |
| --------------- | -------------------------------------- |
| `/admin/login`  | Create or sign in to the admin account |
| `/admin`        | Admin dashboard                        |
| `/admin/menu`   | Manage dishes                          |
| `/admin/orders` | Manage customer orders                 |

## Data and Persistence

This version uses browser `localStorage` through Zustand persistence. Data is stored locally in the browser and is not shared with a database or other users.

The application stores:
- Cart data under `addis-eats-cart`
- Order history under `addis-eats-order-history`
- Admin credentials and session under `addis-eats-admin`
- Admin dish changes under `addis-eats-admin-dishes`
- Favorites under the favorites store key
- Theme preference under `addis-eats-theme`

Orders remain available after refreshing or signing out of the admin panel, provided browser storage is not cleared.

## Menu Images
Built-in dish images are stored in:

```text
public/images/
```
Menu data is stored in:
```text
public/menu-data.json
```
Admin users can use a public path such as `/images/doro-wot.jpg` or select an image from their computer. Computer-selected images are stored as data URLs in browser storage for this frontend-only version.

## Payment and Contact Notes
The checkout requires either a TeleBirr transaction ID or a receipt file. The order stores the calculated cart total automatically; the customer does not enter the amount.
For real payment verification, file uploads, email delivery, authentication security, and multi-user administration, connect the frontend to a backend API and database.

## Project Structure
```text
src/
	admin/       Admin authentication, dashboard, menu, and order management
	api/         Menu data access
	auth/        Customer auth context
	cart/        Cart store and cart views
	checkout/    Checkout, validation, payment proof, confirmation
	components/ Shared layout, header, footer, home, about, contact
	favorites/  Favorite dish state and views
	menu/       Menu listing, filters, dish cards, details
	orders/     Customer order history and shared order store
	theme/      Theme provider, toggle, and dark mode styles
	ui/         Shared UI components
	utils/      Formatting, image paths, and delivery estimates
public/
	images/     Dish and application images
	menu-data.json
```

## Reset Local Demo Data

To reset the application in the browser, open the browser developer console and run:
```js
localStorage.clear();
location.reload();
```
This removes the local cart, orders, admin account, menu changes, favorites, and theme preference.
