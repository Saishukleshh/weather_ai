import React, { useState } from 'react';
import { Sprout, Ruler, Droplets, History, Save } from 'lucide-react';

const OnboardingForm = ({ username, onComplete }) => {
    const [formData, setFormData] = useState({
        soilType: '',
        fieldSize: '',
        irrigationType: 'Rainfed',
        pastCrops: [{ cropName: '', year: '', yield: '' }]
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCropChange = (index, e) => {
        const newCrops = [...formData.pastCrops];
        newCrops[index][e.target.name] = e.target.value;
        setFormData({ ...formData, pastCrops: newCrops });
    };

    const addCropRow = () => {
        setFormData({
            ...formData,
            pastCrops: [...formData.pastCrops, { cropName: '', year: '', yield: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:7777/api/farmer/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, ...formData })
            });
            const data = await res.json();

            if (data.success) {
                onComplete();
            } else {
                alert('Failed to save data');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-green-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-800">Complete Your Farm Profile</h2>
                    <p className="text-green-600 mt-2">Help the AI provide better recommendations</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Soil Type */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <Sprout size={18} className="text-green-600" /> Soil Type
                        </label>
                        <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        >
                            <option value="">Select Soil Type</option>
                            <option value="Clay">Clay</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Loam">Loam</option>
                            <option value="Black Cotton">Black Cotton</option>
                            <option value="Red Soil">Red Soil</option>
                            <option value="Alluvial">Alluvial</option>
                        </select>
                    </div>

                    {/* Field Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Ruler size={18} className="text-blue-600" /> Field Size (Acres)
                            </label>
                            <input
                                type="text"
                                name="fieldSize"
                                value={formData.fieldSize}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                required
                                className="w-full p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Droplets size={18} className="text-cyan-600" /> Irrigation
                            </label>
                            <select
                                name="irrigationType"
                                value={formData.irrigationType}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            >
                                <option value="Rainfed">Rainfed</option>
                                <option value="Tube Well">Tube Well</option>
                                <option value="Canal">Canal</option>
                                <option value="Drip/Sprinkler">Drip/Sprinkler</option>
                            </select>
                        </div>
                    </div>

                    {/* Past Crop History */}
                    <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                        <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <History size={18} className="text-orange-600" /> Past Crop History
                        </label>
                        {formData.pastCrops.map((crop, index) => (
                            <div key={index} className="grid grid-cols-3 gap-3 mb-3">
                                <input
                                    type="text"
                                    name="cropName"
                                    placeholder="Crop Name"
                                    value={crop.cropName}
                                    onChange={(e) => handleCropChange(index, e)}
                                    className="p-2 rounded-lg border border-gray-200 text-sm"
                                    required
                                />
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    value={crop.year}
                                    onChange={(e) => handleCropChange(index, e)}
                                    className="p-2 rounded-lg border border-gray-200 text-sm"
                                    required
                                />
                                <input
                                    type="text"
                                    name="yield"
                                    placeholder="Yield (Qty)"
                                    value={crop.yield}
                                    onChange={(e) => handleCropChange(index, e)}
                                    className="p-2 rounded-lg border border-gray-200 text-sm"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCropRow}
                            className="text-xs text-green-700 font-semibold hover:text-green-800 underline"
                        >
                            + Add Another Crop
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold p-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={20} /> Save & Continue to Dashboard</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OnboardingForm;
