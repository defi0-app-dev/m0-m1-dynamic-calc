# M0-to-M1 Money Supply Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://vercelbadge.vercel.app/api/your-username/m0-m1-dynamic-calc)](https://m0-m1-dynamic-calc.your-domain.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)](https://www.chartjs.org/)

An interactive web-based calculator that helps users understand how the monetary base (M0) expands into broader money supply (M1) through fractional-reserve banking.

## 🌟 Features

### 🔄 Simple Mode
- Single input for Monetary Base (M0)
- Fixed 10% reserve ratio
- Clear visualization of money multiplication effect
- Beginner-friendly tooltips and explanations

### ⚙️ Expert Mode
- Adjustable reserve ratio (1-50%)
- Real-time money multiplier calculation
- Dynamic chart visualization
- Advanced tooltips and economic insights

## 🛠 Technical Implementation

### Technology Stack
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)

### Project Structure
```
m0-m1-dynamic-calc/
├── index.html          # Main calculator interface
├── style.css          # Responsive styling
├── script.js          # Calculator logic
├── vercel.json        # Deployment config
├── package.json       # Dependencies
└── README.md         # Documentation
```

### Core Formulas
```javascript
M1 = M0 × (1/ReserveRatio)
MoneyMultiplier = 1/ReserveRatio
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/d-fi0racle/m0-m1-dynamic-calc.git
cd m0-m1-dynamic-calc
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

## 📖 Usage

### 🔰 Simple Mode
1. Enter your M0 (Monetary Base) value
2. View the calculated M1 and visual representation
3. Hover over [?] icons for explanations

### 🎓 Expert Mode
1. Switch to Expert Mode using the toggle button
2. Enter M0 value
3. Adjust reserve ratio using the slider (1-50%)
4. View real-time updates of:
   - Money Multiplier
   - M1 calculation
   - Dynamic chart visualization

## 🚀 Deployment

The project is configured for [Vercel](https://vercel.com) deployment. The app will be available at `https://m0-m1-dynamic-calc.your-domain.com` after deployment:

```bash
npm run deploy
```

## 📚 Educational Resources

### Official Sources
- [Federal Reserve Education](https://www.federalreserveeducation.org/)
- [ECB: Money Creation](https://www.ecb.europa.eu/explainers/tell-me-more/html/money-creation.en.html)
- [Bank of England: Money Creation](https://www.bankofengland.co.uk/knowledgebank/how-is-money-created)

### Additional Reading
- [Money Multiplier (Wikipedia)](https://en.wikipedia.org/wiki/Money_multiplier)
- [Monetary Base (Investopedia)](https://www.investopedia.com/terms/m/monetarybase.asp)
- [M1 Money Supply (Investopedia)](https://www.investopedia.com/terms/m/m1.asp)

## 🤝 Contributing

We welcome contributions! Please check our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for visualization
- [Vercel](https://vercel.com) for hosting
- Economic educators worldwide

---
[Live Demo](https://m0-m1-dynamic-calc.your-domain.com) | [Report Bug](https://github.com/your-username/m0-m1-dynamic-calc/issues) | [Request Feature](https://github.com/your-username/m0-m1-dynamic-calc/issues)
````
