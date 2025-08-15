# Alshafaraz Gazi - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Material-UI, and Framer Motion. Features dynamic content management with Prismic CMS and includes a contact form with free service integration.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on all devices and screen sizes
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive Carousel**: Featured projects showcase with touch/swipe support
- **Contact Form**: Working contact form with form validation using Formspree
- **CMS Ready**: Prismic integration for content management
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant design

## 🚀 Sections

- **Hero**: Eye-catching introduction with social links
- **About**: Personal introduction and key highlights
- **Projects**: Featured projects carousel + all projects grid with filtering
- **Skills**: Interactive skill bars with categories
- **Education**: Academic background and achievements
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI (MUI)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **CMS**: Prismic (optional)
- **Contact Form**: Formspree (free)
- **Icons**: Material-UI Icons + Lucide React

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gazi786/gazi786.github.io.git
   cd gazi786.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## ⚙️ Configuration

### Contact Form Setup

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form ID
3. Update the form endpoint in `src/slices/Contact/index.tsx`:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Prismic CMS Setup (Optional)

1. Create a Prismic repository at [prismic.io](https://prismic.io)
2. Set up your environment variable:
   ```bash
   NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
   ```
3. Configure your content types and slices as needed

### Customization

- **Personal Info**: Update content in the slice components
- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Projects**: Update the project data in `src/slices/Projects/index.tsx`
- **Skills**: Modify skills and categories in `src/slices/Skills/index.tsx`
- **Education**: Update education info in `src/slices/Education/index.tsx`

## 📝 Content Management

All content can be easily customized by editing the respective slice files:

- Hero content: `src/slices/Hero/index.tsx`
- About content: `src/slices/About/index.tsx`
- Projects: `src/slices/Projects/index.tsx`
- Skills: `src/slices/Skills/index.tsx`
- Education: `src/slices/Education/index.tsx`
- Contact info: `src/slices/Contact/index.tsx`

## 🚀 Deployment

### GitHub Pages

1. Build the static export:
   ```bash
   npm run build
   ```

2. The `out` folder contains the static files ready for deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy with one click - no configuration needed!

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

## 📱 Social Media Links

Update your social media links in:
- Hero section: `src/slices/Hero/index.tsx`
- Header: `src/components/layout/Header.tsx`
- Footer: `src/components/layout/Footer.tsx`
- Contact section: `src/slices/Contact/index.tsx`

## 🎨 Design Credits

Inspired by modern portfolio designs with a focus on:
- Clean, minimal aesthetic
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible user experience

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Alshafaraz Gazi - [alshafaraz.gazi@gmail.com](mailto:alshafaraz.gazi@gmail.com)

Project Link: [https://github.com/gazi786/gazi786.github.io](https://github.com/gazi786/gazi786.github.io)

---

Built with ❤️ by Alshafaraz Gazi
