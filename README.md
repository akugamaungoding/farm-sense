# 🌾 FARMPOLY 3D: Space Data Duel 🚀

An educational 3D board game that combines Monopoly-style gameplay with NASA agricultural datasets. Players navigate around a 3D farm board while encountering real-world environmental events powered by NASA satellite data.

## 🎮 Game Features

- **3D Interactive Board**: Built with Three.js and React Three Fiber
- **Two-Player Gameplay**: Alternating turns with dice rolling
- **NASA Data Integration**: Real agricultural events from satellite observations
- **Educational Content**: Learn about NASA's role in modern farming
- **Eco-Coin System**: Earn or lose points based on environmental decisions
- **Beautiful Animations**: Smooth 3D movements and particle effects

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Framer Motion** - Smooth UI animations
- **Zustand** - Lightweight state management
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 🎯 How to Play

1. **Enter Player Names**: Two players enter their names on the home screen
2. **Roll Dice**: Take turns rolling a 3D dice to move around the board
3. **Land on Events**: Each tile triggers a NASA environmental event
4. **Earn Eco-Coins**: Gain or lose coins based on environmental conditions
5. **Learn**: Read NASA facts about agricultural monitoring from space
6. **Win**: Player with the most eco-coins after 20 turns wins!

## 🌍 NASA Events

The game features 12 different environmental events based on real NASA satellite data:

- **Drought Detection** (SMAP satellite)
- **Perfect Rainfall** (GPM satellite)
- **Extreme Heat** (Landsat satellites)
- **Vegetation Boost** (NDVI measurements)
- **Flood Warning** (Flood Pathfinder)
- **Pest Alert** (Thermal imaging)
- **Frost Warning** (MODIS satellite)
- **Wind Damage** (QuikSCAT satellite)
- **Pollination Success** (Bee population studies)
- **Harvest Time** (SMAP soil moisture)
- **Nutrient Deficiency** (Hyperspectral imaging)
- **Carbon Sequestration** (OCO-2 satellite)

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd farm-sense
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Board3D.jsx          # 3D board with tiles and player tokens
│   ├── Dice.jsx             # 3D dice with rolling animation
│   ├── PlayerInfo.jsx       # Player stats and turn indicator
│   └── PopupEvent.jsx       # NASA event popup with facts
├── data/
│   ├── nasaEvents.json      # Game events with NASA data
│   └── nasaFacts.js         # Educational NASA facts
├── pages/
│   ├── HomePage.jsx         # Player name input screen
│   ├── BoardPage.jsx        # Main 3D game board
│   └── EndGame.jsx          # Winner screen with NASA facts
├── store/
│   └── gameStore.js         # Zustand game state management
├── App.jsx                  # Main app with routing
└── main.jsx                 # React entry point
```

## 🎨 Game Design

- **Color Palette**: Farm-themed greens, blues, and yellows
- **Typography**: Poppins font for modern, friendly appearance
- **3D Assets**: Low-poly farm elements and player tokens
- **Animations**: Smooth transitions and particle effects
- **Responsive**: Works on desktop and tablet devices

## 🌟 Educational Value

This game teaches players about:

- **NASA's Earth Observing System**: How satellites monitor agriculture
- **Environmental Monitoring**: Real-time data collection from space
- **Climate Impact**: How weather affects farming
- **Sustainable Agriculture**: Data-driven farming practices
- **Space Technology**: Applications of satellite technology on Earth

## 🚀 Future Enhancements

- **Sound Effects**: Audio feedback for actions
- **Multiplayer Online**: Play with friends remotely
- **More Events**: Additional NASA datasets
- **Achievement System**: Unlock badges for learning
- **Mobile Support**: Touch controls for mobile devices
- **AI Opponent**: Single-player mode with computer player

## 🤝 Contributing

This project was created as an educational demonstration of combining 3D web technologies with NASA data. Feel free to:

- Add new NASA events
- Improve 3D graphics
- Enhance educational content
- Optimize performance
- Add new features

## 📜 License

This project is created for educational purposes. NASA data and imagery are used under appropriate licensing terms.

## 🙏 Acknowledgments

- **NASA** for providing open agricultural datasets
- **Three.js** community for amazing 3D web tools
- **React** team for the excellent framework
- **Framer Motion** for smooth animations
- **TailwindCSS** for beautiful styling utilities

---

**🌾 Ready to explore the farm from space? Start your NASA data adventure! 🚀**
"# farm-sense" 
