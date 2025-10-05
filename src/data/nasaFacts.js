export const nasaFacts = [
  "NASA's Landsat program has been monitoring Earth's surface for over 50 years, providing the longest continuous record of our planet from space!",
  "The SMAP satellite can detect soil moisture through clouds, snow, and vegetation - even at night!",
  "NASA's MODIS satellite takes a complete picture of Earth every 1-2 days, helping track global agricultural changes.",
  "Satellite data helps farmers reduce water usage by up to 30% through precision irrigation!",
  "NASA's GRACE satellites can detect groundwater changes from space by measuring Earth's gravity field.",
  "The International Space Station astronauts grow fresh vegetables in space using LED lighting and controlled environments!",
  "NASA's Earth Observing System includes over 20 satellites monitoring different aspects of our planet's health.",
  "Satellite imagery can detect crop diseases before they become visible to the human eye!",
  "NASA's weather satellites can predict storms up to 7 days in advance, helping farmers protect their crops.",
  "The average farm using NASA satellite data sees a 15% increase in crop yield and 20% reduction in fertilizer use!"
];

export const getRandomFact = () => {
  return nasaFacts[Math.floor(Math.random() * nasaFacts.length)];
};
