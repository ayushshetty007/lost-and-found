import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Send } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UploadItem = () => {
  const [type, setType] = useState('found'); // 'lost' or 'found'
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    objectName: '',
    category: '',
    description: '',
    date: '',
    location: '',
    mobileNumber: '',
    additionalNotes: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', isError: false });

    const data = new FormData();
    data.append('objectName', formData.objectName);
    data.append('description', formData.description);
    data.append(type === 'lost' ? 'dateLost' : 'dateFound', formData.date);
    data.append('location', formData.location);
    data.append('mobileNumber', formData.mobileNumber);
    
    if (formData.image) {
      data.append('image', formData.image);
    }
    
    if (type === 'found') {
      data.append('category', formData.category || 'general');
      data.append('additionalNotes', formData.additionalNotes);
    }

    try {
      const endpoint = type === 'lost' ? '/items/lost' : '/items/found';
      await api.post(endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Item successfully uploaded to the global registry.', isError: false });
      setTimeout(() => {
        navigate(`/dashboard/${type}`);
      }, 2000);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Failed to upload item.', isError: true });
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 flex justify-center space-x-4">
        <button
          onClick={() => setType('found')}
          className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
            type === 'found'
              ? 'bg-cyberpunk-neonPurple text-white shadow-neon-purple'
              : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          I Found an Item
        </button>
        <button
          onClick={() => setType('lost')}
          className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
            type === 'lost'
              ? 'bg-cyberpunk-accentPink text-white shadow-neon-pink'
              : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          I Lost an Item
        </button>
      </div>

      <div className="glass-panel p-8">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          {type === 'found' ? 'Upload Found Item' : 'Report Lost Item'}
        </h2>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm ${message.isError ? 'bg-red-500/20 text-red-200 border border-red-500/50' : 'bg-green-500/20 text-green-200 border border-green-500/50'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-white/70 mb-2">Item Image</label>
            <div className="border-2 border-dashed border-cyberpunk-neonBlue/50 rounded-xl p-8 text-center hover:bg-cyberpunk-neonBlue/5 transition-colors cursor-pointer relative overflow-hidden group">
              {preview ? (
                <img src={preview} alt="Preview" className="mx-auto max-h-64 rounded-lg object-contain" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-cyberpunk-neonBlue mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white/70">Click or drag image to upload</p>
                  <p className="text-white/40 text-sm mt-2">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={type === 'found'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Object Name</label>
              <input
                type="text"
                name="objectName"
                value={formData.objectName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g. Cybernetic Arm, Keycard"
                required
              />
            </div>

            {type === 'found' && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g. Electronics, Documents"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Date {type === 'found' ? 'Found' : 'Lost'}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g. Sector 7, Neon Square"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Contact Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="input-field"
                placeholder="+1 234 567 8900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field min-h-[100px] resize-y"
              placeholder="Provide detailed description..."
              required
            ></textarea>
          </div>

          {type === 'found' && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="input-field min-h-[80px] resize-y"
                placeholder="Any other details..."
              ></textarea>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                type === 'found'
                  ? 'bg-cyberpunk-neonPurple hover:bg-cyberpunk-neonPurple/80 shadow-neon-purple text-white'
                  : 'bg-cyberpunk-accentPink hover:bg-cyberpunk-accentPink/80 shadow-neon-pink text-white'
              }`}
            >
              {isLoading ? (
                <span className="animate-pulse">Uploading Data...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UploadItem;
