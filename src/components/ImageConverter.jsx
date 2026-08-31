import { useState } from "react";

export default function ImageConverter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [convertedImage, setConvertedImage] = useState("");
  const [conversion, setConversion] = useState("grayscale");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setConvertedImage("");
  };

  const handleConvert = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedImage);
    formData.append("conversion", conversion);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/convert",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await response.blob();

      const imageURL = URL.createObjectURL(blob);

      setConvertedImage(imageURL);

    } catch (error) {
      console.error(error);
      alert("Image conversion failed.");
    }
  };

  return (
    <div style={styles.container}>

      <h3>🖼 Image Conversion</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      <div style={styles.controls}>

        <select
          value={conversion}
          onChange={(e) =>
            setConversion(e.target.value)
          }
          style={styles.select}
        >
          <option value="grayscale">
            Grayscale
          </option>

          <option value="blur">
            Blur
          </option>

          <option value="edge">
            Edge Detection
          </option>

          <option value="flip">
            Flip
          </option>

          <option value="rotate">
            Rotate
          </option>

          <option value="resize">
            Resize
          </option>

          <option value="sharpen">
            Sharpen
          </option>
        </select>

       <button
  type="button"
  onClick={handleConvert}
  style={styles.button}
>
  Convert Image
</button>

      </div>

      {preview && (
        <div style={styles.previewBox}>

          <h4>Uploaded Image</h4>

          <img
            src={preview}
            alt="Preview"
            style={styles.image}
          />

        </div>
      )}

      {convertedImage && (
        <div style={styles.previewBox}>

          <h4>Converted Image</h4>

          <img
            src={convertedImage}
            alt="Converted"
            style={styles.image}
          />

          <br />

         <a
  href={convertedImage}
  download="converted_image.png"
  onClick={(e) => e.stopPropagation()}
>
  <button
    type="button"
    style={styles.downloadButton}
  >
    Download Image
  </button>
</a>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    marginTop: "20px",
  },

  controls: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 18px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  downloadButton: {
  display: "inline-block",
  marginTop: "15px",
  padding: "10px 18px",
  background: "#16a34a",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
},

  previewBox: {
    marginTop: "25px",
    textAlign: "center",
  },

  image: {
    width: "300px",
    maxWidth: "100%",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginTop: "10px",
  },
};