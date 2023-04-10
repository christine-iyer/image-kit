import React, { useRef } from 'react';
import './App.css';
import { IKContext, IKImage, IKUpload, IKVideo } from 'imagekitio-react';

const publicKey = 
'public_ipLWb/WJh0FRyyAOLOkOSU1Iwxw=';
const urlEndpoint = 'https://ik.imagekit.io/oxtwc3opy';
const authenticationEndpoint = 'http://localhost:3001/auth';
const videoUrlEndpoint = 'https://ik.imagekit.io/demo/';
const videoPath = "sample-video.mp4";

const onError = err => {
  console.log("Error", err);
};

const onSuccess = res => {
  console.log("Success", res);
};

const onUploadProgress = progress => {
  console.log("Progress", progress);
};

const onUploadStart = evt => {
  console.log("Start", evt);
};

function App() {
  const inputRefTest = useRef(null);
  const ikUploadRefTest = useRef(null);
  return (
    <div className="App">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <h1>ImageKit React quick start</h1>
        <h2>File upload</h2>
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />
        <h2>Advanced file upload</h2>
        <IKUpload
          fileName="test-upload.jpg"
          tags={["sample-tag1", "sample-tag2"]}
          customCoordinates={"10,10,10,10"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          folder={"/sample-folder"}
          validateFile={file => file.size < 2000000}
          extensions={[{
            "name": "remove-bg",
            "options": {
              "add_shadow": true,
            },
          }]}
          webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          // customMetadata={{
          //   "brand": "Nike",
          //   "color": "red",
          // }}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          // style={{display: 'none'}} // hide the default input and use the custom upload button
          inputRef={inputRefTest}
          ref={ikUploadRefTest}
        />
        <p>Custom Upload Button</p>
        {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
      </IKContext>

      <IKContext urlEndpoint={urlEndpoint}>
        <h2>Rendering image</h2>
        <IKImage path="default-image.jpg" width="400" />

        <h2>Loading image from an absolute path</h2>
        <IKImage
          src="https://ik.imagekit.io/oxtwc3opy/Submission2023-01-06.png?updatedAt=1681087163964"
          width="400"
        />

        <h2>Height and width manipulation</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 200,
            width: 200
          }]}
        />

        <h2>Crop mode</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200,
            cropMode: 'extract',
          }]}
        />

        <h2>Quality manipulation</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{ quality: 10 }]}
          width="400"
        />

        <h2>Chained transformation</h2>
        <h3>Step 1: Resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200
          }]}
        />

        <h3>Step 2: Resized and cropped, then rotated</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200,
          }, {
            rt: 90,
          }]}
        />

        <h3>Step 3: Rotated, then resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            rt: 90,
          }, {
            height: 300,
            width: 200,
          }]}
        />

        <h2>Adding text overlay to image</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 300,
            overlayText: 'ImageKit',
            overlayTextFontSize: 50,
            overlayTextColor: '0651D5',
          }]}
        />

        <h2>Lazy loading images</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{ height: 300, width: 400 }]}
          loading="lazy"
          height="300"
          width="400"
        />

        <h2>Blurred image placeholder</h2>
        <IKImage
          path="default-image.jpg"
          lqip={{ active: true, quality: 20 }}
          width="400"
        />

        <h3>Combining lazy loading with low-quality placeholders</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{ height: 300, width: 400 }]}
          lqip={{ active: true }}
          loading="lazy"
          height="300"
          width="400"
        />
      </IKContext>
      <IKContext publicKey={publicKey} authenticationEndpoint={authenticationEndpoint} urlEndpoint={videoUrlEndpoint}>
        <h2>Video Element</h2>
        <IKVideo
          className='ikvideo-default'
          path={videoPath}
          transformation={[{ height: 200, width: 200 }]}
          controls={true}
        />

        <br />
        <h2>Video with some advance transformation</h2>
        <IKVideo
          className='ikvideo-with-tr'
          path={videoPath}
          transformation={[{ height: 200, width: 600, b: '5_red', q: 95 }]}
          controls={true}
        />
      </IKContext>
    </div>
  );
}

export default App;
