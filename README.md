# SEO Lead Hunter

A powerful React application for generating targeted Google search queries and tracking SEO leads for any niche and city combination.

## Features

- 🎯 **Niche Selection**: Choose from 10 pre-configured niches (Roofing, Tutoring, Dental, Pet Services, Real Estate, Construction, Photography, Restaurants, Law Firms, Nonprofits)
- 🏙️ **City Targeting**: Select from major US cities or enter custom cities
- 🔍 **Query Generation**: Automatically generate targeted Google search queries with exclusions
- 📋 **Query Management**: Copy individual queries or all queries at once
- 🌐 **Direct Google Search**: Open queries directly in Google with one click
- 📊 **Lead Tracking**: Track leads with business details, contact info, SEO scores, and status
- 📈 **Analytics Dashboard**: View quick stats on total leads, hot leads, contacted, and deals won
- 💾 **Data Persistence**: All data is saved to localStorage automatically
- 📤 **CSV Export**: Export all leads to CSV format
- 📜 **Search History**: Keep track of recent searches
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Installation

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to `http://localhost:3000`**

## Usage

### Generating Search Queries

1. **Select a Niche**: Choose from the dropdown menu (e.g., "🏠 Local Roofing Services")
2. **Choose a City**: Either select from the predefined list or enter a custom city
3. **Click "Generate Search Queries"**: The app will create targeted Google search queries
4. **Copy or Open Queries**: Use the copy buttons or click the eye icon to open in Google

### Tracking Leads

1. **Add a Lead**: Click the "+ Add Lead" button (requires a niche to be selected)
2. **Fill in Details**: Enter business name, website, contact info, SEO scores, etc.
3. **Update Status**: Track the lead through different stages (New → Contacted → Hot Lead → Won/Lost)
4. **Export Data**: Use the "Export CSV" button to download all leads

### Search Query Format

The generated queries follow this format:
```
"[keyword]" "[city]" inurl:wp-content -filetype:pdf -filetype:doc -site:facebook.com -site:yelp.com -site:linkedin.com -site:yellowpages.com -site:bbb.org
```

This format helps find WordPress websites (indicating local businesses) while excluding common directories and file types.

## Available Niches

- 🏠 **Local Roofing Services** - Roof repair, contractors, emergency services
- 📚 **Private Tutors / Coaching** - Math, SAT prep, learning centers
- 🦷 **Dental Clinics** - Family dentists, cosmetic, emergency dental
- 🐕 **Pet Grooming & Veterinary** - Pet grooming, vet clinics, boarding
- 🏡 **Real Estate Agents** - Realtors, property listings, home buying
- 🔨 **Construction Contractors** - General contractors, remodeling, builders
- 📸 **Wedding Photographers** - Wedding photography, engagement photos
- 🍽️ **Local Restaurants** - Family restaurants, fine dining, cafes
- ⚖️ **Law Firms** - Personal injury, family law, criminal defense
- 💚 **NGOs & Charities** - Nonprofits, charities, community organizations

## Technical Details

- **Framework**: React 18 with hooks
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Storage**: localStorage for data persistence
- **Build Tool**: Create React App

## Data Storage

All data is automatically saved to your browser's localStorage:
- `seo-leads`: Stores all lead information
- `seo-search-history`: Stores recent search history

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Browser Support

This application works in all modern browsers that support:
- ES6+ JavaScript features
- localStorage API
- CSS Grid and Flexbox

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
