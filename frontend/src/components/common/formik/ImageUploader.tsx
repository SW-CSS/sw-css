import { CgMathPlus } from '@react-icons/all-files/cg/CgMathPlus';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type BuiltInImageUploaderProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomImageUploaderProps {
  name: string;
  label?: string;
  image: File | null;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errorText?: string;
}

export type ImageUploader = Omit<BuiltInImageUploaderProps, 'size'> & CustomImageUploaderProps;

const ImageUploader = ({ name, label, image, setFieldValue, errorText }: ImageUploader) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setFieldValue(name, acceptedFiles[0]);
      return;
    }
  }, []);
  const hasError = errorText !== undefined;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [image]);

  return (
    <>
      <div
        {...getRootProps()}
        className={`${hasError && 'border-red-400'} relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-sm border border-border text-comment hover:bg-background-light`}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="미리보기 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            className="rounded-sm"
          />
        ) : isDragActive ? (
          <p>파일을 놓으세요</p>
        ) : (
          <>
            <CgMathPlus className="h-8 w-8" />
            <p>파일을 업로드 하세요</p>
          </>
        )}
      </div>
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </>
  );
};

export default ImageUploader;
