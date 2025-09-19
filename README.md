# Quran Hifz Helper - React + Vite + TypeScript

A Progressive Web App (PWA) for Quran memorization practice, built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🎵 Audio playback of Quranic verses with multiple Qaris
- 🔄 Repeat functionality for memorization practice
- 📱 PWA support for offline usage
- 💾 Local storage for user preferences
- 🎨 Clean, responsive UI with Tailwind CSS
- ⚡ Fast development and build with Vite

## Todo

- [x] Cache previously loaded Surahs
- [x] Update web app when it updates
- [x] Show icons on what is downloaded/cached
- [~] FIX: On initial load shows the first ayat
  - The problem is in Brave, not in Chrome.
- [ ] FIX: The audio stops on the next ayat
  - Could not replicate. Maybe the problem is in Brave only
- [ ] FIX: Click on 'Play' does not Play and have to click 'play' button on player to play
  - Could not replicate. Maybe the problem is in Brave only

Additional Features

- [ ] Add all 15 page quran pages.
- [ ] Make a playlist feature
- [ ] User account
- [ ] Save preferences in user account

## 🚀 Development

All commands are run from the root of the project, from a terminal:

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `pnpm install`| Installs dependencies                       |
| `pnpm dev`    | Starts local dev server at `localhost:5173`|
| `pnpm build`  | Build your production site to `./dist/`    |
| `pnpm preview`| Preview your build locally, before deploying |
| `pnpm lint`   | Run ESLint to check code quality           |

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Vite PWA** - Progressive Web App features
- **usehooks-ts** - TypeScript-ready React hooks
