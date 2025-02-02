import "../css/ImageToText.css";
import bookGif from "../images/book.gif";
import galary from "../images/galary.jpg";
import { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import jpgtotext from "../images/jpg-to-text-img.jpg";
import orctotext from "../images/orc.jpg"

export function ImageToText() {
  const fileInputRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageText, setImageText] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.indexOf("image") !== -1) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      setLoading(true);
      try {
        const text = await convertImageToText(imageUrl);
        setImageText(text);
      } catch (error) {
        console.error("Error extracting text from image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleConvertUrl = async () => {
    if (imageUrl) {
      setImageSrc(imageUrl);
      setLoading(true);
      try {
        const text = await convertImageToTextFromUrl(imageUrl);
        setImageText(text);
      } catch (error) {
        console.error("Error extracting text from image URL:", error);
      } finally {
        setLoading(false);
      }
    }
  };


  const convertImageToText = (image) => {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          resolve(text);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const convertImageToTextFromUrl = (imageUrl) => {
    return new Promise((resolve, reject) => {

      const img = new Image();
      img.crossOrigin = "Anonymous"; 

      img.src = imageUrl;

      img.onload = () => {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);


        const base64Image = canvas.toDataURL();

        Tesseract.recognize(base64Image, "eng", {
          logger: (m) => console.log(m),
        })
          .then(({ data: { text } }) => {
            resolve(text);
          })
          .catch((error) => {
            reject(error);
          });
      };

      
      img.onerror = (error) => {
        reject("Failed to load image.");
      };
    });
  };

  const handleClear = () => {
    setImageSrc(null);
    setImageText("");
    setImageUrl("");
    fileInputRef.current.value = "";
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(imageText)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const handleCopyLink = () => {
    setShowUrlInput((prev) => !prev);
  };

  return (
    <>
      <div className="nav-heading">
        <img className="image-book" src={bookGif} alt="Book GIF" />
        <h1 className="cursive-name">Images to Text</h1>
      </div>
      <div className="uper-text-heading">
        <h1 className="heading">Image to Text Converter</h1>
        <p className="para">
          An Online <b> image to text </b> converter to extract text from images
        </p>
      </div>
      <div className="upload-file-div">
        <img src={galary} alt="Gallery" />
        <h1>Upload or Paste images</h1>
        <p>Supported format: JPG, PNG</p>
        <div className="file-button">
          <button
            type="button"
            className="browse-button"
            onClick={handleBrowseClick}
          >
            ⬆ Browse
          </button>
          <input
            type="file"
            id="fileUpload"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="copy-link-button"
            onClick={handleCopyLink}
          >
            🔗
          </button>
        </div>
        {showUrlInput && (
          <div className="url-input-container">
            <input
              type="url"
              className="url-input"
              placeholder="Paste image URL here"
              value={imageUrl}
              onChange={handleUrlChange}
            />
            <button className="convert-button" onClick={handleConvertUrl}>
              Convert
            </button>
          </div>
        )}
        {loading && <div className="loading-spinner">🔄 Converting...</div>}{" "}
      </div>

      <div
        className={`extracted-div ${
          imageSrc || imageText ? "border-visible" : "border-hidden"
        }`}
      >
        <div className="extracted-image">
          {imageSrc && <img src={imageSrc} alt="Selected Image" />}
          {imageText && (
            <button onClick={handleClear} className="clear-button">
              Clear
            </button>
          )}
        </div>
        <div>
          {imageText && (
            <div className="extracted-text">
              <h3>Extracted Text:</h3>
              <p>{imageText}</p>
              <button onClick={handleCopyText} className="copy-button">
                Copy Text
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="about-application">
        <p>
          Extracting text from an image is very easy using our tool. Do not
          waste your time converting JPGs or PNGs to text manually. Our tool
          will not take more than a minute to convert an image to text. Our
          picture to text converter is a free online text extraction tool that
          converts images into text in no time with 100% accuracy. It uses
          advanced AI technology to get the text from images with a single
          click.
        </p>
        <img src={jpgtotext} alt="" />
      </div>
      <div className="orctotext">
        <img src={orctotext} alt="" />
      </div>
      <div className="howtouse">
        <h1>How does Image to text converter work?</h1>
        <br />
        <br />
        <p>Simply follow these steps.</p>
        <ul>
          <li>Upload your image or drag & drop it.</li>
          <li>Or enter the URL if you have a link to the image.</li>
          <li>Hit the Convert button.</li>
          <li>Copy the text to the clipboard or save it as a document.</li>
        </ul>
      </div>
      <div className="where-to-use-div">
        <h1>Where can you use a photo to text converter?</h1>
        <div className="where-to-use">
          <div className="single-div">
            <h1>Newspapers</h1>
            <p>
              Extract text from printed newspapers and convert it to digital
              format in seconds using our free OCR tool. Turn photos into text
              effortlessly with a single click!
            </p>
          </div>
          <div className="single-div">
            <h1>Digitalizing Office Documents</h1>
            <p>
              To edit an old document, you can convert the printed papers into
              digitalized versions using this pic to text converter.
            </p>
          </div>
          <div className="single-div">
            <h1>Class Notes</h1>
            <p>
              With this online image to text converter, you can store the class
              notes on your mobile by capturing the handwritten notes.
            </p>
          </div>
          <div className="single-div">
            <h1>Data Entry</h1>
            <p>
              Data Entry has become much easier with this tool. You just need to
              capture the image of manually written data and use this picture to
              text converter to change it digitally.
            </p>
          </div>
          <div className="single-div">
            <h1>Contact Details</h1>
            <p>
              When you see contact details like email, phone number on a banner,
              you can use the image to text converter online to convert it into
              digital format.
            </p>
          </div>
          <div className="single-div">
            <h1>Social Media</h1>
            <p>
              Get your favorite WhatsApp status, Instagram stories, or other
              social media images in text form.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 all rights reserved - Imagetotext-by-abhi.</p>
        <p>A product of Imagetotext-by-abhi.</p>
        <b>Develop by Abhishek Pawar</b>
      </footer>
    </>
  );
}





