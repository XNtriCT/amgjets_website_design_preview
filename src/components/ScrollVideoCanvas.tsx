import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create programmatically configured off-screen video
    const video = document.createElement('video');
    video.src = '/amg_bg_scroll_mobile.webm';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.style.display = 'none';

    let scrollTriggerInstance: ScrollTrigger | null = null;
    let opacityTriggerInstance: ScrollTrigger | null = null;
    let rafId: number;
    let renderRafId: number | null = null;
    let targetTime = 0;
    let currentTime = 0;
    let metadataLoaded = false;

    // Cover scale calculations for responsive layout (similar to object-fit: cover)
    const drawFrame = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      if (videoWidth === 0 || videoHeight === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgRatio = videoWidth / videoHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Standard requestAnimationFrame debouncer for canvas drawing
    const requestRender = () => {
      if (renderRafId !== null) return;
      renderRafId = requestAnimationFrame(() => {
        drawFrame();
        renderRafId = null;
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      requestRender();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas size

    // Redraw on seeking finished to guarantee correct frame rendering
    const onSeeked = () => {
      requestRender();
      if (!isLoaded) {
        setIsLoaded(true);
      }
    };
    video.addEventListener('seeked', onSeeked);

    // Initial frame draw when video data starts loading
    const onLoadedData = () => {
      requestRender();
      // Draw first frame immediately
      video.currentTime = 0.001; // Tiny seek to trigger the first draw
    };
    video.addEventListener('loadeddata', onLoadedData);

    const initScrollTrigger = () => {
      if (metadataLoaded) return;
      metadataLoaded = true;

      const duration = video.duration || 1;

      // Create ScrollTrigger tied to hero section scrolling up to the start of About section
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '#hero',
        endTrigger: '#about',
        start: 'top top',
        end: 'top top',
        scrub: 1.2,
        onUpdate: (self) => {
          // Calculate the target video playhead position based on scroll progress
          targetTime = self.progress * duration;
        },
      });

      // Create ScrollTrigger to fade out the canvas as we scroll from Home into About (Light Mode only)
      opacityTriggerInstance = ScrollTrigger.create({
        trigger: '#about',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.2,
        onUpdate: (self) => {
          canvas.style.setProperty('--canvas-opacity', String(1 - self.progress));
        },
      });

      // Start the update loop to interpolate currentTime for smooth scroll seek
      const updatePlayhead = () => {
        // Interpolate current playhead to target playhead for zero lag and layout smoothness
        currentTime += (targetTime - currentTime) * 0.2;

        // Strict Hardware Seeking Gate
        if (!video.seeking) {
          if (Math.abs(currentTime - video.currentTime) > 0.005) {
            video.currentTime = currentTime;
          }
        }

        // Draw frames in loop if not seeking to keep rendering updated (using debouncer)
        if (!video.seeking) {
          requestRender();
        }

        rafId = requestAnimationFrame(updatePlayhead);
      };

      rafId = requestAnimationFrame(updatePlayhead);
    };

    // Initialize once metadata is available
    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger);
    }

    // Load the video track
    video.load();

    return () => {
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('loadedmetadata', initScrollTrigger);
      
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (opacityTriggerInstance) {
        opacityTriggerInstance.kill();
      }
      cancelAnimationFrame(rafId);
      if (renderRafId !== null) {
        cancelAnimationFrame(renderRafId);
      }
      
      video.pause();
      video.src = '';
      video.load();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 dark:!opacity-35"
      style={{
        mixBlendMode: 'normal',
        opacity: 'var(--canvas-opacity, 1)',
      }}
    />
  );
}
