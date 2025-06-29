# 🪙🪙 Coin Change Calculator - Frontend 🪙🪙

A React frontend app built with Vite that allows users to calculate coin denominations for a target amount. It communicates with a backend API to fetch the optimal coin combination.

Built for a challenge

---

## Assumptions made for challenge

- If there's no possible combination to reach target exactly, the least coins combination will be returned, but will not be equal to target

---

## Features

- Select coin denominations interactively
- Input target amount with validation (up to 2 decimals)
- Displays the calculated coin change breakdown
- Auto-deployment on GitHub Pages (https://im-ksc.github.io/coin-calculator-frontend/)

---

## Getting Started

### Prerequisites

- [Node.js (v22.17.0 recommended)](https://nodejs.org/en/download)
- npm

### Installation
1. Clone Repo
```
git clone https://github.com/im-ksc/coin-calculator-frontend.git
```
2. Open terminal and change directory
```
cd coin-calculator-frontend
```
3. Install dependencies
```
npm install
```
4. Run on localhost
```
npm run dev
```
5. Access at http://localhost:5173/coin-calculator-frontend/
- Make sure to refer to [@coin-calculator-backend](https://github.com/im-ksc/coin-calculator-backend) to run on localhost **backend** as well.

---

## Tech Stack

- Reactjs + Vite
- Tailwind CSS & Bootstrap
