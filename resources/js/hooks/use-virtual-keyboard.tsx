// src/hooks/use-virtual-keyboard.tsx
import { useEffect, useState } from 'react';

interface KeyboardGeometry {
  isOpen: boolean;
  height: number;
}

export function useVirtualKeyboard() {
  const [keyboard, setKeyboard] = useState<KeyboardGeometry>({
    isOpen: false,
    height: 0,
  });

  useEffect(() => {
    // Evita execução no Server-Side Rendering (Next.js/SSR)
    if (typeof window === 'undefined') return;

    // 1. Abordagem Nativa: Virtual Keyboard API (Chromium / Android)
    // Usamos 'any' temporário pois o tipo do navigator.virtualKeyboard pode não estar mapeado no seu tsconfig
    const nav = navigator as any;
    if ('virtualKeyboard' in nav) {
      nav.virtualKeyboard.overlaysContent = true;

      const handleGeometryChange = (event: any) => {
        const { height } = event.target.boundingRect;
        setKeyboard({
          isOpen: height > 0,
          height: height,
        });
        document.documentElement.style.setProperty('--altura-teclado', `${height}px`);
      };

      nav.virtualKeyboard.addEventListener('geometrychange', handleGeometryChange);

      // Se a API nativa funcionar, a execução para aqui (com o retorno de limpeza)
      return () => {
        nav.virtualKeyboard.removeEventListener('geometrychange', handleGeometryChange);
      };
    }

    // 2. Fallback Universal: Visual Viewport API (iOS / Safari / Firefox)
    const visualViewport = window.visualViewport;
    if (visualViewport) {
      const handleResize = () => {
        const alturaTotal = window.innerHeight;
        const alturaVisivel = visualViewport.height;
        const alturaTeclado = Math.max(0, alturaTotal - alturaVisivel);

        // Dispositivos móveis às vezes têm pequenas variações de scroll de 1-2px, tratamos acima de 30px como teclado real
        const isOpen = alturaTeclado > 30;

        setKeyboard({
          isOpen,
          height: isOpen ? alturaTeclado : 0,
        });

        document.documentElement.style.setProperty(
          '--altura-teclado',
          isOpen ? `${alturaTeclado}px` : '0px'
        );
      };

      // Executa no foco inicial para garantir o alinhamento em inputs rápidos
      visualViewport.addEventListener('resize', handleResize);

      return () => {
        visualViewport.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return keyboard;
}