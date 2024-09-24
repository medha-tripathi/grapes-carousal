"use client";

import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsTabs from "grapesjs-tabs";

export default function GrapesEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      plugins: [gjsPresetWebpage, gjsTabs],
    });
    editor.BlockManager.add('carousel-tabs', {
      label: 'Carousel',
      content: `
        <div class="carousel" style="width: 100%; max-width: 800px; margin: 50px auto; position: relative; overflow: hidden; border: 2px solid #ddd; border-radius: 10px;">
          <input type="radio" name="slider" id="slide1" checked style="display: none;">
          <input type="radio" name="slider" id="slide2" style="display: none;">
          <input type="radio" name="slider" id="slide3" style="display: none;">

          <div class="slides-container" style="display: flex; width: 300%; transition: transform 0.5s ease-in-out;">
            <div class="slide" style="flex: 1 0 100%; position: relative;">
              <img src="https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1" alt="Slide 1" style="width: 100%; display: block;">
            </div>
            <div class="slide" style="flex: 1 0 100%; position: relative;">
              <img src="https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+2" alt="Slide 2" style="width: 100%; display: block;">
            </div>
            <div class="slide" style="flex: 1 0 100%; position: relative;">
              <img src="https://via.placeholder.com/800x400/7fff7f/333333?text=Slide+3" alt="Slide 3" style="width: 100%; display: block;">
            </div>
          </div>

          <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center;">
            <label for="slide1" style="width: 10px; height: 10px; border-radius: 50%; background-color: #bbb; margin: 0 5px; cursor: pointer;"></label>
            <label for="slide2" style="width: 10px; height: 10px; border-radius: 50%; background-color: #bbb; margin: 0 5px; cursor: pointer;"></label>
            <label for="slide3" style="width: 10px; height: 10px; border-radius: 50%; background-color: #bbb; margin: 0 5px; cursor: pointer;"></label>
          </div>

          <style>
            #slide1:checked ~ .slides-container {
              transform: translateX(0%);
            }
            #slide2:checked ~ .slides-container {
              transform: translateX(-100%);
            }
            #slide3:checked ~ .slides-container {
              transform: translateX(-200%);
            }
            input[type="radio"]:checked + label {
              background-color: #333;
            }
          </style>
        </div>
      `,
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
