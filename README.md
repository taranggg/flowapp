FlowApp

FlowApp is a modern web application for building, visualizing, and managing interactive flows. Built with React and Vite, it provides a flexible canvas, sidebar navigation, and modular UI components for rapid development.

## Features

- Interactive canvas for flow creation
- Modular UI components (cards, dialogs, tooltips, etc.)
- Sidebar and navigation bar
- Node management and additional parameters modal
- Chatflow and home routes
- Mobile-friendly hooks

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Running the App

```bash
pnpm dev
```

The app will start on `http://localhost:5173` by default.

### Building for Production

```bash
pnpm build
```

## Project Structure

```
flowapp/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # UI components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── routes/            # App routes
│   ├── utils/             # Utility functions
│   └── views/             # View components
├── index.html             # Main HTML file
├── package.json           # Project metadata
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
