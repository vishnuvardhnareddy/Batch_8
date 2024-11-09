import React from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa';

const FileCard = ({ file, onDelete, onDownload }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 hover:shadow-xl transition-all">
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">{file.originalName}</h3>
        <div className="mt-4 flex justify-between items-center">
            <button
                onClick={() => onDownload(file._id)}
                className="text-yellow-500 hover:text-yellow-600 transition duration-200 flex items-center"
            >
                <FaDownload className="mr-2" /> Download
            </button>
            <button
                onClick={() => onDelete(file._id)}
                className="text-red-500 hover:text-red-600 transition duration-200 flex items-center"
            >
                <FaTrash className="mr-2" /> Delete
            </button>
        </div>
    </div>
);

export default FileCard;
