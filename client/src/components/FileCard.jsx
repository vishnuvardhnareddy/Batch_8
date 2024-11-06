import React from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa';

const FileCard = ({ file, onDelete, onDownload }) => (
    <div className="file-card bg-white shadow-md rounded-md p-4 mb-4">
        <h3 className="text-xl font-semibold">{file.originalName}</h3>
        <div className="mt-4">
            <button
                onClick={() => onDownload(file._id)}
                className="text-green-500 hover:text-green-700 mr-4"
            >
                <FaDownload /> Download
            </button>
            <button
                onClick={() => onDelete(file._id)}
                className="text-red-500 hover:text-red-700"
            >
                <FaTrash /> Delete
            </button>
        </div>
    </div>
);

export default FileCard;
