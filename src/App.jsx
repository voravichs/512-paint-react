import { useState, useRef, useEffect } from "react";

function App() {
  // States
  const [red, setRed] = useState(0)
  const [green, setGreen] = useState(0)
  const [blue, setBlue] = useState(0)
  const [color, setColor] = useState("#000000");

  // Canvas Reference
  const canvasRef = useRef(null)

  // Drawing 
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let isDragging = false;

    canvas.addEventListener("mousedown", function (event) {
      isDragging = true;
      context.strokeStyle = `rgb(${red} ${green} ${blue})`;
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY)
    })

    canvas.addEventListener("mousemove", function (event) {
      if (isDragging) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
      }
    })

    canvas.addEventListener("mouseup", function () {
      isDragging = false;
    })
  }, [red, green, blue])

  // Color Input
  const handleColorChange = (event) => {
    switch (event.target.id) {
      case "red":
        setRed(event.target.value);
        break;
      case "green":
        setGreen(event.target.value);
        break;
      case "blue":
        setBlue(event.target.value);
        break;
      default:
        break;
    }
    setColor(rgbToHex(red, green, blue))
  };

  // Helper Function to change rgb to hex color
  function rgbToHex(r, g, b) {
    r = Math.abs(r).toString(16);
    g = Math.abs(g).toString(16);
    b = Math.abs(b).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }

  // Color Picker Input
  const handleColorPicker = (event) => {
    const color = event.target.value;
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    setColor(color);
    setRed(r);
    setGreen(g);
    setBlue(b);
    console.log(color);
  }

  // Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <body className="mx-auto flex flex-col justify-center">
        <h1
          className="text-center text-4xl py-16 font-mono text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8">
          Not-So-Fancy Paint App
        </h1>
        <div className="container mx-auto flex gap-8">
          <div className="mx-auto mb-8 flex flex-col gap-4 items-center">
            <input type="color" className="p-1 ring-2 rounded " value={color} onChange={handleColorPicker} />

            <div className="flex gap-4 items-center">
              <p className="text-red-500 text-xl text-extrabold">R</p>
              <input id="red" type="range" min="0" max="255" value={red} onChange={handleColorChange} />
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-green-500 text-xl text-extrabold">G</p>
              <input id="green" type="range" min="0" max="255" value={green} onChange={handleColorChange} />
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-blue-500 text-xl text-extrabold">B</p>
              <input id="blue" type="range" min="0" max="255" value={blue} onChange={handleColorChange} />
            </div>

            <button onClick={handleClear}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Clear All
            </button>
          </div>
          <canvas width="800" height="600" ref={canvasRef}
            className="border-2 rounded" />
        </div>
      </body>
    </>
  )
}

export default App
