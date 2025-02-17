
// Los trofeos necesarios para llegar a cada rango
export const TrophiesToReachTier: number[] = Array.from({ length: 52 }, (_, i) => {
  if (i <= 5) return 15;
  if (i <= 10) return 20;
  if (i <= 15) return 25;
  if (i <= 20) return 30;
  if (i <= 30) return 35;
  if (i <= 40) return 40;
  if (i <= 50) return 45;
  return 50; // Para 51 y superiores
});

// Los trofeos necesarios para llegar a cada rango (En total desde 0 en cada uno)
export const TrophiesToGetTier: number[] = Array.from({ length: 52 }, (_, i) => {
  return TrophiesToReachTier.slice(0, i + 1).reduce((acc, val) => acc + val, 0);
});
