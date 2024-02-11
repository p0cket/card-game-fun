// Assuming these are your NPC image sources
const npcImageSrcs = [
    'path/to/npc1.png',
    'path/to/npc2.png',
    // Add as many NPC image sources as you have
  ];
  
  // Function to asynchronously load all NPC images
  export const loadNpcImages = async () => {
    const imagePromises = npcImageSrcs.map(src => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ src, img });
      img.onerror = reject;
      img.src = src;
    }));
  
    const images = await Promise.all(imagePromises);
    const npcImages = new Map();
    images.forEach(({ src, img }) => {
      npcImages.set(src, img);
    });
    return npcImages;
  };
  
  // Function to draw NPCs on the canvas
  export const drawNpcs = (ctx, npcPositions, npcImages) => {
    npcPositions.forEach(npc => {
      const npcImage = npcImages.get(npc.imgSrc);
      if (npcImage && npcImage.complete) {
        ctx.drawImage(npcImage, npc.x, npc.y, 50, 50); // Adjust size as necessary
      }
    });
  };
  