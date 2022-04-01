import { FC, useRef, useState } from "react";

import "./AvatarInput.scss";
import CameraIcon from "@material-ui/icons/CameraAltOutlined";
import Constants from "@utils/Constants";
import GlobalUtils from "@utils/Global";
import { Button } from "@components/atoms";

interface AvatarInputProps {
  error?: string;
  setValue?(value: string): void;
  value?: string;
}

const AvatarInput: FC<AvatarInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(props.value);

  function onEdit() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function getImageAsUri(fileBlob: Blob) {
    return new Promise(function (resolve) {
      if (fileBlob.type.match(/image.*/) && inputRef.current) {
        setImage(URL.createObjectURL(fileBlob));
  
        const reader = new FileReader();
        
        reader.onload = function (readerEvent) {
          const image = new Image();
          
          image.onload = function () {
            const canvas = document.createElement("canvas");
            const maxSize = Constants.defaultAvatarSize;
            let width = image.width;
            let height = image.height;
  
  
            if (width > height && width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            } else if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
            canvas.width = width;
            canvas.height = height;
  
            canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg");
            
            resolve(dataUrl);
          };
  
          image.src = readerEvent.target?.result as string;
        }
        reader.readAsDataURL(fileBlob);
      }
    });
  }

  function startUploading() {
    if (inputRef.current && inputRef.current.files) {
      const file = inputRef.current.files[0];

      if (file) {
        getImageAsUri(file).then((dataUrl) => GlobalUtils.callIfFunction(props.setValue, dataUrl));
      }
    }
  }

  return (
    <div className="avatarInput">
      <div className="avatarInput__title">
        <div className="avatarInput__icon">
          <CameraIcon />
        </div>
        <span>Profile picture</span>
      </div>
      {props.error && <p className="avatarInput__error">{props.error}</p>}
      <img 
        onClick={onEdit}
        className="avatarInput__image"
        {...GlobalUtils.avatarImageProps(image)}
        alt="avatar"
      />
      <div className="avatarInput__input">
        <Button onClick={onEdit} type="minimal" tightX>Edit</Button>
        <input accept="image/png, image/jpeg, image/jpg" ref={inputRef} type="file" capture="user" onChange={startUploading} />
      </div>
    </div>
  );
};

export default AvatarInput;
