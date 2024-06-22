import image1 from "../public/image1.jpg";
import image2 from "../public/image2.jpg";
import image3 from "../public/image3.jpg";
import { ImageSlider } from "./ImageSlider";

const IMAGES = [
  { url: image1, alt: "First image" },
  { url: image2, alt: "Second image" },
  { url: image3, alt: "Third image" },
];

function App() {
  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        height: "400px",
        margin: "0 auto",
      }}
    >
      <ImageSlider images={IMAGES} />
      <a href="/" style={{ fontSize: "4rem" }}></a>
    </div>
  );
}

export default App;
