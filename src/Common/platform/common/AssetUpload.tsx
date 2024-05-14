import React from 'react'
import { UploadCloud } from 'lucide-react';
import Dropzone, { useDropzone } from 'react-dropzone';
import DropdownData from './DropdownData';

interface IProps {
    aspectRatio: any;
    setAspectRatio: React.Dispatch<React.SetStateAction<any>>;
    imageFileType: any;
    setImageFileType: React.Dispatch<React.SetStateAction<any>>;
    selectImagefiles: any[];
    setselectImagefiles: React.Dispatch<React.SetStateAction<any[]>>;
    title?: string;
    multiple?: boolean;
}

const AssetUpload = (props: IProps) => {
    const { aspectRatio, setAspectRatio, imageFileType, selectImagefiles, setImageFileType, setselectImagefiles, multiple = false } = props
    const formatBytes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };
    const handleAcceptImageFiles = (files: any) => {        
        if (multiple) {
            const newFiles = [...selectImagefiles, ...files.map((file: any) => {
                return Object.assign(file, {
                    priview: URL.createObjectURL(file),
                    formattedSize: formatBytes(file.size),
                });
            })];
            setselectImagefiles(newFiles);
        } else {
            files?.map((file: any) => {
                return Object.assign(file, {
                    priview: URL.createObjectURL(file),
                    formattedSize: formatBytes(file.size),
                });
            });
            setselectImagefiles(files);
        }
    };

    return (
        <div className="card p-3 my-3">
            <div className="xl:col-span-12">
                <div className="card p-2">
                    <div className="xl:col-span-12">
                        <label className="mr-2 inline-block mb-2 text-base font-medium">{props.title}</label>
                        <Dropzone
                            maxFiles={5}
                            multiple={multiple}
                            onDrop={(files) => {
                                handleAcceptImageFiles(files);
                            }}
                            >
                            {({ getRootProps }) => (
                                <div className="flex items-center justify-center bg-white border border-dashed rounded-md cursor-pointer dropzone border-slate-300 dark:bg-zink-700 dark:border-zink-500 dropzone2">
                                    <div className="w-full py-5 text-lg text-center dz-message needsclick" {...getRootProps()} >
                                        <div className="mb-3">
                                            <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                        <ul className="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview2">
                            {
                                (selectImagefiles || [])?.map((file: any, index: number) => {
                                    return (
                                        <li key={index} className="mt-5" id="dropzone-preview-list2">
                                            <div className="border rounded border-slate-200 dark:border-zink-500">
                                                <div className="p-2 text-center">
                                                    <div>
                                                        <div className="p-2 mx-auto rounded-md size-14 bg-slate-100 dark:bg-zink-600">
                                                            <img className="block w-full h-full rounded-md" src={file.priview} alt={file.name} />
                                                        </div>
                                                    </div>
                                                    <div className="pt-3">
                                                        <h5 className="mb-1 text-15" data-dz-name>{file.path}</h5>
                                                        <p className="mb-0 text-slate-500 dark:text-zink-200" data-dz-size>{file.formattedSize}</p>
                                                        <strong className="error text-danger" data-dz-errormessage></strong>
                                                    </div>
                                                    <div className="mt-2">
                                                        <button data-dz-remove className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20" onClick={() => {
                                                            const newImages = [...selectImagefiles];
                                                            newImages.splice(index, 1);
                                                            setselectImagefiles(newImages);
                                                        }}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>

                <DropdownData data="AspectRatio" title="Aspect Ratio" setState={setAspectRatio} state={aspectRatio} />
                <DropdownData data="FileImageTypeEnum" title="Image File Type" setState={setImageFileType} state={imageFileType} />
            </div>
        </div>
    )
};

export default AssetUpload