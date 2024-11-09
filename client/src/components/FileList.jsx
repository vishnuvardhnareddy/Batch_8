import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileCard from './FileCard';
import { FaUpload } from 'react-icons/fa';  // Import React Icons

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [fileToUpload, setFileToUpload] = useState(null);
    const URI = import.meta.env.VITE_API_URL;

    // Fetch files on component mount
    useEffect(() => {
        const fetchFiles = async () => {
            const response = await axios.get(`${URI}/files`, { withCredentials: true });
            setFiles(response.data.data);
        };
        fetchFiles();
    }, [URI]);

    // Handle file upload
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', fileToUpload);

        await axios.post(`${URI}/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // Ensure credentials are included for upload
        });

        // Refresh the file list after upload
        const response = await axios.get(`${URI}/files`, { withCredentials: true });
        setFiles(response.data.data);
    };

    // Handle file deletion
    const handleDelete = async (fileId) => {
        await axios.delete(`${URI}/files/${fileId}`, { withCredentials: true });
        setFiles(files.filter(file => file._id !== fileId));
    };

    // Handle file download
    const handleDownload = async (fileId, fileName) => {
        try {
            console.log(`Attempting to download file with ID: ${fileId}`);

            const response = await axios.get(`${URI}/files/download/${fileId}`, {
                responseType: 'blob',  // Ensure the file is received as a blob
                withCredentials: true, // Include credentials if needed
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);  // Set the file name for download
            document.body.appendChild(link);
            link.click();  // Trigger the download
            document.body.removeChild(link);  // Remove the link after download

        } catch (error) {
            console.error("Error downloading the file:", error);
        } finally {
            // Ensure the URL is cleaned up after download
            if (url) {
                window.URL.revokeObjectURL(url);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-6">
            <div className="max-w-lg mx-auto bg-white bg-opacity-70 rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">Your Files</h2>

                {/* File upload section */}
                <div className="mb-6 bg-yellow-50 p-4 rounded-md shadow-lg border border-yellow-200">
                    <input
                        type="file"
                        onChange={(e) => setFileToUpload(e.target.files[0])}
                        className="block mb-4 p-2 bg-gray-200 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleFileUpload}
                        disabled={!fileToUpload}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-400 transition"
                    >
                        <FaUpload className="inline-block mr-2" /> Upload File
                    </button>
                </div>

                {/* Display files */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map((file) => (
                        <FileCard
                            key={file._id}
                            file={file}
                            onDelete={handleDelete}
                            onDownload={handleDownload}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileList;
