# Urvann Plant Store

A modern, responsive plant catalog application built for the Urvann Software Development Intern Assignment. This full-stack application features a beautiful plant catalog with search/filter capabilities and an admin panel for managing inventory.

## 🌱 Features

### Plant Catalog
- **Responsive Grid Layout**: Beautiful plant cards with images, pricing, and category badges
- **Search Functionality**: Search plants by name or category keywords (case-insensitive)
- **Advanced Filtering**: Filter by category dropdown and stock availability
- **Loading States**: Skeleton loading animations and error handling with retry functionality
- **Stock Indicators**: Clear visual indicators for in-stock vs out-of-stock items

### Admin Panel
- **Add New Plants**: Comprehensive form with validation for all plant details
- **Multiple Categories**: Support for adding multiple categories per plant
- **Form Validation**: Client-side validation with clear error messages
- **Success Feedback**: Visual confirmation when plants are added successfully

### Technical Features
- **Modern Design**: Clean, nature-inspired design with cyan and blue color palette
- **Responsive**: Mobile-first design that works perfectly on all screen sizes
- **Performance**: Optimized loading with proper error boundaries and loading states
- **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with native driver
- **Deployment**: Vercel (recommended)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)

### Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
\`\`\`

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd plant-store
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your MongoDB connection string

4. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄️ Database Setup

The application uses MongoDB with a simple schema:

### Plant Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  categories: [String],
  inStock: Boolean,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Seeding Data
The seed script (`scripts/seed-plants.js`) includes 50+ realistic plants with:
- Indoor plants (Money Plant, Snake Plant, Peace Lily, etc.)
- Outdoor plants (Bougainvillea, Hibiscus, Rose, etc.)
- Succulents (Jade Plant, Aloe Vera, Echeveria, etc.)
- Air purifying plants (Areca Palm, Boston Fern, etc.)
- Herbs and medicinal plants (Tulsi, Mint, Curry Leaf, etc.)

## 🌐 Deployment

### Vercel (Recommended)
1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Set up MongoDB**
   - Use MongoDB Atlas for cloud database
   - Add connection string to Vercel environment variables
   - Run seed script in Vercel Functions or locally

### Alternative Deployment Options
- **Netlify**: Supports Next.js with serverless functions
- **Railway**: Easy deployment with built-in MongoDB
- **DigitalOcean App Platform**: Full-stack deployment option

## 📱 API Endpoints

### Plants API
- `GET /api/plants` - Get all plants with optional filters
  - Query params: `search`, `category`, `inStock`
- `POST /api/plants` - Add new plant (admin)

### Categories API  
- `GET /api/categories` - Get all unique categories

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Background**: #ffffff (White)
- **Cards**: #ecfeff (Light Cyan)
- **Text**: #164e63 (Dark Cyan)
- **Accent**: #6366f1 (Blue)

### Typography
- **Font Family**: DM Sans
- **Headings**: DM Sans Bold
- **Body**: DM Sans Regular

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Plant catalog loads with all plants
- [ ] Search functionality works (try "money", "indoor", etc.)
- [ ] Category filter dropdown works
- [ ] In-stock filter works
- [ ] Admin form validates required fields
- [ ] Admin form successfully adds plants
- [ ] Responsive design works on mobile
- [ ] Loading states appear during API calls
- [ ] Error states show when API fails

### Sample Test Data
The seed script includes diverse plant categories:
- **Indoor**: Money Plant, Snake Plant, Peace Lily
- **Outdoor**: Bougainvillea, Hibiscus, Rose Plant
- **Succulent**: Jade Plant, Aloe Vera, Echeveria
- **Air Purifying**: Areca Palm, Boston Fern
- **Herbs**: Tulsi, Mint, Curry Leaf

## 📋 Assignment Requirements Checklist

### ✅ Plant Catalog (Frontend + Backend)
- [x] Grid/list view of plants
- [x] Plant name, price, categories, stock availability
- [x] Additional creative fields (description, images)

### ✅ Search & Filter
- [x] Search by name (case-insensitive)
- [x] Search by category keyword
- [x] Filter by category dropdown
- [x] Additional filters (stock availability)

### ✅ Add Plant (Admin Feature)
- [x] Form with all required fields
- [x] Multiple categories support
- [x] Input validation before submission
- [x] Success/error feedback

### ✅ Responsive Frontend
- [x] Mobile and desktop optimized
- [x] Reusable React components
- [x] Loading states during API calls
- [x] Error states with retry functionality

### ✅ Database Preparation
- [x] 50+ plants with realistic data
- [x] Diverse categories (Indoor, Outdoor, Succulent, etc.)
- [x] Proper pricing and descriptions

### ✅ Tech Expectations
- [x] Next.js with React hooks and functional components
- [x] Clean, responsive UI
- [x] Node.js + Express-style API routes
- [x] MongoDB integration
- [x] Deployment ready

## 🏆 Extra Mile Features

- **Modern Design System**: Custom design tokens and consistent theming
- **Advanced Search**: Search across multiple fields simultaneously  
- **Loading Animations**: Skeleton loading states for better UX
- **Error Boundaries**: Comprehensive error handling with retry options
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized images and efficient API calls
- **TypeScript**: Full type safety throughout the application

## 🤝 Contributing

This project was built as part of the Urvann internship assignment. The codebase follows modern React/Next.js best practices and is ready for production deployment.

## 📄 License

This project is created for the Urvann Software Development Intern Assignment.

---
