import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Phone, Tag } from 'lucide-react';

const FoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get('/items/found');
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.objectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClaim = async (id) => {
    try {
      await api.put(`/items/found/${id}/claim`);
      setItems(items.map(item => item._id === id ? { ...item, status: 'claimed' } : item));
      alert('Item successfully claimed! Our system has recorded this transaction.');
    } catch (error) {
      console.error('Error claiming item:', error);
      alert('Failed to claim item. Please ensure you are logged in.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <span className="w-3 h-8 bg-cyberpunk-neonPurple rounded"></span>
            Found Items Registry
          </h2>
          <p className="text-white/60 mt-2">Browse items reported as found across the network.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-cyberpunk-neonPurple" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search by name, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-cyberpunk-neonPurple border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel overflow-hidden group hover:border-cyberpunk-neonPurple/50 transition-colors flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-black/50 border-b border-cyberpunk-neonPurple/20">
                <img src={item.image} alt={item.objectName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-cyberpunk-neonPurple text-white text-xs font-bold px-3 py-1 rounded-full shadow-neon-purple uppercase tracking-wider">
                  Found
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.objectName}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-cyberpunk-neonPurple/20 text-cyberpunk-neonPurple rounded border border-cyberpunk-neonPurple/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {item.category}
                  </span>
                </div>
                
                <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">{item.description}</p>
                
                <div className="space-y-2 text-sm text-white/80 mb-4 pt-4 border-t border-white/10">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyberpunk-neonPurple" /> {item.location}</p>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cyberpunk-neonPurple" /> {new Date(item.dateFound).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyberpunk-neonPurple" /> {item.mobileNumber}</p>
                </div>
                
                {item.status === 'claimed' ? (
                  <button disabled className="w-full py-2 bg-gray-500/10 text-gray-400 border border-gray-500/50 rounded cursor-not-allowed">
                    Already Claimed
                  </button>
                ) : (
                  <button 
                    onClick={() => handleClaim(item._id)}
                    className="w-full py-2 bg-cyberpunk-neonPurple/10 hover:bg-cyberpunk-neonPurple hover:text-white text-cyberpunk-neonPurple border border-cyberpunk-neonPurple/50 rounded transition-all"
                  >
                    Claim Item
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 text-white/50">
              No matching records found in the database.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoundItems;
