export class Images {
  public static getRandomImage(): string {
    return ImagesPaths[Math.floor(Math.random() * Math.floor(ImagesPaths.length))];
  }

  public static getDreawerImages(index: string,active:boolean): string {
    return DrawerImages.find((item) =>{
      return item.split('/')[3].slice(0, index.length) === index && (item.split('_')[1] === (active ? 'BLUE.png' : 'DARK.png'));
    });
  }
}

const ImagesPaths = [
  './assets/icon_face1.png',
  './assets/icon_face10.png',
  './assets/icon_face11.png',
  './assets/icon_face12.png',
  './assets/icon_face2.png',
  './assets/icon_face3.png',
  './assets/icon_face4.png',
  './assets/icon_face5.png',
  './assets/icon_face6.png',
  './assets/icon_face7.png',
  './assets/icon_face8.png',
  './assets/icon_face9.png',
  './assets/icon_zabif.png'
];
const DrawerImages = [
  './assets/drawer/U_BLUE.png',
  './assets/drawer/U_DARK.png',
  './assets/drawer/L_BLUE.png',
  './assets/drawer/L_DARK.png',
  './assets/drawer/D_BLUE.png',
  './assets/drawer/D_DARK.png',
  './assets/drawer/R_BLUE.png',
  './assets/drawer/R_DARK.png',
  './assets/drawer/DR_BLUE.png',
  './assets/drawer/DR_DARK.png',
  './assets/drawer/UR_BLUE.png',
  './assets/drawer/UR_DARK.png',
  './assets/drawer/DL_BLUE.png',
  './assets/drawer/DL_DARK.png',
  './assets/drawer/UL_BLUE.png',
  './assets/drawer/UL_DARK.png',
];
