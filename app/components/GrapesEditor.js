"use client";

import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsTabs from "grapesjs-tabs";

export default function GrapesEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      plugins: [gjsPresetWebpage, gjsTabs],
    });

    editor.Components.addType("carousel", {
      model: {
        defaults: {
          name: "Carousel",
          traits: [
            {
              type: "number",
              label: "Number of Slides",
              name: "numSlides",
              min: 1,
              changeProp: 1,
            },
          ],
          slides: [
            { src: "https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1", alt: "Slide 1" },
            { src: "https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+2", alt: "Slide 2" },
            { src: "https://via.placeholder.com/800x400/7fff7f/333333?text=Slide+3", alt: "Slide 3" },
          ],
          script: function () {
            const numSlides = this.get('numSlides') || this.slides.length;

            const updateCarousel = () => {
              const container = this.querySelector('.slides-container');
              const slides = this.slides || [];
              let html = '';

              slides.forEach((slide, index) => {
                html += `
                  <div class="slide" style="flex: 1 0 100%; position: relative;">
                    <img src="${slide.src}" alt="${slide.alt}" style="width: 100%; display: block;">
                  </div>`;
              });

              container.innerHTML = html;
            };

            updateCarousel();
          },
        },
      },
      view: {
        onRender() {
          const numSlides = this.model.get('numSlides') || this.model.slides.length;
          const container = this.el.querySelector('.slides-container');
          this.model.slides = Array(numSlides).fill().map((_, i) => ({
            src: `https://via.placeholder.com/800x400?text=Slide+${i + 1}`,
            alt: `Slide ${i + 1}`,
          }));

          this.model.set('content', this.model.slides.map((slide, index) => `
            <div class="slide" style="flex: 1 0 100%; position: relative;">
              <img src="${slide.src}" alt="${slide.alt}" style="width: 100%; display: block;">
            </div>
          `).join(''));

          this.render();
        }
      },
    });

    editor.BlockManager.add('carousel-block', {
      label: 'Carousel',
      content: {
        type: 'carousel',
        components: `<div class="carousel">
          <div class="slides-container" style="display: flex; width: 300%; transition: transform 0.5s ease-in-out;"></div>
        </div>`,
      },
      category: 'Extra',
    });

    return () => editor.destroy();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div id="blocks" style={{ width: '300px', padding: '10px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ddd', overflowY: 'auto' }}></div>
      <div ref={editorRef} style={{ flex: 1 }}></div>
      <div className="panel__right" style={{ width: '300px', backgroundColor: '#f5f5f5', borderLeft: '1px solid #ddd' }}>
        <div className="layers-container"></div>
        <div className="styles-container"></div>
      </div>
      <div className="panel__switcher" style={{ position: 'absolute', top: '0', right: '0' }}></div>
    </div>
  );
}
