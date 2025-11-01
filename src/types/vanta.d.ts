declare namespace VANTA {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VANTABase {
    BIRDS: (options: any) => VantaEffect;
  }
}

declare const VANTA: VANTA.VANTABase;

export {};
